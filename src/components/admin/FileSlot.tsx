"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Upload, Loader2, FileText, X } from "lucide-react";

export default function FileSlot({
  label,
  value,
  accept,
  onChange,
}: {
  label: string;
  value?: string;
  accept: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasFile = !!value && value.startsWith("http");

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      onChange(blob.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="mb-1.5 text-xs uppercase tracking-[0.1em] text-ink-soft">{label}</p>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink/15 bg-cream-deep/40">
          <FileText size={18} className={hasFile ? "text-ink" : "text-ink-soft"} />
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-3 py-1.5 text-xs uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-cream disabled:opacity-60"
        >
          {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
          {uploading ? "Uploading…" : hasFile ? "Replace" : "Upload"}
        </button>
        {hasFile && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-ink-soft underline-grow"
          >
            View current file
          </a>
        )}
        {hasFile && !uploading && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove file"
            className="rounded-full p-1.5 text-ink-soft hover:bg-red-100 hover:text-red-600"
          >
            <X size={15} />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
