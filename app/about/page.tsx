"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Atom, BookOpen, Brain, Compass, Cpu, Microscope } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const interests = [
  {
    label: "Human-centered AI",
    description: "Responsible, interpretable systems",
    icon: Brain,
  },
  {
    label: "Distributed systems",
    description: "Resilient cloud architectures",
    icon: Cpu,
  },
  {
    label: "Data storytelling",
    description: "Interactive, narrative analytics",
    icon: BookOpen,
  },
  {
    label: "Scientific computing",
    description: "Numerical modeling & simulation",
    icon: Atom,
  },
  {
    label: "Field research",
    description: "Global social impact studies",
    icon: Compass,
  },
  {
    label: "Lab collaboration",
    description: "Cross-disciplinary prototyping",
    icon: Microscope,
  },
];

const timeline = [
  {
    title: "Ph.D. in Computer Science, MIT",
    year: "2023 — Present",
    details:
      "Researching human-AI collaboration for decision support, blending cognitive science and interactive systems design.",
  },
  {
    title: "M.S. in Computational Design, Stanford",
    year: "2021",
    details:
      "Investigated adaptive interfaces for complex data exploration; thesis received the program innovation award.",
  },
  {
    title: "Senior Software Engineer, Atlas Labs",
    year: "2018 — 2020",
    details:
      "Led a platform team delivering ML-driven analytics to Fortune 100 clients with 99.95% uptime across multi-cloud regions.",
  },
  {
    title: "B.S. in Computer Engineering, KAIST",
    year: "2017",
    details:
      "Graduated magna cum laude with a focus on embedded intelligence and large-scale simulation research.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-10 rounded-3xl border border-border bg-white/80 p-10 shadow-lg backdrop-blur dark:bg-slate-950/70 md:grid-cols-[1fr_1.2fr]"
      >
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
        >
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-accent-indigo/50 shadow-xl">
            <Image
              src="/profile.svg"
              alt="Portrait of Minjoon Eom"
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Minjoon Eom
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              I am a full stack developer and AI researcher studying how humans
              partner with intelligent tools. My journey spans human-computer
              interaction, large-scale distributed systems, and field research
              on technology&apos;s role in social resilience. Current interests
              include trustworthy decision support, interpretable agents, and
              communities that synthesize research into accessible narratives.
            </p>
            <ul className="grid gap-2 text-sm text-muted-foreground/80">
              <li>
                <span className="font-semibold text-foreground">
                  Education:
                </span>
                MIT (Ph.D.), Stanford (M.S.), KAIST (B.S.)
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Background:
                </span>
                Platform engineering, interactive visualization, global research
                fellowships
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Research Interests:
                </span>
                Human-centered AI, cooperative autonomy, resilient knowledge
                systems
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="space-y-6 rounded-2xl border border-dashed border-accent-teal/40 bg-accent-teal/5 p-8 shadow-inner dark:border-accent-indigo/40 dark:bg-accent-indigo/10"
        >
          <h2 className="text-xl font-semibold text-foreground">Core themes</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I build layered systems that translate complex research into
            intuitive experiences. From modeling uncertainty for climate
            initiatives to crafting narrative analytics for policy teams, I
            focus on turning insight into action.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            When I&apos;m not prototyping new interfaces, you can find me
            mentoring cross-disciplinary teams, writing about humane technology,
            or mapping the next research residency.
          </p>
        </motion.div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl border border-border bg-white/70 p-10 shadow-md backdrop-blur dark:bg-slate-950/70"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold text-foreground"
        >
          Timeline
        </motion.h2>
        <motion.ul
          variants={itemVariants}
          className="mt-8 space-y-6 border-l border-border pl-6"
        >
          {timeline.map((entry) => (
            <motion.li
              key={entry.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
              className="relative rounded-xl bg-white/60 p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md dark:bg-slate-950/70"
            >
              <span className="absolute -left-[38px] mt-1 flex h-3 w-3 items-center justify-center">
                <span className="h-3 w-3 rounded-full border border-white bg-accent-indigo shadow" />
              </span>
              <p className="text-xs uppercase tracking-widest text-accent-teal">
                {entry.year}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {entry.details}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl border border-border bg-gradient-to-br from-white via-accent-lavender/10 to-accent-teal/10 p-10 shadow-lg backdrop-blur dark:from-slate-950 dark:via-slate-950/70 dark:to-slate-900"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold text-foreground"
        >
          Interests & Skills
        </motion.h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group rounded-2xl border border-white/50 bg-white/70 p-6 shadow-md transition dark:border-white/10 dark:bg-slate-950/70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-indigo/10 text-accent-indigo transition group-hover:bg-accent-indigo group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {interest.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {interest.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
