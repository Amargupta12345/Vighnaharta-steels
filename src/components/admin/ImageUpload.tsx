import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image', hint }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValidImageUrl = (url: string) =>
    url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://');

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    setError('');
    setProgress('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        onChange(data.url);
        setProgress('');
      } else {
        setError(data.error || 'Upload failed');
        setProgress('');
      }
    } catch {
      setError('Network error — please try again');
      setProgress('');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleFile = useCallback((file: File) => {
    setError('');
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!allowed.includes(file.type)) {
      setError('Only JPG, PNG, WebP, AVIF, or GIF files are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be smaller than 10MB');
      return;
    }
    upload(file);
  }, [upload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setError('');
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-semibold text-gray-600">
          {label}
          {hint && <span className="font-normal text-gray-400 ml-2">{hint}</span>}
        </label>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 overflow-hidden
          ${dragOver ? 'border-accent-orange bg-accent-orange/5 scale-[1.01]' : 'border-gray-200 hover:border-accent-orange/50'}
          ${uploading ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {value && isValidImageUrl(value) ? (
          /* Preview */
          <div className="relative">
            <div className="relative h-48 w-full bg-gray-50">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 500px"
                onError={() => {}}
              />
            </div>
            {!uploading && (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="bg-white text-steel-blue text-xs font-semibold px-4 py-2 rounded-xl shadow hover:bg-gray-50 transition-colors"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div className={`flex flex-col items-center justify-center py-10 px-4 text-center ${dragOver ? 'scale-105' : ''} transition-transform duration-200`}>
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3 text-2xl">
              {dragOver ? '⬇️' : '📷'}
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">
              {dragOver ? 'Drop to upload' : 'Click or drag & drop to upload'}
            </p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP, AVIF · Max 10MB</p>
          </div>
        )}

        {/* Upload overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center gap-3 rounded-2xl">
            <div className="w-10 h-10 border-3 border-accent-orange border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold text-gray-700">{progress || 'Uploading...'}</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/avif,image/gif"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* OR divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400 font-medium">or paste URL</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* URL fallback input */}
      <input
        type="text"
        value={value}
        onChange={(e) => { setError(''); onChange(e.target.value); }}
        placeholder="/assets/images/steel-beam.png"
        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all font-mono"
      />

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-xl text-xs">
          <span className="flex-shrink-0 mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
