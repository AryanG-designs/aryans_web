import { list, put } from "@vercel/blob";

export type TimelineEntry = {
  year: string;
  title: string;
  org: string;
};

export type SiteSettings = {
  email: string;
  phone: string;
  showPhone: boolean;
  location: string;
  socials: {
    instagram: string;
    linkedin: string;
    behance: string;
    artstation: string;
  };
  timeline: TimelineEntry[];
};

const SETTINGS_PATH = "data/settings.json";

export const defaultSettings: SiteSettings = {
  email: "hello@aryangoswami.design",
  phone: "",
  showPhone: false,
  location: "",
  socials: { instagram: "", linkedin: "", behance: "", artstation: "" },
  timeline: [
    { year: "2023 — Present", title: "BA (Hons) Illustration & Animation", org: "State School of Design" },
    { year: "2025", title: "Summer Studio Fellow", org: "Field & Co. Studio" },
    { year: "2024", title: "Emerging Illustrator Award — Shortlist", org: "Student Design Awards" },
    { year: "2022 — 2023", title: "Foundation in Art & Design", org: "City College" },
  ],
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const { blobs } = await list({ prefix: SETTINGS_PATH, limit: 1 });
    const match = blobs.find((b) => b.pathname === SETTINGS_PATH);
    if (!match) return defaultSettings;
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return defaultSettings;
    const data = (await res.json()) as Partial<SiteSettings>;
    return {
      ...defaultSettings,
      ...data,
      socials: { ...defaultSettings.socials, ...(data.socials ?? {}) },
      timeline: data.timeline && data.timeline.length > 0 ? data.timeline : defaultSettings.timeline,
    };
  } catch {
    return defaultSettings;
  }
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await put(SETTINGS_PATH, JSON.stringify(settings, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
