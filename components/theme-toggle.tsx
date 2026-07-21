"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

const baseClasses =
  "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-muted-foreground transition";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render the live control after hydration to prevent a mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder matching the server-side render's footprint
    return (
      <div className={baseClasses} aria-hidden="true">
        <Sun className="h-4 w-4" />
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className={`${baseClasses} hover:border-accent-orange/40 hover:text-accent-orange`}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        key={theme}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="inline-flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4" aria-hidden="true" />
        )}
      </motion.span>
    </motion.button>
  );
}
