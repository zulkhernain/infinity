"use client"

import React, { useState } from 'react';

interface FileUploadProps {
  onUpload: (filePath: string) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onUpload(data.file_path);
      } else {
        setError(data.detail || 'Upload failed');
      }
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="text-lg">📁</span> Upload CSV File
          <span className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full">New</span>
        </label>
      </div>
      <div className="relative group">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full px-6 py-6 border-2 border-dashed border-purple-300 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-indigo-50 hover:from-purple-100 hover:via-white hover:to-indigo-100 cursor-pointer transition duration-300 transform hover:scale-105 group-hover:shadow-lg"
        >
          <div className="text-center">
            <div className="text-4xl mb-2 group-hover:scale-110 transition duration-300 inline-block">
              <span className="animate-bounce">📤</span>
            </div>
            <p className="text-sm font-bold text-gray-700">Click to upload CSV</p>
            <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
            <p className="text-xs text-purple-600 font-medium mt-2">Max 10MB</p>
          </div>
        </label>
      </div>
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-sm text-red-700 font-medium flex items-start gap-3 animate-pulse">
          <span className="text-lg">❌</span>
          <span>{error}</span>
        </div>
      )}
      {loading && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg text-sm text-blue-700 font-medium flex items-center gap-3">
          <span className="text-lg animate-spin">⏳</span>
          <span>Uploading your file...</span>
        </div>
      )}
    </div>
  );
}
