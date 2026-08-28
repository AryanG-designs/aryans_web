import { list, put } from "@vercel/blob";

export type SiteSettings = {
  email: string;
  phone: string;
  showPhone: boolean;
  location: string;
  socials: {
    instagram: string;
    linkedin: string;
    behance: string;
  };
};

const SETTINGS_PATH = "data/settings.json";

export const defaultSettings: SiteSettings = {
  email: "hello@aryangoswami.design",
  phone: "",
  showPhone: false,
  location: "",
  socials: { instagram: "", linkedin: "", behance: "" },
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
