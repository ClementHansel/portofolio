"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { allPages } from "@/lib/constants";
import { projects } from "@/data/projects";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  name: string;
  href: string;
  type: "page" | "project";
};

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults(allPages.map((p) => ({ name: p.name, href: p.href, type: "page" as const })));
      return;
    }

    const q = query.toLowerCase();

    const pageResults: SearchResult[] = allPages
      .filter(
        (page) =>
          page.name.toLowerCase().includes(q) ||
          page.keywords.some((k) => k.includes(q))
      )
      .map((p) => ({ name: p.name, href: p.href, type: "page" as const }));

    const projectResults: SearchResult[] = projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q)) ||
          p.domain.some((d) => d.includes(q))
      )
      .map((p) => ({
        name: p.title,
        href: `/projects/${p.slug}`,
        type: "project" as const,
      }));

    setResults([...pageResults, ...projectResults]);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      router.push(results[selectedIndex].href);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="cmd-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg mx-auto"
        >
          <div className="glass rounded-2xl border border-[var(--border-glow)] overflow-hidden shadow-2xl">
            {/* Search Input */}
            <div className="flex items-center border-b border-[var(--border-subtle)] px-4">
              <svg
                className="w-5 h-5 text-[var(--text-muted)] mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, projects, tech..."
                className="flex-1 bg-transparent py-4 text-white placeholder-[var(--text-muted)] outline-none text-sm"
              />
              <kbd className="text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-4 py-8 text-center text-[var(--text-muted)] text-sm">
                  No results found
                </p>
              ) : (
                results.map((result, i) => (
                  <button
                    key={result.href}
                    onClick={() => {
                      router.push(result.href);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      i === selectedIndex
                        ? "bg-[var(--accent-blue)]/10 text-white"
                        : "text-[var(--text-secondary)] hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-mono ${
                        result.type === "project"
                          ? "bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]"
                          : "bg-[var(--accent-blue)]/20 text-[var(--accent-blue)]"
                      }`}
                    >
                      {result.type === "project" ? "PRJ" : "PAGE"}
                    </span>
                    <span className="text-sm">{result.name}</span>
                    {i === selectedIndex && (
                      <span className="ml-auto text-xs text-[var(--text-muted)]">
                        ↵ Enter
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
