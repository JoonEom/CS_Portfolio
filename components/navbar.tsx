"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-orange-200 bg-orange-50/80 shadow-sm backdrop-blur dark:bg-orange-950/70">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-orange-600 transition hover:scale-105 dark:text-orange-400 sm:text-xl"
        >
          <BasketballIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          Minjoon
        </Link>
        
        {/* Desktop Navigation */}
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

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
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

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="rounded-lg p-2 text-orange-600 transition hover:bg-orange-100 dark:text-orange-400 dark:hover:bg-orange-900/20"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-orange-200 bg-orange-50/95 backdrop-blur dark:border-orange-800 dark:bg-orange-950/95 md:hidden"
          >
            <nav className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                          : "text-muted-foreground hover:bg-orange-100/50 hover:text-foreground dark:hover:bg-orange-900/20"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              
              {/* Mobile Resume Button */}
              <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
                <Link
                  href={contactContent.sidebar.links.resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block w-full rounded-lg bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-orange-700"
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
