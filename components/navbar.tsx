"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 shadow-sm backdrop-blur dark:bg-slate-950/70">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight transition hover:scale-105"
        >
          <span className="bg-gradient-to-r from-accent-indigo to-accent-teal bg-clip-text text-transparent">
            Minjoon
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute -inset-x-2 -bottom-1 h-1 rounded-full bg-accent-teal"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/resume"
            className="rounded-full border border-transparent bg-accent-indigo/90 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-accent-indigo"
          >
            View Résumé
          </Link>
        </div>
      </div>
    </header>
  );
}
