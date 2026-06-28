"use client";

import { ReactNode } from "react";

/**
 * Accessibility features:
 * - Skip to main content link
 * - Focus management
 * - Announces route changes to screen readers
 */

export default function AccessibilityWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent-blue)] focus:text-white focus:text-sm focus:font-medium focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Live region for route change announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="route-announcer"
      />

      {children}
    </>
  );
}
