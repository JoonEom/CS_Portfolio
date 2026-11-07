import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { BoxScore } from "@/components/box-score";
import { ProjectIndex } from "@/components/project-index";
import { experience, getHeroContent, projects } from "@/lib/content";

// Phrases in the intro that carry the pitch get a court-orange underline.
const highlights = [
  "applied AI",
  "cloud infrastructure",
  "human-centered products",
  "Kairo",
  "DigitalOcean",
];

function Highlighted({ text }: { text: string }) {
  const pattern = new RegExp(`(${highlights.join("|")})`, "g");
  return (
    <>
      {text.split(pattern).map((part, index) =>
        highlights.includes(part) ? (
          <span
            key={index}
            className="underline decoration-court decoration-[0.12em] underline-offset-[0.18em] [text-decoration-skip-ink:none]"
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

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
    <div className="shell mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <h2 className="display text-[clamp(2rem,5vw,3.5rem)] leading-[0.9]">
        {title}
      </h2>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 font-bold text-accent-text underline decoration-2 underline-offset-[6px]"
      >
        {linkLabel}
        <ArrowRight
          className="h-4 w-4 transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

export default function Home() {
  const hero = getHeroContent();

  return (
    <>
      <Hero />

      <section className="shell py-16 sm:py-24">
        <p className="max-w-4xl text-balance text-2xl font-semibold leading-snug sm:text-4xl sm:leading-tight">
          <Highlighted text={hero.subtitle} />
        </p>
      </section>

      <section>
        <SectionHeading
          title="Recent experience"
          href="/experience"
          linkLabel="Full box score"
        />
        <BoxScore entries={recentExperience} compact />
      </section>

      <section className="pt-20 sm:pt-28">
        <SectionHeading
          title="Featured projects"
          href="/projects"
          linkLabel="All projects"
        />
        <ProjectIndex projects={featuredProjects} />
      </section>
    </>
  );
}
