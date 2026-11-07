"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getContactContent } from "@/lib/content";

export function Footer() {
  const pathname = usePathname();
  const contactContent = getContactContent();
  const { email, linkedin, github } = contactContent.sidebar.links;
  const emailAddress = email.href.replace("mailto:", "");

  const links = [
    { ...linkedin, external: true },
    { ...github, external: true },
  ];

  return (
    <footer className="mt-24">
      {/* The big court-orange closer belongs to the home page only. Elsewhere
          the same invitation is quieter, so orange stays a moment, not wallpaper. */}
      {pathname === "/" && (
        <section className="bg-court text-ink" aria-labelledby="closer-heading">
          <div className="shell py-12 sm:py-16">
            <h2
              id="closer-heading"
              className="display text-[clamp(3rem,9vw,7rem)] font-black leading-[0.85]"
            >
              {contactContent.pageTitle}
            </h2>
            <p className="mt-4 max-w-md text-lg font-medium">
              {contactContent.pageDescription}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/contact" className="btn btn-ink">
                Send a message
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={email.href}
                className="text-lg font-bold underline decoration-2 underline-offset-[6px]"
              >
                {emailAddress}
              </a>
            </div>
          </div>
        </section>
      )}

      {pathname !== "/" && pathname !== "/contact" && (
        <section className="shell" aria-labelledby="closer-heading">
          <div className="rule-draw flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pb-4 pt-10">
            <h2
              id="closer-heading"
              className="display text-[clamp(2rem,5vw,3.5rem)] leading-[0.9]"
            >
              {contactContent.pageTitle}
            </h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={email.href} className="link text-lg">
                {emailAddress}
              </a>
              <Link href="/contact" className="btn btn-court">
                Send a message
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Minjoon Eom</p>
          <nav
            aria-label="Elsewhere"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {links.map((link) => (
              <a
                key={link.text}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-semibold text-foreground underline decoration-border decoration-2 underline-offset-4 transition hover:decoration-court"
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
