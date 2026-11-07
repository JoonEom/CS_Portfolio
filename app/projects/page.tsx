import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project-index";
import { PageHeader } from "@/components/page-header";
import { projects, getProjectsContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated showcase of production builds, AI-driven prototypes, and side experiments crafted by Minjoon Eom.",
};

export default function ProjectsPage() {
  const projectsContent = getProjectsContent();

  return (
    <>
      <PageHeader
        title={projectsContent.pageTitle}
        description={projectsContent.pageDescription}
      />
      <ProjectIndex projects={projects} />
    </>
  );
}
