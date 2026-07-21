"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { getContactContent } from "@/lib/content";
import { BasketballIcon } from "./basketball-icon";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const contactContent = getContactContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close the mobile menu whenever navigation lands on a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-orange/10 text-accent-orange transition group-hover:bg-accent-orange group-hover:text-white">
            <BasketballIcon className="h-4 w-4" />
          </span>
          Minjoon Eom
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-full bg-surface-muted ring-1 ring-border"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href={contactContent.sidebar.links.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent-orange px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-orange/90 hover:shadow-md"
          >
            {contactContent.sidebar.links.resume.text}
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-foreground transition hover:bg-surface-muted"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur md:hidden"
          >
            <nav className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = isActiveLink(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-accent-orange/10 text-accent-orange"
                          : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <Link
                  href={contactContent.sidebar.links.resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-accent-orange px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-accent-orange/90"
                >
                  {contactContent.sidebar.links.resume.text}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
