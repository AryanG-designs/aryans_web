import { list, put } from "@vercel/blob";

export type TimelineEntry = {
  year: string;
  title: string;
  org: string;
};

export type HeroImage = {
  image: string;
  caption?: string;
};

export type SketchbookImage = {
  image: string;
  label: string;
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
  heroImages: HeroImage[];
  sketchbookImages: SketchbookImage[];
};

const SETTINGS_PATH = "data/settings.json";

export const defaultSettings: SiteSettings = {
  email: "hello@aryangoswami.design",
  phone: "",
  showPhone: false,
  location: "",
  socials: { instagram: "", linkedin: "", behance: "", artstation: "" },
  timeline: [],
  heroImages: [],
  sketchbookImages: [
    { image: "", label: "Sketch" },
    { image: "", label: "Material test" },
    { image: "", label: "Prototype v2" },
    { image: "", label: "Final" },
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
      timeline: data.timeline !== undefined ? data.timeline : defaultSettings.timeline,
      heroImages: data.heroImages ?? defaultSettings.heroImages,
      sketchbookImages: data.sketchbookImages !== undefined ? data.sketchbookImages : defaultSettings.sketchbookImages,
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
