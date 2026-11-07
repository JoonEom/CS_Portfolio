import type { Metadata } from "next";
import Image from "next/image";
import { getAboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Minjoon Eom is a software engineer at DigitalOcean and a University of Washington computer science student.",
};

export default function AboutPage() {
  const about = getAboutContent();

  const facts = [
    { label: "Education", value: about.education },
    { label: "Interests", value: about.interests },
    { label: "Skills", value: about.skills },
  ];

  return (
    <>
      <header className="shell pb-12 pt-12 sm:pb-16 sm:pt-20">
        <div className="flex items-start gap-6 sm:gap-10">
          <div className="min-w-0 flex-1">
            <h1 className="display text-[clamp(3.75rem,13vw,10.5rem)] leading-[0.82]">
              About
            </h1>
            <p className="mt-6 max-w-3xl text-balance text-xl font-semibold leading-snug sm:text-3xl sm:leading-snug">
              {about.bio}
            </p>
          </div>
          <div className="relative hidden h-36 w-36 shrink-0 overflow-hidden border-2 border-foreground/80 sm:block">
            <Image
              src="/images/profile-crop.jpg"
              alt={`Portrait of ${about.name}`}
              fill
              sizes="9rem"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </header>

      {/* Scouting report */}
      <section className="shell">
        <dl className="border-b border-border">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rule-draw grid gap-1 py-6 md:grid-cols-[11.5rem_minmax(0,1fr)] md:gap-10"
            >
              <dt className="font-bold text-muted-foreground">{fact.label}</dt>
              <dd className="max-w-3xl text-lg font-medium leading-relaxed">
                {fact.value.trim()}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Focus areas */}
      <section className="shell pt-20 sm:pt-28">
        <h2 className="display text-[clamp(3rem,8vw,6rem)] leading-[0.85]">
          {about.interestsSection.title}
        </h2>
        <ul className="mt-8 border-b border-border">
          {about.interestsSection.items.map((item) => (
            <li key={item.label} className="rule-draw row-wipe group">
              <div className="grid gap-x-10 gap-y-1 px-3 py-5 sm:px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-baseline">
                <h3 className="display text-[2rem] sm:text-5xl">
                  {item.label}
                </h3>
                <p className="text-lg text-muted-foreground group-hover:text-ink">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Off the court */}
      <section className="shell pt-20 sm:pt-28">
        <h2 className="display text-[clamp(3rem,8vw,6rem)] leading-[0.85]">
          {about.coreThemes.title}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-12">
          {about.coreThemes.descriptions.map((desc) => (
            <p
              key={desc}
              className="text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              {desc}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
