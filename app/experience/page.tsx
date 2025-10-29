import type { Metadata } from "next";
import {
  ExperienceTimeline,
} from "@/components/experience-timeline";
import { experience, getExperienceContent } from "@/lib/content";
import { ExperienceEntry } from "@/types/content";

export const metadata: Metadata = {
  title: "Experience — Minjoon Eom",
  description:
    "Browse Minjoon Eom's experience timeline",
};

export default async function ExperiencePage() {
  const experienceContent = getExperienceContent();

  return (
    <div className="space-y-8 sm:space-y-10">
      <header className="space-y-3 sm:space-y-4">
        <span className="inline-flex items-center rounded-full border border-orange-300/40 bg-orange-100/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-700 dark:border-orange-600/40 dark:bg-orange-900/30 dark:text-orange-300 sm:px-4">
          {experienceContent.badge}
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {experienceContent.pageTitle}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {experienceContent.pageDescription}
        </p>
      </header>

      <ExperienceTimeline entries={experience} />
    </div>
  );
}
