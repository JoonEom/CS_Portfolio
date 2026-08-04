import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProjectsGrid } from "@/components/projects-grid";
import { Marquee, Reveal, Spotlight } from "@/components/motion-primitives";
import { experience, getAboutContent, projects } from "@/lib/content";

const featuredProjects = projects.slice(0, 3);
const recentExperience = experience.slice(0, 3);

function SectionHeading({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <Reveal className="mb-6 flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <Link
        href={href}
        className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent-orange transition hover:gap-2"
      >
        {linkLabel}
        <ArrowRight
          className="h-4 w-4 transition group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </Reveal>
  );
}

export default function Home() {
  const skills = getAboutContent()
    .skills.split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div className="space-y-16 sm:space-y-20">
      <Hero />

      {/* Skills ticker */}
      <Reveal>
        <Marquee items={skills} />
      </Reveal>

      {/* Recent experience */}
      <section>
        <SectionHeading
          title="Recent experience"
          href="/experience"
          linkLabel="Full timeline"
        />
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          {recentExperience.map((entry, index) => (
            <Reveal key={`${entry.company}-${entry.role}`} delay={index * 0.08}>
              <Spotlight className="flex flex-col gap-1 p-5 transition-colors duration-300 hover:bg-surface-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {entry.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {entry.link ? (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1 font-medium text-accent-orange transition hover:underline"
                      >
                        {entry.company}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <span className="font-medium">{entry.company}</span>
                    )}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {entry.duration}
                </span>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section>
        <SectionHeading
          title="Featured projects"
          href="/projects"
          linkLabel="All projects"
        />
        <ProjectsGrid projects={featuredProjects} />
      </section>

      {/* Closing call to action */}
      <Reveal>
        <Spotlight className="overflow-hidden rounded-2xl border border-accent-orange/25 bg-accent-orange/[0.07] px-6 py-10 text-center sm:px-10 sm:py-14">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Looking for someone to build with?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            I&apos;m open to new grad roles, collaborations, and interesting
            problems. The fastest way to reach me is a quick note.
          </p>
          <Link href="/contact" className="btn-primary group mt-7">
            Get in touch
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Spotlight>
      </Reveal>
    </div>
  );
}
