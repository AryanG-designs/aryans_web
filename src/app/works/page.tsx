import { getProjects } from "@/lib/store";
import WorksClient from "@/components/WorksClient";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function WorksPage() {
  const projects = await getProjects();

  return (
    <div className="px-6 pb-28 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">Full Portfolio</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">Works</h1>
          <p className="mt-4 max-w-xl text-ink-soft">
            A collection of academic and personal projects across illustration
            and animation — each with its own process archived alongside the
            outcome.
          </p>
        </Reveal>

        <WorksClient projects={projects} />
      </div>
    </div>
  );
}
