"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { ExperienceEntry } from "@/types/content";

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
            <div className="mb-8 h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />
          )}
          
          <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-orange-50/80 p-8 shadow-sm backdrop-blur dark:bg-orange-950/70">
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {entry.role}
                  </h3>
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
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
                    className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
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
                  className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700 hover:shadow-md"
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
