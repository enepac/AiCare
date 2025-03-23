"use client";

import { useEffect, useState } from "react";

interface MedicalRecord {
  _id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  filePath: string;
}

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/medical-records/retrieve", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const data = await res.json();
      setRecords(data.records || []);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/medical-records", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData
      });

      if (res.ok) {
        fetchMedicalRecords();
        setFile(null);
      } else {
        console.error("Upload failed:", await res.json());
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/medical-records/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (res.ok) {
        setRecords(records.filter((record) => record._id !== id));
      } else {
        console.error("Delete failed:", await res.json());
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Medical Records</h1>

      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {loading ? (
        <p>Loading medical records...</p>
      ) : records.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">File Name</th>
              <th className="border p-2">File Type</th>
              <th className="border p-2">Upload Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="border">
                <td className="border p-2">{record.fileName}</td>
                <td className="border p-2">{record.fileType}</td>
                <td className="border p-2">{new Date(record.uploadDate).toLocaleString()}</td>
                <td className="border p-2">
                  <a href={record.filePath} download className="text-blue-500 underline">
                    Download
                  </a>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="ml-2 bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
