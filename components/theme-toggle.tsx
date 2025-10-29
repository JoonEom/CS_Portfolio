"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

const buttonVariants = {
  light: {
    backgroundColor: "rgb(var(--accent-orange) / 0.15)",
    color: "rgb(var(--accent-orange))",
  },
  dark: {
    backgroundColor: "rgb(var(--accent-amber) / 0.2)",
    color: "rgb(var(--accent-amber))",
  },
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder that matches the server-side render
    return (
      <div className="relative inline-flex h-10 w-12 items-center justify-center overflow-hidden rounded-full border border-orange-200/20 bg-orange-50/80 text-sm font-medium shadow-sm dark:border-orange-800/20 dark:bg-orange-950/60">
        <Sun className="h-5 w-5" aria-hidden="true" />
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-12 items-center justify-center overflow-hidden rounded-full border border-orange-200/20 bg-orange-50/80 text-sm font-medium shadow-sm transition hover:shadow-lg dark:border-orange-800/20 dark:bg-orange-950/60"
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
