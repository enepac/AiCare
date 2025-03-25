"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface MedicalRecord {
  _id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  filePath: string;
  parsedAI?: Record<string, unknown>;
}

export default function MedicalRecords() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";

  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editMap, setEditMap] = useState<Record<string, string>>({});

  const fetchRecords = async () => {
    if (!accessToken) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/medical-records/retrieve", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch records");
      const data = await res.json();
      setRecords(data.records);
    } catch (err) {
      setError("Error fetching medical records.");
      console.error("❌ Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !accessToken) {
      setError("User not authenticated or no file selected");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/medical-records", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");
      await fetchRecords();
    } catch (err) {
      setError("Error uploading file.");
      console.error("❌ Upload Error:", err);
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    if (!accessToken) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/medical-records/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!res.ok) throw new Error("Failed to delete record");
      setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id));
    } catch (err) {
      setError("Error deleting record.");
      console.error("❌ Delete Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (id: string, newName: string) => {
    setEditMap((prev) => ({ ...prev, [id]: newName }));
  };

  const handleSaveMetadata = async (id: string) => {
    if (!accessToken || !editMap[id]) return;

    try {
      const res = await fetch("/api/medical-records/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ id, fileName: editMap[id] })
      });

      if (!res.ok) throw new Error("Failed to update metadata");

      setRecords((prev) =>
        prev.map((record) => (record._id === id ? { ...record, fileName: editMap[id] } : record))
      );
      setEditMap((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
    } catch (err) {
      setError("Error updating metadata.");
      console.error("❌ Metadata Update Error:", err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchRecords();
    }
  }, [accessToken]);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Medical Records</h2>

      <div className="mb-4 flex gap-4">
        <input type="file" onChange={handleFileChange} className="border p-2 rounded-lg" />
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <ul className="space-y-4">
          {records.map((record) => (
            <li
              key={record._id}
              className="p-4 bg-gray-100 border border-gray-300 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
            >
              <div className="flex-1 w-full">
                <input
                  type="text"
                  value={editMap[record._id] ?? record.fileName}
                  onChange={(e) => handleEditChange(record._id, e.target.value)}
                  className="w-full md:w-64 p-2 border rounded mb-1"
                />
                <p className="text-sm text-gray-600">
                  {new Date(record.uploadDate).toLocaleDateString()}
                </p>
                <a
                  href={record.filePath}
                  download
                  className="text-blue-500 hover:underline text-sm"
                >
                  Download
                </a>

                {record.parsedAI ? (
                  <details className="mt-2 bg-green-50 border border-green-400 rounded p-2">
                    <summary className="cursor-pointer font-semibold text-green-800">
                      🧠 AI Insights
                    </summary>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
                      {JSON.stringify(record.parsedAI, null, 2)}
                    </pre>
                  </details>
                ) : (
                  <p className="text-sm text-gray-500 italic mt-2">Parsing insights...</p>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                {editMap[record._id] && editMap[record._id] !== record.fileName && (
                  <button
                    onClick={() => handleSaveMetadata(record._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => handleDelete(record._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
