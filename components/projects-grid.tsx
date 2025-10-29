"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project, ProjectLinks } from "@/types/content";

type ProjectsGridProps = {
  projects: Project[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <motion.div
      className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {projects.map((project) => (
        <motion.article
          key={project.title}
          variants={cardVariants}
          whileHover={{ y: -8 }}
          className="group flex flex-col overflow-hidden rounded-3xl border border-orange-200 bg-orange-50/80 shadow-sm transition hover:shadow-lg dark:bg-orange-950/70"
        >
          <div className="relative h-56 w-full overflow-hidden">
            <motion.div whileHover={{ scale: 1.05 }} className="h-full w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-500 ease-out"
                loading="lazy"
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
              />
            </motion.div>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={`${project.title}-${tag}`}
                  className="rounded-full border border-orange-300 bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              {project.links.github ? (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-900/20"
                >
                  {project.links.github.includes('youtube.com') || project.links.github.includes('youtu.be') ? 'Watch Demo' : 'GitHub'}
                </Link>
              ) : (
                <div className="inline-flex w-full items-center justify-center rounded-full border border-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground">
                  GitHub Coming Soon
                </div>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
