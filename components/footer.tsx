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
  const showCloser = pathname !== "/contact";

  const links = [
    { ...linkedin, external: true },
    { ...github, external: true },
  ];

  return (
    <footer className="mt-24">
      {showCloser && (
        <section className="bg-court text-ink" aria-labelledby="closer-heading">
          <div className="shell py-14 sm:py-20">
            <h2
              id="closer-heading"
              className="display text-[clamp(3.5rem,12vw,10rem)] leading-[0.82]"
            >
              {contactContent.pageTitle}
            </h2>
            <p className="mt-5 max-w-md text-lg font-medium">
              {contactContent.pageDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
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
