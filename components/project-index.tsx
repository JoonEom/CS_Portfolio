"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Apple, Github, Play } from "lucide-react";
import type { Project } from "@/types/content";

type ProjectIndexProps = {
  projects: Project[];
};

/** Picks the right label + icon for whatever kind of URL the project links to. */
function resolveLink(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return { label: "Watch demo", Icon: Play };
  }
  if (url.includes("github")) {
    return { label: "View source", Icon: Github };
  }
  return { label: "Live site", Icon: ArrowUpRight };
}

function getLinks(project: Project) {
  return [
    project.links.appStore
      ? { href: project.links.appStore, label: "App Store", Icon: Apple }
      : null,
    project.links.website
      ? { href: project.links.website, label: "Website", Icon: ArrowUpRight }
      : null,
    project.links.github
      ? { href: project.links.github, ...resolveLink(project.links.github) }
      : null,
  ].filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}

/** The shared preview frame: every project gets the same 16:10 window. */
function Preview({
  project,
  tone,
}: {
  project: Project;
  tone: "page" | "row";
}) {
  const links = getLinks(project);
  const muted = tone === "row" ? "text-ink/85" : "text-muted-foreground";

  return (
    <div className="preview-in">
      <div className="relative aspect-[16/10] overflow-hidden border-2 border-foreground/80 bg-surface-muted">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 26rem, 90vw"
          className="object-cover"
        />
      </div>
      <p className={`mt-4 text-pretty leading-relaxed ${muted}`}>
        {project.description}
      </p>
      <p className={`mt-3 text-sm font-semibold ${muted}`}>
        {project.tags.join(" · ")}
      </p>
      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                tone === "row"
                  ? "inline-flex items-center gap-1.5 font-bold text-ink underline decoration-2 underline-offset-4"
                  : "link inline-flex items-center gap-1.5"
              }
            >
              <link.Icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
              <span className="sr-only"> for {project.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Projects as an index. On wide screens the list sits beside one sticky
 * preview window that follows hover and focus, so uneven source images all
 * read in the same frame. On narrow screens the active row expands in place.
 */
export function ProjectIndex({ projects }: ProjectIndexProps) {
  const [active, setActive] = useState(0);
  const current = projects[active] ?? projects[0];

  return (
    <div className="shell lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14">
      <ol className="border-b border-border">
        {projects.map((project, index) => {
          const isActive = index === active;
          return (
            <li
              key={project.title}
              data-active={isActive}
              className="rule-draw row-wipe group"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-expanded={isActive}
                className="flex w-full items-baseline gap-4 px-3 py-5 text-left sm:gap-6 sm:px-4"
              >
                <span className="tnum w-7 shrink-0 font-mono text-sm text-muted-foreground group-data-[active=true]:text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display flex-1 text-[1.75rem] group-data-[active=true]:text-ink sm:text-4xl">
                  {project.title}
                </span>
                <ArrowUpRight
                  className="h-6 w-6 shrink-0 -translate-x-2 self-center text-ink opacity-0 transition duration-300 group-data-[active=true]:translate-x-0 group-data-[active=true]:opacity-100"
                  aria-hidden="true"
                />
              </button>

              {isActive && (
                <div className="px-3 pb-7 pl-14 text-ink sm:pl-[4.75rem] lg:hidden">
                  <Preview project={project} tone="row" />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <aside
        aria-label="Project preview"
        className="sticky top-24 hidden self-start lg:block"
      >
        <div key={current.title}>
          <Preview project={current} tone="page" />
        </div>
      </aside>
    </div>
  );
}
