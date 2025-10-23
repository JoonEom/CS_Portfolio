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
