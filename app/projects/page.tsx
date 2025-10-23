import type { Metadata } from "next";
import { ProjectsGrid, type Project } from "@/components/projects-grid";

export const metadata: Metadata = {
  title: "Projects — Minjoon Eom",
  description:
    "A curated showcase of filler experiments, production builds, and AI-driven prototypes crafted by Minjoon Eom.",
};

export default async function ProjectsPage() {
  const { default: projects } = (await import("@/data/projects.json")) as {
    default: Project[];
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center rounded-full border border-accent-teal/40 bg-accent-teal/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent-teal dark:border-accent-indigo/40 dark:bg-accent-indigo/15 dark:text-accent-lavender">
          Projects
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          A filler playground of shipped work and speculative builds.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Explore case studies spanning interface craft, infrastructure
          automation, and AI prototypes designed to unlock sharper workflows.
        </p>
      </header>

      <ProjectsGrid projects={projects} />
    </div>
  );
}
