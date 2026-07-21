import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects-grid";
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
    <div className="space-y-10 sm:space-y-12">
      <PageHeader
        badge={projectsContent.badge}
        title={projectsContent.pageTitle}
        description={projectsContent.pageDescription}
      />

      <ProjectsGrid projects={projects} />
    </div>
  );
}
