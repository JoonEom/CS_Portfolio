"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ExperienceEntry } from "@/types/content";
import { Spotlight } from "./motion-primitives";

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const isCurrent = (duration: string) => /present/i.test(duration);

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLOListElement>(null);

  // Drives the rail so it draws downward as the list is scrolled through
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ol ref={containerRef} className="relative space-y-5 sm:space-y-6">
      {/* Continuous rail behind the markers, hidden on small screens */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[7px] top-6 hidden w-px bg-border sm:block"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: railScale }}
        className="absolute bottom-6 left-[7px] top-6 hidden w-px origin-top bg-gradient-to-b from-accent-orange via-accent-amber to-accent-orange/30 sm:block"
      />

      {entries.map((entry, index) => (
        <motion.li
          key={`${entry.company}-${entry.role}-${index}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative sm:pl-10"
        >
          {/* Timeline marker */}
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: 0.15,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className={`absolute left-0 top-7 hidden h-[15px] w-[15px] items-center justify-center rounded-full border-2 sm:flex ${
              isCurrent(entry.duration)
                ? "border-accent-orange bg-accent-orange"
                : "border-border bg-surface"
            }`}
          >
            {isCurrent(entry.duration) && (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-surface" />
                {/* Pulsing halo marks the roles that are still running */}
                <motion.span
                  className="absolute inset-0 rounded-full bg-accent-orange/40"
                  animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </>
            )}
          </motion.span>

          <Spotlight className="card p-5 transition duration-300 hover:border-accent-orange/30 hover:shadow-card-hover sm:p-7">
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
              {entry.technologies.map((tech, techIndex) => (
                <motion.span
                  key={`${entry.company}-${tech}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.25 + techIndex * 0.035,
                    ease: "easeOut",
                  }}
                  className="chip transition-colors duration-200 hover:border-accent-orange/40 hover:text-accent-orange"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-orange transition hover:gap-2"
              >
                Visit {entry.company}
                <ArrowUpRight
                  className="h-4 w-4 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            )}
          </Spotlight>
        </motion.li>
      ))}
    </ol>
  );
}
