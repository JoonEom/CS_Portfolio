"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { getContactContent } from "@/lib/content";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

/** A small ball mark: ink disc, court-coloured seams. */
function BallMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden="true">
      <circle r="11" fill="currentColor" />
      <g
        stroke="rgb(var(--court))"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M0 -11V11M-11 0H11" />
        <path d="M-7.5 -7.5Q-3.5 0 -7.5 7.5M7.5 -7.5Q3.5 0 7.5 7.5" />
      </g>
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const contactContent = getContactContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close the mobile menu whenever navigation lands on a new page
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-foreground"
          aria-label="Minjoon Eom, home"
        >
          <BallMark className="ball-mark h-7 w-7 text-foreground" />
          <span className="display text-2xl leading-none">Minjoon Eom</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`display relative py-2 text-lg leading-none transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[3px] origin-left bg-court transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href={contactContent.sidebar.links.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-court !px-4 !py-2"
          >
            {contactContent.sidebar.links.resume.text}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-sm p-2 text-foreground"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="shell py-3">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`display block border-b border-border py-4 text-4xl ${
                    isActive ? "text-accent-text" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={contactContent.sidebar.links.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-court mt-5 w-full"
            >
              {contactContent.sidebar.links.resume.text}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
