import type { Metadata } from "next";
import { BoxScore } from "@/components/box-score";
import { PageHeader } from "@/components/page-header";
import { experience, getExperienceContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: "Browse Minjoon Eom's experience, role by role",
};

export default function ExperiencePage() {
  const experienceContent = getExperienceContent();

  return (
    <>
      <PageHeader
        title={experienceContent.pageTitle}
        description={experienceContent.pageDescription}
      />
      <BoxScore entries={experience} />
    </>
  );
}
