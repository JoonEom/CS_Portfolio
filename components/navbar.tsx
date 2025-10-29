"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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

  return (
    <header className="sticky top-0 z-50 border-b border-orange-200 bg-orange-50/80 shadow-sm backdrop-blur dark:bg-orange-950/70">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-orange-600 transition hover:scale-105 dark:text-orange-400"
        >
          <BasketballIcon className="h-5 w-5" />
          Minjoon
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
                    className="absolute -inset-x-2 -bottom-1 h-1 rounded-full bg-orange-600"
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
            href={contactContent.sidebar.links.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-transparent bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-700"
          >
            {contactContent.sidebar.links.resume.text}
          </Link>
        </div>
      </div>
    </header>
  );
}
