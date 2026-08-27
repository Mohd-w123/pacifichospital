'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Upload Image to Cloudinary',
  folder = 'pacific-hms'
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP, etc.)');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Upload error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-slate-300">{label}</label>}

      {error && (
        <div className="p-2 bg-red-950/80 border border-red-800 text-red-300 rounded-lg text-xs flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Upload Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`uploader-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <label
            htmlFor={`uploader-${label.replace(/\s+/g, '-').toLowerCase()}`}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition ${
              uploading
                ? 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-teal-950/80 hover:bg-teal-900 border-teal-800 text-teal-300 hover:text-white'
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                <span>Uploading to Cloudinary (pacific-hms)...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 text-teal-400" />
                <span>Upload from Device (Cloudinary)</span>
              </>
            )}
          </label>
        </div>

        {/* Or direct URL text box */}
        <div className="flex-1 w-full">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste Cloudinary / Image URL here..."
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Image Preview */}
      {value && (
        <div className="flex items-center gap-3 pt-1">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
            <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full p-0.5"
              title="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="text-[11px] text-slate-400 break-all line-clamp-2">
            <span className="text-teal-400 font-semibold">Active URL:</span> {value}
          </div>
        </div>
      )}
    </div>
  );
}
