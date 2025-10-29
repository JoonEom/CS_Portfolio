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
  visible: { opacity: 1, y: 0 },
};


export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {entries.map((entry, index) => (
        <motion.div
          key={`${entry.company}-${entry.role}-${index}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Gradient divider */}
          {index > 0 && (
            <div className="mb-6 h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent sm:mb-8" />
          )}
          
          <div className="relative overflow-hidden rounded-xl border border-orange-200 bg-orange-50/80 p-4 shadow-sm backdrop-blur dark:bg-orange-950/70 sm:rounded-2xl sm:p-6 lg:p-8">
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    {entry.role}
                  </h3>
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                    {entry.company}
                  </span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                  {entry.duration}
                </span>
              </div>

              {/* Description */}
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground sm:mb-4">
                {entry.description}
              </p>

              {/* Technologies */}
              <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                {entry.technologies.map((tech) => (
                  <span
                    key={`${entry.company}-${tech}`}
                    className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 sm:px-3"
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
