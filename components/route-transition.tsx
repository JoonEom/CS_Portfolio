"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A single 180 ms fade when the route changes. CSS only (see .page-in in
 * globals.css): no animation library, no exit delay before the next page
 * appears, and nothing slides or staggers on entry.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-in">
      {children}
    </div>
  );
}
