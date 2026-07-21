"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ExperienceEntry } from "@/types/content";

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const isCurrent = (duration: string) => /present/i.test(duration);

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <ol className="relative space-y-5 sm:space-y-6">
      {/* Continuous rail behind the markers, hidden on small screens */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[7px] top-6 hidden w-px bg-gradient-to-b from-accent-orange/40 via-border to-transparent sm:block"
      />

      {entries.map((entry, index) => (
        <motion.li
          key={`${entry.company}-${entry.role}-${index}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative sm:pl-10"
        >
          {/* Timeline marker */}
          <span
            aria-hidden="true"
            className={`absolute left-0 top-7 hidden h-[15px] w-[15px] items-center justify-center rounded-full border-2 sm:flex ${
              isCurrent(entry.duration)
                ? "border-accent-orange bg-accent-orange"
                : "border-border bg-surface"
            }`}
          >
            {isCurrent(entry.duration) && (
              <span className="h-1.5 w-1.5 rounded-full bg-surface" />
            )}
          </span>

          <div className="card p-5 transition duration-300 hover:border-accent-orange/30 hover:shadow-card-hover sm:p-7">
            {/* Header */}
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {entry.role}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-accent-orange">
                  {entry.company}
                </p>
              </div>
              <span className="shrink-0 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {entry.duration}
              </span>
            </div>

            <p className="mt-3.5 text-pretty text-sm leading-relaxed text-muted-foreground">
              {entry.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {entry.technologies.map((tech) => (
                <span key={`${entry.company}-${tech}`} className="chip">
                  {tech}
                </span>
              ))}
            </div>

            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-orange transition hover:gap-2"
              >
                Visit {entry.company}
                <ArrowUpRight
                  className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
