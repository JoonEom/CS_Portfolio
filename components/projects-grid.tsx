"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Play } from "lucide-react";
import { Project } from "@/types/content";
import { Spotlight } from "./motion-primitives";

type ProjectsGridProps = {
  projects: Project[];
};

const cardVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/** Picks the right label + icon for whatever kind of URL the project links to. */
function resolveLink(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return { label: "Watch demo", Icon: Play };
  }
  if (url.includes("github")) {
    return { label: "View source", Icon: Github };
  }
  return { label: "Live site", Icon: ArrowUpRight };
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {projects.map((project, index) => {
        const link = project.links.github
          ? resolveLink(project.links.github)
          : null;

        return (
          <motion.article
            key={project.title}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: (index % 3) * 0.08,
            }}
            className="group card flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:border-accent-orange/30 hover:shadow-card-hover"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-surface-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-[600ms] ease-out group-hover:scale-[1.06]"
                loading="lazy"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              />
              {/* Warm veil that lifts as the card is hovered */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-accent-orange/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>

            <Spotlight className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={`${project.title}-${tag}`} className="chip">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex-1" />

              {link && project.links.github ? (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-orange transition hover:gap-2"
                >
                  <link.Icon className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                  <span className="sr-only"> for {project.title}</span>
                </Link>
              ) : (
                <span className="text-sm font-medium text-muted-foreground/70">
                  Source coming soon
                </span>
              )}
            </Spotlight>
          </motion.article>
        );
      })}
    </div>
  );
}
