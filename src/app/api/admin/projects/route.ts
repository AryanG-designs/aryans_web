import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/lib/store";
import { Project } from "@/lib/projects";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.projects)) {
    return NextResponse.json({ error: "Expected { projects: Project[] }" }, { status: 400 });
  }

  const projects = body.projects as Project[];

  for (const p of projects) {
    if (!p.slug || !p.title) {
      return NextResponse.json({ error: "Every project needs a slug and title." }, { status: 400 });
    }
  }

  await saveProjects(projects);
  return NextResponse.json({ ok: true });
}
