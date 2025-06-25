"use client";

import { useState } from "react";
import Link from "next/link";

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
    category: "Products",
    description:
      "Overview of all product-related features and documentation outlining goals, data structures, and potential plans.",
    files: [{ name: "Products", path: "/docs/products/overview.md" }],
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
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Documentation</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          This documentation contains the technical and functional breakdown of
          the site, games, demos, blog, dashboard, and unified payment system.
        </p>
      </section>

      {documentationStructure.map((section) => (
        <div key={section.category} className="mb-10">
          <h2
            className="text-2xl font-semibold text-blue-700 cursor-pointer hover:underline mb-1"
            onClick={() =>
              setActiveCategory(
                activeCategory === section.category ? null : section.category
              )
            }
          >
            {section.category}
          </h2>

          <p className="text-sm text-gray-600 mb-2">{section.description}</p>

          {activeCategory === section.category && (
            <ul className="pl-4 list-disc space-y-1">
              {section.files.map((file) => (
                <li key={file.path}>
                  <Link
                    href={file.path}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    {file.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </main>
  );
}
