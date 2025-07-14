"use client";

import Link from "next/link";
import { FaDownload, FaPrint } from "react-icons/fa";
import CVBookWrapper from "@/components/CV/CVBookWrapper";

export default function CVPage() {
  return (
    <>
      <main className=" bg-black text-white max-w-4xl mx-auto px-6 py-12">
        {/* Page Explanation */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            My Curriculum Vitae
          </h1>
          <p className="text-lg text-gray-300 leading-7 max-w-2xl mx-auto">
            This page provides an animated overview of my CV. You can view a
            clean printable version or download it as a PDF file. Use the
            buttons below to navigate accordingly.
          </p>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-wrap justify-center gap-6">
          {/* View Printable */}
          <Link
            href="/CV/static"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPrint />
            View Printable CV
          </Link>

          {/* Download PDF */}
          <a
            href="/assets/CV/Clement%20Hansel%20CV.pdf"
            download
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md transition"
          >
            <FaDownload />
            Download CV
          </a>
        </section>
      </main>

      {/* 📖 Book Viewer */}
      <div className="bg-black text-white min-h-screen w-full flex justify-center items-start px-2 overflow-x-hidden">
        <CVBookWrapper />
      </div>
    </>
  );
}
