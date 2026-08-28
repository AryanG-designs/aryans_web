"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Project, Category, categories } from "@/lib/projects";
import { slugify } from "@/lib/store";
import ImageSlot from "@/components/admin/ImageSlot";
import { Plus, Trash2, LogOut, Save, Check, Loader2 } from "lucide-react";

const selectableCategories = categories.filter((c) => c !== "All") as Category[];

function emptyProject(title: string): Project {
  return {
    slug: slugify(title) || `project-${Date.now()}`,
    title,
    category: selectableCategories[0],
    year: String(new Date().getFullYear()),
    duration: "",
    role: "",
    featured: false,
    size: "medium",
    cover: "",
    coverAlt: "",
    tagline: "",
    brief: { problem: "", objectives: [], audience: "", constraints: "" },
    research: [],
    exploration: [],
    process: [],
    outcome: [],
    reflection: "",
    tools: [],
    tags: [],
  };
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.1em] text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-coral-deep";

type Gallery = { image: string; caption: string }[];

function GalleryEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: Gallery;
  onChange: (items: Gallery) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold">{label}</p>
        <button
          type="button"
          onClick={() => onChange([...items, { image: "", caption: "" }])}
          className="inline-flex items-center gap-1 rounded-full border border-ink/20 px-2.5 py-1 text-xs uppercase tracking-[0.08em] hover:bg-ink hover:text-cream"
        >
          <Plus size={12} /> Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-cream-deep/40 p-3">
            <ImageSlot
              label={`Image ${i + 1}`}
              value={item.image}
              onChange={(url) => {
                const next = [...items];
                next[i] = { ...next[i], image: url };
                onChange(next);
              }}
            />
            <div className="flex-1">
              <p className="mb-1.5 text-xs uppercase tracking-[0.1em] text-ink-soft">Caption</p>
              <input
                className={inputClass}
                value={item.caption}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], caption: e.target.value };
                  onChange(next);
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="mt-6 rounded-full p-1.5 text-ink-soft hover:bg-red-100 hover:text-red-600"
              aria-label="Remove"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-ink-soft">No images yet.</p>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects);
        setActiveSlug(data.projects[0]?.slug ?? null);
      });
  }, []);

  const active = projects?.find((p) => p.slug === activeSlug) ?? null;

  function updateActive(patch: Partial<Project>) {
    if (!active) return;
    setProjects((prev) =>
      prev!.map((p) => (p.slug === active.slug ? { ...p, ...patch } : p))
    );
  }

  async function handleSave() {
    if (!projects) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects }),
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

  function handleAddProject() {
    const title = prompt("New project title?");
    if (!title) return;
    const fresh = emptyProject(title);
    setProjects((prev) => [...(prev ?? []), fresh]);
    setActiveSlug(fresh.slug);
  }

  function handleDeleteProject() {
    if (!active) return;
    if (!confirm(`Delete "${active.title}"? This can't be undone until you Save.`)) return;
    setProjects((prev) => prev!.filter((p) => p.slug !== active.slug));
    setActiveSlug((prev) => {
      const remaining = projects!.filter((p) => p.slug !== active.slug);
      return remaining[0]?.slug ?? null;
    });
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (!projects) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-ink-soft">
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:px-8">
      {/* Sidebar */}
      <aside className="w-full shrink-0 md:w-64">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-lg font-semibold">Projects</p>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.08em] text-ink-soft hover:text-ink"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
        <button
          onClick={handleAddProject}
          className="mb-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-ink/20 px-3 py-2 text-xs uppercase tracking-[0.08em] hover:bg-ink hover:text-cream"
        >
          <Plus size={13} /> New project
        </button>
        <div className="space-y-1">
          {projects.map((p) => (
            <button
              key={p.slug}
              onClick={() => setActiveSlug(p.slug)}
              className={`block w-full truncate rounded-lg px-3 py-2 text-left text-sm ${
                p.slug === activeSlug ? "bg-coral/50 font-medium" : "hover:bg-cream-deep/50"
              }`}
            >
              {p.title || "(untitled)"}
            </button>
          ))}
        </div>
      </aside>

      {/* Editor */}
      <div className="min-w-0 flex-1">
        {!active ? (
          <p className="text-ink-soft">No project selected — add one to get started.</p>
        ) : (
          <div className="space-y-8 rounded-2xl bg-cream p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-display text-2xl font-semibold">Editing: {active.title}</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteProject}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-2 text-xs uppercase tracking-[0.08em] text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={13} /> Delete
                </button>
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
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Basics */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title">
                <input
                  className={inputClass}
                  value={active.title}
                  onChange={(e) => updateActive({ title: e.target.value })}
                />
              </Field>
              <Field label="Slug (URL)">
                <input
                  className={inputClass}
                  value={active.slug}
                  onChange={(e) => updateActive({ slug: slugify(e.target.value) })}
                />
              </Field>
              <Field label="Category">
                <select
                  className={inputClass}
                  value={active.category}
                  onChange={(e) => updateActive({ category: e.target.value as Category })}
                >
                  {selectableCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Year">
                <input
                  className={inputClass}
                  value={active.year}
                  onChange={(e) => updateActive({ year: e.target.value })}
                />
              </Field>
              <Field label="Duration">
                <input
                  className={inputClass}
                  value={active.duration}
                  onChange={(e) => updateActive({ duration: e.target.value })}
                />
              </Field>
              <Field label="Role">
                <input
                  className={inputClass}
                  value={active.role}
                  onChange={(e) => updateActive({ role: e.target.value })}
                />
              </Field>
              <Field label="Card size">
                <select
                  className={inputClass}
                  value={active.size}
                  onChange={(e) => updateActive({ size: e.target.value as Project["size"] })}
                >
                  <option value="large">Large</option>
                  <option value="medium">Medium</option>
                  <option value="small">Small</option>
                </select>
              </Field>
              <Field label="Featured on homepage">
                <label className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    checked={active.featured}
                    onChange={(e) => updateActive({ featured: e.target.checked })}
                  />
                  <span className="text-sm">Show in Featured Projects</span>
                </label>
              </Field>
            </div>

            <Field label="Tagline">
              <textarea
                className={inputClass}
                rows={2}
                value={active.tagline}
                onChange={(e) => updateActive({ tagline: e.target.value })}
              />
            </Field>

            <ImageSlot
              label="Cover image"
              value={active.cover}
              onChange={(url) => updateActive({ cover: url })}
            />
            <Field label="Cover alt text">
              <input
                className={inputClass}
                value={active.coverAlt}
                onChange={(e) => updateActive({ coverAlt: e.target.value })}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tools (comma separated)">
                <input
                  className={inputClass}
                  value={active.tools.join(", ")}
                  onChange={(e) =>
                    updateActive({ tools: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                  }
                />
              </Field>
              <Field label="Tags (comma separated)">
                <input
                  className={inputClass}
                  value={active.tags.join(", ")}
                  onChange={(e) =>
                    updateActive({ tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                  }
                />
              </Field>
            </div>

            {/* Final Outcome */}
            <div className="border-t border-ink/10 pt-6">
              <GalleryEditor
                label="Final Outcome"
                items={active.outcome}
                onChange={(items) => updateActive({ outcome: items })}
              />
            </div>

            {/* Deliverables */}
            <div className="space-y-4 border-t border-ink/10 pt-6">
              <p className="font-display text-lg font-semibold">Deliverables</p>
              <ImageSlot
                label="Deliverables photo"
                value={active.materialsImage ?? ""}
                onChange={(url) => updateActive({ materialsImage: url })}
              />
            </div>

            {/* Reflection */}
            <div className="border-t border-ink/10 pt-6">
              <Field label="Reflection">
                <textarea
                  className={inputClass}
                  rows={3}
                  value={active.reflection}
                  onChange={(e) => updateActive({ reflection: e.target.value })}
                />
              </Field>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
