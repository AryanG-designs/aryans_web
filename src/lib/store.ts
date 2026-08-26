import { list, put } from "@vercel/blob";
import { Project, seedProjects } from "./projects";

const DATA_PATH = "data/projects.json";

export async function getProjects(): Promise<Project[]> {
  try {
    const { blobs } = await list({ prefix: DATA_PATH, limit: 1 });
    const match = blobs.find((b) => b.pathname === DATA_PATH);
    if (!match) return seedProjects;
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return seedProjects;
    const data = (await res.json()) as Project[];
    if (!Array.isArray(data) || data.length === 0) return seedProjects;
    return data;
  } catch {
    return seedProjects;
  }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await put(DATA_PATH, JSON.stringify(projects, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
