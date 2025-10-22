"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

const buttonVariants = {
  light: {
    backgroundColor: "rgb(var(--accent-teal) / 0.15)",
    color: "rgb(var(--accent-teal))",
  },
  dark: {
    backgroundColor: "rgb(var(--accent-indigo) / 0.2)",
    color: "rgb(var(--accent-indigo))",
  },
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/80 text-sm font-medium shadow-sm transition hover:shadow-glow dark:border-white/10 dark:bg-slate-900/60"
      animate={theme}
      variants={buttonVariants}
      whileTap={{ scale: 0.92 }}
    >
      <motion.span
        key={theme}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="inline-flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Sun className="h-5 w-5" aria-hidden="true" />
        )}
      </motion.span>
    </motion.button>
  );
}
