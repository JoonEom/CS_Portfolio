"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export type ExperienceEntry = {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  link?: string | null;
  image?: string;
};

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};


export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <div className="space-y-8">
      {entries.map((entry, index) => (
        <motion.div
          key={`${entry.company}-${entry.role}-${index}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Gradient divider */}
          {index > 0 && (
            <div className="mb-8 h-px bg-gradient-to-r from-transparent via-accent-indigo/20 to-transparent" />
          )}
          
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white/80 p-8 shadow-sm backdrop-blur dark:bg-slate-950/70">
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {entry.role}
                  </h3>
                  <span className="text-sm font-medium text-accent-indigo dark:text-accent-lavender">
                    {entry.company}
                  </span>
                </div>
                <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {entry.duration}
                </span>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {entry.description}
              </p>

              {/* Technologies */}
              <div className="mb-4 flex flex-wrap gap-2">
                {entry.technologies.map((tech) => (
                  <span
                    key={`${entry.company}-${tech}`}
                    className="rounded-full bg-accent-lavender/20 px-3 py-1 text-xs font-semibold text-accent-indigo dark:bg-accent-indigo/20 dark:text-accent-lavender"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link Button */}
              {entry.link && (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-indigo px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-indigo/90 hover:shadow-md"
                >
                  <ExternalLink className="h-4 w-4" />
                  Link
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
