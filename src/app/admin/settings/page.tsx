"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteSettings, defaultSettings } from "@/lib/settings";
import { ArrowLeft, Save, Check, Loader2 } from "lucide-react";

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
        </div>
      </div>
    </div>
  );
}
