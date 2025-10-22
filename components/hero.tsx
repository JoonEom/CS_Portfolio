"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const list = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2, staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background via-white/90 to-accent-lavender/10 p-10 shadow-lg dark:from-slate-950 dark:via-slate-950/80 dark:to-slate-900">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10 max-w-3xl space-y-8"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-indigo shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:text-accent-lavender"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Portfolio in progress
        </motion.span>

        <motion.h1
          variants={item}
          className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Minjoon Eom — Full stack developer and AI researcher
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          I build resilient web systems, craft thoughtful AI experiments, and
          share notes about the journey. Expect a blend of production-ready
          engineering and exploratory storytelling across projects and research
          updates.
        </motion.p>

        <motion.div
          variants={list}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 sm:flex-row"
        >
          <motion.div variants={item}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-indigo px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-accent-indigo/90"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div variants={item}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-accent-teal/50 px-6 py-3 text-sm font-semibold text-accent-teal transition hover:border-accent-teal hover:bg-accent-teal/10"
            >
              Let’s collaborate
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent-gradient blur-3xl dark:opacity-60"
      />
    </section>
  );
}
