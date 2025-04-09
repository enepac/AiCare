"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { useViewerContext } from "@/context/ViewerContext";

type TestResult = {
  _id?: string;
  testName: string;
  value?: string | number;
  unit?: string;
  referenceRange?: string;
  interpretation?: "Normal" | "High" | "Low" | "Borderline";
  category?: string;
  subcategory?: string;
  testDate: string;
  notes?: string;
  parsedByAI?: boolean;
  sourceType: "manual" | "upload";
  fileName?: string;
  userEmail?: string;
};

export default function TestResults() {
  const { data: session } = useSession();
  const { isViewer } = useViewerContext();

  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewerEmail, setViewerEmail] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Partial<TestResult>>({
    testDate: format(new Date(), "yyyy-MM-dd"),
    sourceType: "manual"
  });

  useEffect(() => {
    const syncViewerEmail = () => {
      const email = localStorage.getItem("viewerEmail");
      setViewerEmail(email || null);
    };

    syncViewerEmail();
    window.addEventListener("storage", syncViewerEmail);
    return () => window.removeEventListener("storage", syncViewerEmail);
  }, []);

  const buildViewerHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {};
    if (viewerEmail) headers["X-Viewer-Email"] = viewerEmail;
    return headers;
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/patient-data/tests", {
        headers: buildViewerHeaders()
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("❌ Failed to load test results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [session, viewerEmail]);

  const handleFormChange = (
    field: keyof TestResult,
    value: string | number | boolean | null | undefined
  ) => {
    if (isViewer) return;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isViewer) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/patient-data/tests", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setForm((prev) => ({
          ...prev,
          ...data,
          sourceType: "upload",
          parsedByAI: true,
          fileName: file.name
        }));
      } else {
        console.error("❌ Upload failed:", data.message);
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
    }
  };

  const handleSubmit = async () => {
    if (isViewer) return;

    const requiredFields = ["testName", "testDate", "sourceType"];
    for (const field of requiredFields) {
      if (!form[field as keyof TestResult]) {
        alert(`Missing required field: ${field}`);
        return;
      }
    }

    const res = await fetch("/api/patient-data/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...buildViewerHeaders()
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setModalOpen(false);
      setForm({ testDate: format(new Date(), "yyyy-MM-dd"), sourceType: "manual" });
      fetchResults();
    } else {
      const error = await res.json();
      console.error("❌ Failed to save test result:", error.message);
      alert("Failed to save test result. See console for details.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Test Results</h2>
        {!isViewer && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Test Result
          </button>
        )}
      </div>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded text-sm">
          👁️ You are viewing shared test results. Editing is disabled.
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No test results available.</p>
      ) : (
        <div className="space-y-4">
          {results.map((res) => (
            <div
              key={res._id}
              className="p-4 border rounded shadow-sm bg-white flex flex-col md:flex-row justify-between items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {res.testName}{" "}
                  {res.category && (
                    <span className="text-xs text-gray-500 ml-1">({res.category})</span>
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  Value:{" "}
                  <strong>
                    {res.value} {res.unit}
                  </strong>{" "}
                  {res.referenceRange && (
                    <span className="text-gray-500 text-xs ml-2">(Ref: {res.referenceRange})</span>
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {format(new Date(res.testDate), "PPP")}
                </p>
                {res.notes && <p className="text-sm text-gray-500 mt-1">{res.notes}</p>}
              </div>

              <div className="flex flex-col items-end gap-1">
                {res.interpretation && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      res.interpretation === "Normal"
                        ? "bg-green-100 text-green-700"
                        : res.interpretation === "High"
                          ? "bg-red-100 text-red-700"
                          : res.interpretation === "Low"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {res.interpretation}
                  </span>
                )}

                {res.parsedByAI && (
                  <span className="text-[10px] text-blue-500 bg-blue-100 px-2 py-1 rounded-full mt-1">
                    Parsed by AI
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold">Add Test Result</h3>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.docx"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="hidden"
              disabled={isViewer}
            />

            <input
              type="text"
              placeholder="Test Name"
              value={form.testName ?? ""}
              onChange={(e) => handleFormChange("testName", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Value"
                value={form.value ?? ""}
                onChange={(e) => handleFormChange("value", e.target.value)}
                className="border p-2 rounded w-1/2"
                disabled={isViewer}
              />
              <input
                type="text"
                placeholder="Unit"
                value={form.unit ?? ""}
                onChange={(e) => handleFormChange("unit", e.target.value)}
                className="border p-2 rounded w-1/2"
                disabled={isViewer}
              />
            </div>

            <input
              type="text"
              placeholder="Reference Range"
              value={form.referenceRange ?? ""}
              onChange={(e) => handleFormChange("referenceRange", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <select
              value={form.interpretation ?? ""}
              onChange={(e) => handleFormChange("interpretation", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            >
              <option value="">Interpretation</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Borderline">Borderline</option>
            </select>

            <input
              type="date"
              value={form.testDate ?? ""}
              onChange={(e) => handleFormChange("testDate", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <textarea
              placeholder="Notes (optional)"
              value={form.notes ?? ""}
              onChange={(e) => handleFormChange("notes", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setForm({ testDate: format(new Date(), "yyyy-MM-dd"), sourceType: "manual" });
                }}
                className="px-4 py-2 border rounded"
              >
                Close
              </button>

              {!isViewer && (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
