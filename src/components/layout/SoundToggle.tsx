"use client";

import { useSounds } from "./SoundManager";

export default function SoundToggle() {
  const { enabled, toggle } = useSounds();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent-blue)] transition-all"
      aria-label={enabled ? "Disable sound effects" : "Enable sound effects"}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {enabled ? "🔊" : "🔇"}
    </button>
  );
}
