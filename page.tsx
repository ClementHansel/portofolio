"use client";

import React from "react";
import Link from "next/link";
import { FaDownload, FaPrint } from "react-icons/fa";
import CVContent from "@/components/CV/other/CVContent";

export default function CVPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      {/* Page Explanation */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          My Curriculum Vitae
        </h1>
        <p className="text-lg text-gray-700 leading-7 max-w-2xl mx-auto">
          This page provides an animated overview of my CV. You can view a clean
          printable version or download it as a PDF file. Use the buttons below
          to navigate accordingly.
        </p>
      </section>

      {/* Action Buttons */}
      <section className="flex justify-center gap-6">
        {/* View Printable */}
        <Link
          href="https://drive.google.com/file/d/1nGINbIQsHBjGnho9WyWeF9uIBacc-IjM/view?usp=drive_link"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          <FaPrint />
          View Printable CV
        </Link>

        {/* Download PDF */}
        <a
          href="https://drive.google.com/file/d/1nGINbIQsHBjGnho9WyWeF9uIBacc-IjM/view?usp=drive_link"
          download
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          <FaDownload />
          Download CV
        </a>
      </section>

      {/* Animated CV Display Placeholder */}
      <section className="mb-12 bg-gray-50 p-6 rounded-2xl shadow-md text-center">
        <p className="text-gray-500 mb-4">
          [Animated CV preview will appear here]
        </p>
        <div className="w-full h-60 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl animate-pulse flex items-center justify-center">
          <span className="text-blue-700 text-xl font-medium">
            Animated CV Section (Coming Soon)
          </span>
        </div>
      </section>

      <CVContent />
    </main>
  );
}
