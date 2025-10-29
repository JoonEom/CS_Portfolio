"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Atom, BookOpen, Brain, Compass, Cpu, Microscope } from "lucide-react";
import { getAboutContent } from "@/lib/content";

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

const iconMap = {
  Brain,
  Cpu,
  BookOpen,
  Atom,
  Compass,
  Microscope,
};

export default function AboutPage() {
  const aboutContent = getAboutContent();
  
  return (
    <div className="space-y-16">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-10 rounded-3xl border border-orange-200 bg-orange-50/80 p-10 shadow-lg backdrop-blur dark:bg-orange-950/70 md:grid-cols-[1fr_1.2fr]"
      >
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
        >
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-orange-400/50 shadow-xl">
            <Image
              src="/images/profile3.jpeg"
              alt={`Portrait of ${aboutContent.name}`}
              fill
              sizes="160px"
              className="object-cover object-center scale-150"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {aboutContent.name}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              {aboutContent.bio}
            </p>
            <ul className="grid gap-2 text-sm text-muted-foreground/80">
              <li>
                <span className="font-semibold text-foreground">
                  Education:
                </span>
                {aboutContent.education}
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Interests:
                </span>
                {aboutContent.interests}
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Skills:
                </span>
                {aboutContent.skills}
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="space-y-6 rounded-2xl border border-dashed border-orange-300/40 bg-orange-100/20 p-8 shadow-inner dark:border-orange-600/40 dark:bg-orange-900/20"
        >
          <h2 className="text-xl font-semibold text-foreground">{aboutContent.coreThemes.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {aboutContent.coreThemes.description1}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {aboutContent.coreThemes.description2}
          </p>
          {aboutContent.coreThemes.description3 && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {aboutContent.coreThemes.description3}
            </p>
          )}
          {aboutContent.coreThemes.description4 && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {aboutContent.coreThemes.description4}
            </p>
          )}
        </motion.div>
      </motion.section>


      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 via-orange-100/20 to-orange-200/30 p-10 shadow-lg backdrop-blur dark:from-orange-950 dark:via-orange-900/70 dark:to-orange-950"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold text-foreground"
        >
          {aboutContent.interestsSection.title}
        </motion.h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutContent.interestsSection.items.map((interest, index) => {
            const Icon = iconMap[interest.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group rounded-2xl border border-orange-200/50 bg-orange-50/70 p-6 shadow-md transition dark:border-orange-800/50 dark:bg-orange-950/70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
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
