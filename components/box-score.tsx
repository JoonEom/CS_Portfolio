import { ArrowUpRight } from "lucide-react";
import type { ExperienceEntry } from "@/types/content";

type BoxScoreProps = {
  entries: ExperienceEntry[];
  /** Compact rows show only period, team and role: used on the home page. */
  compact?: boolean;
};

/**
 * Experience laid out like a box score: one ruled row per team, period in
 * tabular numerals on the left. Rules draw in as each row scrolls into view,
 * and a row lifts into court orange on hover or keyboard focus.
 */
export function BoxScore({ entries, compact = false }: BoxScoreProps) {
  return (
    <div className="shell">
      <ol className="border-b border-border">
        {entries.map((entry) => (
          <li
            key={`${entry.company}-${entry.duration}`}
            className="rule-draw row-wipe group"
          >
            <div className="grid gap-x-10 gap-y-2 px-3 py-7 sm:px-4 md:grid-cols-[11.5rem_minmax(0,1fr)]">
              <p className="tnum font-mono text-sm text-muted-foreground group-hover:text-ink group-focus-within:text-ink md:pt-3">
                {entry.duration}
              </p>

              <div>
                <h3 className="display text-[2.5rem] sm:text-6xl">
                  {entry.link ? (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link"
                    >
                      {entry.company}
                      <ArrowUpRight
                        className="ml-2 inline-block h-[0.5em] w-[0.5em] align-baseline opacity-60 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
                        aria-hidden="true"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    entry.company
                  )}
                </h3>
                <p className="mt-2 text-lg font-bold">{entry.role}</p>

                {!compact && (
                  <>
                    <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground group-hover:text-ink/85 group-focus-within:text-ink/85">
                      {entry.description}
                    </p>
                    <p className="mt-4 max-w-2xl text-sm font-semibold text-muted-foreground group-hover:text-ink/80 group-focus-within:text-ink/80">
                      {entry.technologies.join(" · ")}
                    </p>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
