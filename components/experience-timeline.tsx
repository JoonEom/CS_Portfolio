"use client";

import { motion } from "framer-motion";

export type ExperienceEntry = {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
};

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <motion.ol
      className="relative border-l border-border pl-6 md:pl-8"
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      {entries.map((entry, index) => (
        <motion.li
          key={`${entry.company}-${entry.role}-${index}`}
          variants={itemVariants}
          className="relative pb-12 pl-6 last:pb-0"
        >
          <span className="absolute left-[-0.95rem] top-9 flex h-5 w-5 items-center justify-center rounded-full border border-accent-teal/60 bg-white shadow-sm dark:border-accent-indigo/60 dark:bg-slate-950">
            <span className="h-3 w-3 rounded-full bg-accent-teal shadow-glow dark:bg-accent-indigo" />
          </span>

          <motion.div
            layout
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-white/80 p-6 shadow-sm backdrop-blur transition dark:bg-slate-950/70"
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-accent-indigo/10 via-transparent to-accent-teal/10 opacity-0 transition group-hover:opacity-100"
              layout
            />

            <div className="relative z-10 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {entry.role}
                </h3>
                <span className="rounded-full border border-accent-teal/30 bg-accent-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-teal dark:border-accent-indigo/30 dark:bg-accent-indigo/10 dark:text-accent-lavender">
                  {entry.company}
                </span>
              </div>
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {entry.duration}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {entry.technologies.map((tech) => (
                  <span
                    key={`${entry.company}-${tech}`}
                    className="rounded-full bg-accent-lavender/20 px-3 py-1 text-xs font-semibold text-accent-indigo dark:bg-accent-indigo/20 dark:text-accent-lavender"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
