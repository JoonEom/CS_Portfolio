import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageHeader } from "@/components/page-header";
import { experience, getExperienceContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: "Browse Minjoon Eom's experience timeline",
};

export default function ExperiencePage() {
  const experienceContent = getExperienceContent();

  return (
    <div className="space-y-10 sm:space-y-12">
      <PageHeader
        badge={experienceContent.badge}
        title={experienceContent.pageTitle}
        description={experienceContent.pageDescription}
      />

      <ExperienceTimeline entries={experience} />
    </div>
  );
}
