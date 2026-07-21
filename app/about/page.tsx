"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Atom, BookOpen, Brain, Compass, Cpu, Microscope } from "lucide-react";
import { getAboutContent } from "@/lib/content";
import { Spotlight } from "@/components/motion-primitives";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
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

  const facts = [
    { label: "Education", value: aboutContent.education },
    { label: "Interests", value: aboutContent.interests },
    { label: "Skills", value: aboutContent.skills },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Intro */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="card overflow-hidden p-6 sm:p-9 lg:p-10"
      >
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-10">
          <div className="flex justify-center md:justify-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border sm:h-36 sm:w-36">
              <Image
                src="/images/profile3.jpeg"
                alt={`Portrait of ${aboutContent.name}`}
                fill
                sizes="(min-width: 640px) 144px, 112px"
                className="scale-150 object-cover object-center"
                priority
              />
            </div>
          </div>

          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tightest text-foreground sm:text-4xl">
              {aboutContent.name}
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              {aboutContent.bio}
            </p>

            <dl className="mt-7 space-y-3 border-t border-border pt-6">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                    {fact.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-foreground">
                    {fact.value.trim()}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </motion.section>

      {/* Besides coding */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="rounded-2xl border border-border bg-surface-muted p-6 sm:p-9 lg:p-10"
      >
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {aboutContent.coreThemes.title}
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 md:gap-8">
          {aboutContent.coreThemes.descriptions.map((desc, index) => (
            <p
              key={index}
              className="text-pretty text-sm leading-relaxed text-muted-foreground"
            >
              {desc}
            </p>
          ))}
        </div>
      </motion.section>

      {/* Interests & skills */}
      <section>
        <motion.h2
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          {aboutContent.interestsSection.title}
        </motion.h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutContent.interestsSection.items.map((interest, index) => {
            const Icon = iconMap[interest.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: (index % 3) * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group card transition duration-300 hover:-translate-y-1.5 hover:border-accent-orange/30 hover:shadow-card-hover"
              >
                <Spotlight className="p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-orange/10 text-accent-orange transition duration-300 group-hover:rotate-6 group-hover:bg-accent-orange group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                    {interest.label}
                  </h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {interest.description}
                  </p>
                </Spotlight>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
