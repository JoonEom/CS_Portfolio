"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

const baseClasses =
  "relative inline-flex h-9 w-9 items-center justify-center rounded-sm border-2 border-foreground/70 text-foreground transition hover:border-court hover:bg-court hover:text-ink active:translate-y-px";

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
    <button
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className={baseClasses}
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
