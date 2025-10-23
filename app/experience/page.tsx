import type { Metadata } from "next";
import {
  ExperienceTimeline,
  type ExperienceEntry,
} from "@/components/experience-timeline";

export const metadata: Metadata = {
  title: "Experience — Minjoon Eom",
  description:
    "Browse Minjoon Eom's experience timeline spanning full stack engineering and AI research work.",
};

export default async function ExperiencePage() {
  const { default: experience } = (await import("@/data/experience.json")) as {
    default: ExperienceEntry[];
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center rounded-full border border-accent-teal/40 bg-accent-teal/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent-teal dark:border-accent-indigo/40 dark:bg-accent-indigo/15 dark:text-accent-lavender">
          Experience
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Building resilient products and curious experiments.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A vertical snapshot of filler roles where I balanced shipping
          features, iterating on research, and guiding teams toward reliable,
          human-centered engineering outcomes.
        </p>
      </header>

      <ExperienceTimeline entries={experience} />
    </div>
  );
}
