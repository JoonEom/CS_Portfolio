"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, RotateCcw } from "lucide-react";
import { getHeroContent } from "@/lib/content";
import { ShotDiagram } from "./shot-diagram";

/**
 * First viewport = the thesis. A court-orange field, the name set like a
 * jersey, and a shot diagram that plays once on load and again on request.
 *
 * Layout rule: the text and the diagram never share space. On wide screens
 * they sit in two columns of one grid, on narrow screens they stack. Nothing
 * is positioned over anything else, so no window size can put the diagram on
 * top of a button or a line of copy.
 */
export function Hero() {
  const hero = getHeroContent();
  const [first, ...rest] = hero.title.split(" ");
  const last = rest.join(" ");
  const [roleMain, ...roleRest] = hero.role.split(" · ");
  // Changing the key remounts the diagram, which replays every animation
  const [shot, setShot] = useState(0);

  return (
    <section className="relative overflow-hidden bg-court text-ink">
      <div className="shell grid items-end gap-x-10 gap-y-8 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="pb-2 lg:pb-14">
          {/* On wide screens the name is sized to fit its own column */}
          <h1 className="display text-[clamp(4.25rem,15vw,9rem)] font-black leading-[0.8] lg:text-[clamp(5rem,calc((100vw-5rem)/9.5),7.5rem)]">
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
            <button
              type="button"
              onClick={() => setShot((n) => n + 1)}
              className="group inline-flex items-center gap-2 text-base font-bold"
            >
              <RotateCcw
                className="h-4 w-4 transition duration-500 group-hover:-rotate-180"
                aria-hidden="true"
              />
              <span className="underline decoration-2 underline-offset-[6px]">
                Shoot again
              </span>
            </button>
          </div>
        </div>

        <ShotDiagram
          key={shot}
          className="-mx-4 w-[calc(100%+2rem)] max-w-none sm:-mx-6 sm:w-[calc(100%+3rem)] md:mx-0 md:ml-auto md:w-full md:max-w-[36rem] lg:max-w-none"
        />
      </div>
    </section>
  );
}
