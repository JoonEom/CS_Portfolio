import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { getHeroContent } from "@/lib/content";
import { ShotDiagram } from "./shot-diagram";

/**
 * First viewport = the thesis. A full-bleed court-orange field, the name set
 * like a jersey, and a shot diagram that plays once. The page's one authored
 * motion lives here; nothing else on the site enters with an effect.
 */
export function Hero() {
  const hero = getHeroContent();
  const [first, ...rest] = hero.title.split(" ");
  const last = rest.join(" ");
  const [roleMain, ...roleRest] = hero.role.split(" · ");

  return (
    <section className="relative overflow-hidden bg-court text-ink">
      <div className="shell relative flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-10 pb-0 pt-10 sm:pt-14 lg:min-h-[min(58rem,calc(100svh-4rem))]">
        <div className="relative z-10 max-w-3xl">
          <h1 className="display text-[clamp(5rem,19vw,15rem)] leading-[0.8]">
            {first}
            <br />
            {last}
          </h1>

          <p className="mt-6 text-xl font-bold leading-snug sm:text-2xl">
            {roleMain}
          </p>
          {roleRest.length > 0 && (
            <p className="mt-1 max-w-md text-base font-medium opacity-85 sm:text-lg">
              {roleRest.join(" · ")}
            </p>
          )}
          <p className="mt-4 text-base font-medium opacity-80 sm:text-lg">
            {hero.badge.text}.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href={hero.buttons.primary.href} className="btn btn-ink">
              {hero.buttons.primary.text}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={hero.buttons.secondary.href}
              className="group inline-flex items-center gap-2 text-base font-bold underline decoration-2 underline-offset-[6px]"
            >
              {hero.buttons.secondary.text}
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <ShotDiagram className="relative -mx-4 mt-2 w-[calc(100%+2rem)] max-w-none self-end sm:-mx-6 sm:w-[calc(100%+3rem)] lg:absolute lg:-right-10 lg:bottom-0 lg:mx-0 lg:mt-0 lg:w-[66%]" />
      </div>
    </section>
  );
}
