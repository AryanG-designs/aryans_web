"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Video } from "@/lib/videos";
import { slugify } from "@/lib/store";
import ImageSlot from "@/components/admin/ImageSlot";
import VideoFileSlot from "@/components/admin/VideoFileSlot";
import { ArrowLeft, Plus, Trash2, Save, Check, Loader2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-coral-deep";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.1em] text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

function emptyVideo(title: string): Video {
  return {
    slug: slugify(title) || `video-${Date.now()}`,
    title,
    description: "",
    thumbnail: "",
    videoUrl: "",
  };
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/videos")
      .then((r) => r.json())
      .then((data) => setVideos(data.videos ?? []));
  }, []);

  function update(slug: string, patch: Partial<Video>) {
    setVideos((prev) => prev!.map((v) => (v.slug === slug ? { ...v, ...patch } : v)));
  }

  function handleAdd() {
    const title = prompt("Video title?");
    if (!title) return;
    setVideos((prev) => [...(prev ?? []), emptyVideo(title)]);
  }

  function handleRemove(slug: string) {
    if (!confirm("Remove this video?")) return;
    setVideos((prev) => prev!.filter((v) => v.slug !== slug));
  }

  async function handleSave() {
    if (!videos) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/videos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videos }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!videos) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-ink-soft">
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft size={14} /> Back to projects
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs uppercase tracking-[0.08em] text-cream disabled:opacity-60"
        >
          {saving ? (
            <Loader2 size={13} className="animate-spin" />
          ) : saved ? (
            <Check size={13} />
          ) : (
            <Save size={13} />
          )}
          {saving ? "Saving…" : saved ? "Saved" : "Save all changes"}
        </button>
      </div>

      <h1 className="mb-6 font-display text-2xl font-semibold">Videos</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-6">
        {videos.map((v) => (
          <div key={v.slug} className="space-y-4 rounded-2xl bg-cream p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-semibold">{v.title || "(untitled)"}</p>
              <button
                onClick={() => handleRemove(v.slug)}
                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-red-600 hover:bg-red-50"
              >
                <Trash2 size={13} /> Remove
              </button>
            </div>

            <Field label="Title">
              <input
                className={inputClass}
                value={v.title}
                onChange={(e) => update(v.slug, { title: e.target.value })}
              />
            </Field>

            <Field label="Description">
              <textarea
                className={inputClass}
                rows={2}
                value={v.description}
                onChange={(e) => update(v.slug, { description: e.target.value })}
              />
            </Field>

            <Field label="Video link (YouTube or Vimeo URL)">
              <input
                className={inputClass}
                placeholder="https://youtube.com/watch?v=..."
                value={v.videoUrl}
                onChange={(e) => update(v.slug, { videoUrl: e.target.value })}
              />
            </Field>
            <p className="-mt-2 text-xs text-ink-soft">
              Or upload a video file directly below — that enables real Picture-in-Picture
              playback on the site. If both are set, the uploaded file takes priority.
            </p>

            <VideoFileSlot
              label="Video file (optional, enables PiP)"
              value={v.videoFile}
              onChange={(url) => update(v.slug, { videoFile: url || undefined })}
            />

            <ImageSlot
              label="Thumbnail"
              value={v.thumbnail}
              onChange={(url) => update(v.slug, { thumbnail: url })}
            />
          </div>
        ))}

        {videos.length === 0 && <p className="text-ink-soft">No videos yet.</p>}
      </div>

      <button
        onClick={handleAdd}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.08em] hover:bg-ink hover:text-cream"
      >
        <Plus size={13} /> Add video
      </button>
    </div>
  );
}
