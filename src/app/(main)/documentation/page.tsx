"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const documentationStructure = [
  {
    category: "Web",
    description:
      "Covers the overall purpose of the website, including frontend and backend technologies used, and the architectural design decisions made.",
    files: [
      { name: "General", path: "/docs/web/general.md" },
      { name: "Front End", path: "/docs/web/frontend.md" },
      { name: "Back End", path: "/docs/web/backend.md" },
      { name: "Architecture", path: "/docs/web/architecture.md" },
    ],
  },
  {
    category: "Games",
    description:
      "Documentation for each of the games developed, including gameplay overview, technical stack, and logic per game.",
    files: Array.from({ length: 10 }).map((_, i) => ({
      name: `Game ${i + 1}`,
      path: `/docs/games/game${i + 1}.md`,
    })),
  },
  {
    category: "Demos",
    description:
      "Details on software demos you've built to showcase specific features, components, or proof-of-concepts.",
    files: Array.from({ length: 5 }).map((_, i) => ({
      name: `Demo ${i + 1}`,
      path: `/docs/demos/demo${i + 1}.md`,
    })),
  },
  {
    category: "Blog",
    description:
      "Explanation of the blog infrastructure and the technologies involved, including content structure and integration.",
    files: [
      { name: "Blog General", path: "/docs/blog/general.md" },
      { name: "Blog Tech Stack", path: "/docs/blog/tech.md" },
    ],
  },
  {
    category: "Dashboard",
    description:
      "Breakdown of the user dashboard features, functionality, and its role in user interaction and data access.",
    files: [{ name: "User Dashboard", path: "/docs/dashboard/overview.md" }],
  },
  {
    category: "Shop",
    description:
      "Overview of all shop-related features and documentation outlining goals, data structures, and potential plans.",
    files: [{ name: "Shop", path: "/docs/shop/overview.md" }],
  },
  {
    category: "Unified Payment System",
    description:
      "Covers the implementation of payment systems including QRIS, Xendit integration, and general payment flow.",
    files: [
      { name: "Overview", path: "/docs/payment/overview.md" },
      { name: "Xendit", path: "/docs/payment/xendit.md" },
      { name: "QRIS", path: "/docs/payment/qris.md" },
    ],
  },
];

export default function DocumentationPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-white">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">📚 Project Documentation</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Explore technical and functional breakdowns for the web, games, demos,
          blog, dashboard, and payment systems.
        </p>
      </section>

      <div className="space-y-6">
        {documentationStructure.map((section) => {
          const isActive = activeCategory === section.category;

          return (
            <div
              key={section.category}
              className="border border-gray-700 bg-gray-900 rounded-xl p-6 shadow-md transition"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setActiveCategory(isActive ? null : section.category)
                }
              >
                <h2 className="text-xl font-semibold text-blue-400 hover:underline">
                  {section.category}
                </h2>
                <span className="text-blue-400">
                  {isActive ? <FaChevronDown /> : <FaChevronRight />}
                </span>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                {section.description}
              </p>

              {isActive && (
                <ul className="mt-4 pl-4 list-disc space-y-1 text-gray-300">
                  {section.files.map((file) => (
                    <li key={file.path}>
                      <Link
                        href={file.path}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        {file.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
