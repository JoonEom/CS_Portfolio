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
    label: "AI Robotics",
    description: "Computer vision and teleoperation systems",
    icon: Brain,
  },
  {
    label: "Distributed Systems",
    description: "Scalable cloud architectures",
    icon: Cpu,
  },
  {
    label: "Human-Computer Interaction",
    description: "Intuitive user interfaces",
    icon: BookOpen,
  },
  {
    label: "Full-Stack Development",
    description: "End-to-end web applications",
    icon: Atom,
  },
  {
    label: "Machine Learning",
    description: "Deep learning and neural networks",
    icon: Compass,
  },
  {
    label: "Research",
    description: "Academic and industry collaboration",
    icon: Microscope,
  },
];

const timeline = [
  {
    title: "University of Washington CBE — Software Engineer",
    year: "Jun 2025 – Present",
    details:
      "Built and launched a Python + SQL dashboard to simplify UW's ticketing system for staff, adopted across the IT team to centralize requests and streamline workflows.",
  },
  {
    title: "Personal Robotics Lab — AI Robotics Researcher",
    year: "Dec 2024 – Jun 2025",
    details:
      "Engineered a pipeline for Apple Vision Pro teleoperation using Python + Docker, achieving 88.6% joint alignment and 30% smoother motion. Conducted 100+ simulated trials with CNN-based pose estimation and presented results at the UW Allen School Research Showcase (300+ attendees).",
  },
  {
    title: "The Blue Heron — Software Engineer",
    year: "Jun 2024 – Sep 2024",
    details:
      "Built and deployed a React website that boosted online orders by 20% and traffic by 10%. Collaborated directly with the CEO to iterate on UX and brand alignment.",
  },
  {
    title: "University of Washington — Computer Science B.S.",
    year: "2023 – 2027",
    details:
      "Pursuing Bachelor of Science in Computer Science with focus on AI, robotics, and full-stack development. Current GPA: 3.7",
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
              I'm Minjoon Eom, a Computer Science student at the University of Washington (Class of 2027) passionate about full-stack development, AI research, and building systems that connect people and data.
            </p>
            <ul className="grid gap-2 text-sm text-muted-foreground/80">
              <li>
                <span className="font-semibold text-foreground">
                  Education:
                </span>
                UW Computer Science B.S. (3.7 GPA, Seattle WA)
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Interests:
                </span>
                AI robotics, distributed systems, human-computer interaction
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Skills:
                </span>
                Python, Java, TypeScript, SQL, React, Next.js, Docker, AWS, PyTorch
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
