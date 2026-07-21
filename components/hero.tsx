"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Target } from "lucide-react";
import { getHeroContent } from "@/lib/content";
import { BasketballIcon } from "./basketball-icon";

const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const heroContent = getHeroContent();

  const stats = [
    { value: heroContent.stats.gpa, label: "GPA" },
    { value: heroContent.stats.basketball, label: "Lifetime Points" },
    { value: heroContent.stats.graduation, label: "Graduation" },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-10 lg:p-14">
      {/* Half-court line work, kept faint so it reads as texture, not decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.07]"
      >
        <div className="absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border-2 border-accent-orange" />
        <div className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border-2 border-accent-orange" />
        <div className="absolute right-24 top-0 h-full w-px bg-accent-orange" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10 max-w-2xl"
      >
        <motion.span
          variants={item}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="eyebrow"
        >
          <BasketballIcon className="h-3 w-3" />
          {heroContent.badge.text}
        </motion.span>

        <motion.h1
          variants={item}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-6 text-pretty text-4xl font-semibold leading-[1.05] tracking-tightest text-foreground sm:text-5xl lg:text-6xl"
        >
          {heroContent.title}
        </motion.h1>

        <motion.p
          variants={item}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-4 text-lg font-medium text-accent-orange sm:text-xl"
        >
          {heroContent.role}
        </motion.p>

        <motion.p
          variants={item}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href={heroContent.buttons.primary.href}
            className="btn-primary group w-full sm:w-auto"
          >
            <Target className="h-4 w-4" aria-hidden="true" />
            {heroContent.buttons.primary.text}
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href={heroContent.buttons.secondary.href}
            className="btn-secondary w-full sm:w-auto"
          >
            <Trophy className="h-4 w-4" aria-hidden="true" />
            {heroContent.buttons.secondary.text}
          </Link>
        </motion.div>

        {/* Stat line */}
        <motion.dl
          variants={item}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface-muted px-3 py-4">
              <dt className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
