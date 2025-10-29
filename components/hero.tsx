"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Target } from "lucide-react";
import { getHeroContent } from "@/lib/content";
import { BasketballIcon } from "./basketball-icon";

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const list = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2, staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const heroContent = getHeroContent();
  
  return (
    <section className="relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-100/30 p-6 shadow-lg dark:from-orange-950 dark:via-orange-900 dark:to-orange-950/20 sm:rounded-3xl sm:p-8 lg:p-10">
      {/* Basketball Court Lines Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-orange-600"></div>
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-600 sm:h-32 sm:w-32"></div>
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-600 sm:h-16 sm:w-16"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-3xl space-y-6 sm:space-y-8"
      >
        <motion.span
          variants={item}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-800 shadow-sm backdrop-blur dark:border-orange-800 dark:bg-orange-900/80 dark:text-orange-200"
        >
          <BasketballIcon className="h-3.5 w-3.5" />
          {heroContent.badge.text}
        </motion.span>

        <motion.h1
          variants={item}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white"
        >
          {heroContent.title}
        </motion.h1>

        <motion.p
          variants={item}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl dark:text-gray-300"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.div
          variants={list}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.2, staggerChildren: 0.08 }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <motion.div variants={item} transition={{ duration: 0.4, ease: "easeOut" }}>
            <Link
              href={heroContent.buttons.primary.href}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-700 hover:shadow-xl sm:w-auto"
            >
              <Target className="h-4 w-4" />
              {heroContent.buttons.primary.text}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div variants={item} transition={{ duration: 0.4, ease: "easeOut" }}>
            <Link
              href={heroContent.buttons.secondary.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-orange-300 px-6 py-3 text-sm font-semibold text-orange-700 transition hover:border-orange-400 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-300 dark:hover:bg-orange-900/20 sm:w-auto"
            >
              <Trophy className="h-4 w-4" />
              {heroContent.buttons.secondary.text}
            </Link>
          </motion.div>
        </motion.div>

        {/* Basketball Stats */}
        <motion.div
          variants={item}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-white/50 p-3 backdrop-blur dark:bg-orange-900/50 sm:mt-8 sm:gap-4 sm:rounded-2xl sm:p-4"
        >
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600 sm:text-2xl">{heroContent.stats.gpa}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">GPA</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600 sm:text-2xl">{heroContent.stats.basketball}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Lifetime Points</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600 sm:text-2xl">{heroContent.stats.graduation}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Graduation</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Basketball Decoration */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 blur-2xl sm:-right-20 sm:-top-20 sm:h-40 sm:w-40"
      />
      
      {/* Basketball Pattern */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-4 top-4 sm:right-8 sm:top-8"
      >
        <BasketballIcon className="h-12 w-12 text-orange-600 sm:h-16 sm:w-16" />
      </motion.div>
    </section>
  );
}
