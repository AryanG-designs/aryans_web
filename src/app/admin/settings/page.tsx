"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteSettings, TimelineEntry, HeroImage, defaultSettings } from "@/lib/settings";
import ImageSlot from "@/components/admin/ImageSlot";
import { ArrowLeft, Save, Check, Loader2, Plus, Trash2 } from "lucide-react";

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

function TimelineEditor({
  entries,
  onChange,
}: {
  entries: TimelineEntry[];
  onChange: (entries: TimelineEntry[]) => void;
}) {
  return (
    <div className="space-y-4 border-t border-ink/10 pt-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-semibold">Education & Experience</p>
        <button
          type="button"
          onClick={() => onChange([...entries, { year: "", title: "", org: "" }])}
          className="inline-flex items-center gap-1 rounded-full border border-ink/20 px-2.5 py-1 text-xs uppercase tracking-[0.08em] hover:bg-ink hover:text-cream"
        >
          <Plus size={12} /> Add entry
        </button>
      </div>
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <div key={i} className="grid grid-cols-1 gap-2 rounded-xl bg-cream-deep/40 p-3 sm:grid-cols-[1fr_1fr_auto_auto]">
            <input
              className={inputClass}
              placeholder="Title e.g. BA (Hons) Illustration"
              value={entry.title}
              onChange={(e) => {
                const next = [...entries];
                next[i] = { ...next[i], title: e.target.value };
                onChange(next);
              }}
            />
            <input
              className={inputClass}
              placeholder="Organisation e.g. State School of Design"
              value={entry.org}
              onChange={(e) => {
                const next = [...entries];
                next[i] = { ...next[i], org: e.target.value };
                onChange(next);
              }}
            />
            <input
              className={inputClass}
              placeholder="Year(s) e.g. 2023 — Present"
              value={entry.year}
              onChange={(e) => {
                const next = [...entries];
                next[i] = { ...next[i], year: e.target.value };
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(entries.filter((_, idx) => idx !== i))}
              className="flex shrink-0 items-center justify-center rounded-full p-1.5 text-ink-soft hover:bg-red-100 hover:text-red-600"
              aria-label="Remove"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {entries.length === 0 && <p className="text-xs text-ink-soft">No entries yet.</p>}
      </div>
    </div>
  );
}

function HeroImagesEditor({
  images,
  onChange,
}: {
  images: HeroImage[];
  onChange: (images: HeroImage[]) => void;
}) {
  return (
    <div className="space-y-4 border-t border-ink/10 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-semibold">Homepage Hero Images</p>
          <p className="text-xs text-ink-soft">
            Upload as many as you like — the homepage shows 2 at a time and swaps in a new
            random pair every few seconds.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange([...images, { image: "", caption: "" }])}
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ink/20 px-2.5 py-1 text-xs uppercase tracking-[0.08em] hover:bg-ink hover:text-cream"
        >
          <Plus size={12} /> Add image
        </button>
      </div>
      <div className="space-y-3">
        {images.map((item, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-cream-deep/40 p-3">
            <ImageSlot
              label={`Image ${i + 1}`}
              value={item.image}
              onChange={(url) => {
                const next = [...images];
                next[i] = { ...next[i], image: url };
                onChange(next);
              }}
            />
            <div className="flex-1">
              <p className="mb-1.5 text-xs uppercase tracking-[0.1em] text-ink-soft">Caption (optional)</p>
              <input
                className={inputClass}
                placeholder="e.g. Indigo City, 2025"
                value={item.caption ?? ""}
                onChange={(e) => {
                  const next = [...images];
                  next[i] = { ...next[i], caption: e.target.value };
                  onChange(next);
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => onChange(images.filter((_, idx) => idx !== i))}
              className="mt-6 shrink-0 rounded-full p-1.5 text-ink-soft hover:bg-red-100 hover:text-red-600"
              aria-label="Remove"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {images.length === 0 && <p className="text-xs text-ink-soft">No hero images yet — the homepage falls back to your featured projects.</p>}
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => setSettings(data.settings ?? defaultSettings));
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
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

  if (!settings) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-ink-soft">
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-8">
      <Link href="/admin" className="mb-6 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft size={14} /> Back to projects
      </Link>

      <div className="space-y-6 rounded-2xl bg-cream p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold">Contact & Social Settings</h1>
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
            {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}

        <Field label="Email">
          <input
            className={inputClass}
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
          />
        </Field>

        <Field label="Location">
          <input
            className={inputClass}
            placeholder="e.g. Mumbai, India"
            value={settings.location}
            onChange={(e) => setSettings({ ...settings, location: e.target.value })}
          />
        </Field>

        <div>
          <Field label="Mobile phone number">
            <input
              className={inputClass}
              placeholder="e.g. +91 98765 43210"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
          </Field>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={settings.showPhone}
              onChange={(e) => setSettings({ ...settings, showPhone: e.target.checked })}
            />
            Show phone number on the public Contact page
          </label>
        </div>

        <div className="space-y-4 border-t border-ink/10 pt-6">
          <p className="font-display text-lg font-semibold">Social Links</p>
          <p className="text-xs text-ink-soft">Leave a field blank to hide that icon on the site.</p>
          <Field label="Instagram URL">
            <input
              className={inputClass}
              placeholder="https://instagram.com/username"
              value={settings.socials.instagram}
              onChange={(e) =>
                setSettings({ ...settings, socials: { ...settings.socials, instagram: e.target.value } })
              }
            />
          </Field>
          <Field label="LinkedIn URL">
            <input
              className={inputClass}
              placeholder="https://linkedin.com/in/username"
              value={settings.socials.linkedin}
              onChange={(e) =>
                setSettings({ ...settings, socials: { ...settings.socials, linkedin: e.target.value } })
              }
            />
          </Field>
          <Field label="Behance URL">
            <input
              className={inputClass}
              placeholder="https://behance.net/username"
              value={settings.socials.behance}
              onChange={(e) =>
                setSettings({ ...settings, socials: { ...settings.socials, behance: e.target.value } })
              }
            />
          </Field>
          <Field label="ArtStation URL">
            <input
              className={inputClass}
              placeholder="https://artstation.com/username"
              value={settings.socials.artstation}
              onChange={(e) =>
                setSettings({ ...settings, socials: { ...settings.socials, artstation: e.target.value } })
              }
            />
          </Field>
        </div>

        <TimelineEditor
          entries={settings.timeline}
          onChange={(entries) => setSettings({ ...settings, timeline: entries })}
        />

        <HeroImagesEditor
          images={settings.heroImages}
          onChange={(images) => setSettings({ ...settings, heroImages: images })}
        />
      </div>
    </div>
  );
}
