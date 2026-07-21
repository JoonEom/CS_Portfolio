"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Cross-fades between routes. Deliberately does not translate or stagger on
 * entry: each page already animates its own heading and sections in, and
 * running a second entrance on the wrapper made every navigation look like
 * the page animated twice. The wrapper owns the exit, the content owns the
 * entrance.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.section
        key={pathname}
        className="h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16, ease: "linear" }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
