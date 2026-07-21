"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Target } from "lucide-react";
import { getHeroContent } from "@/lib/content";
import { BasketballIcon } from "./basketball-icon";
import { AnimatedText, CountUp } from "./motion-primitives";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const heroContent = getHeroContent();
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    { value: heroContent.stats.gpa, label: "GPA" },
    { value: heroContent.stats.basketball, label: "Lifetime Points" },
    { value: heroContent.stats.graduation, label: "Graduation" },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-10 lg:p-14">
      {/* Slow-drifting aurora, the only always-on motion on the page */}
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <motion.div
            className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(var(--accent-orange)/0.18),transparent_62%)] blur-2xl"
            animate={{
              x: [0, 28, -14, 0],
              y: [0, -22, 16, 0],
              scale: [1, 1.07, 0.96, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(var(--accent-amber)/0.16),transparent_62%)] blur-2xl"
            animate={{
              x: [0, -22, 18, 0],
              y: [0, 18, -14, 0],
              scale: [1, 0.95, 1.06, 1],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Half-court line work, kept faint so it reads as texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.07]"
      >
        <div className="absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border-2 border-accent-orange" />
        <div className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border-2 border-accent-orange" />
        <div className="absolute right-24 top-0 h-full w-px bg-accent-orange" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          <motion.span
            animate={
              shouldReduceMotion ? undefined : { rotate: [0, 14, -8, 0] }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: "easeInOut",
            }}
            className="inline-flex"
          >
            <BasketballIcon className="h-3 w-3" />
          </motion.span>
          {heroContent.badge.text}
        </motion.span>

        <h1 className="mt-6 text-pretty text-4xl font-semibold leading-[1.05] tracking-tightest text-foreground sm:text-5xl lg:text-6xl">
          <AnimatedText text={heroContent.title} delay={0.15} />
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-lg font-medium text-accent-orange sm:text-xl"
        >
          {heroContent.role}
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Stat line — numbers count up the first time they are seen */}
        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-muted px-3 py-4 transition-colors duration-300 hover:bg-surface"
            >
              <dt className="text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground sm:text-2xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
