"use client";

import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">About Me</h1>
        <p className="text-lg leading-8">
          I’m <strong className="text-blue-600">Clement Hansel</strong>, a
          multidisciplinary professional who made a bold transition from a
          decade-long leadership career in the culinary and hospitality
          industries into the fast-evolving world of software engineering and
          IoT.
        </p>
        <p className="text-lg leading-8 mt-4">
          My journey is driven by curiosity, resilience, and a passion for
          turning complex problems into simple, impactful solutions.
        </p>
      </section>

      <section className="mb-16 bg-gray-50 p-6 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">
          From Kitchens to Code
        </h2>
        <p className="text-lg leading-8">
          Having led teams in 4- and 5-star establishments across New Zealand,
          Malaysia, and Indonesia, I built a deep foundation in leadership,
          operations, and adaptability. These experiences laid the groundwork
          for my ability to manage high-stakes projects and cross-functional
          teams. Skills that I’ve carried into my work as a Software Engineer
          and IoT Project Manager.
        </p>
      </section>

      <section className="mb-16 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">
          Building the Future with Tech
        </h2>
        <p className="text-lg leading-8">
          Today, I architect and deliver real-time monitoring platforms,
          AI-integrated dashboards, and end-to-end IoT solutions that help
          cities and industries modernize their infrastructure.
        </p>
        <p className="text-lg leading-8 mt-4">
          My recent work includes leading national-scale Weigh-in-Motion systems
          for the Indonesian Ministry of Transportation, developing smart buoy
          systems for coastal monitoring, and creating disaster response
          platforms with GIS-powered anomaly detection.
        </p>
        <p className="text-lg leading-8 mt-4">
          I’m proficient in{" "}
          <span className="font-semibold">
            JavaScript, TypeScript, React, Next.js, and Node.js
          </span>
          , with hands-on experience integrating{" "}
          <span className="font-semibold">LoRa, GSM, GPS, and sensor data</span>
          into scalable platforms. My development style emphasizes clean
          architecture, robust data flows, and meaningful user experiences.
        </p>
      </section>

      <section className="mb-16 bg-gray-50 p-6 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">
          How I Work
        </h2>
        <p className="text-lg leading-8">
          I’m a problem solver by nature. Whether managing vendors, coordinating
          with governments, or writing scalable code, I focus on clarity,
          reliability, and measurable impact.
        </p>
        <p className="text-lg leading-8 mt-4">
          Beyond technical skills, I bring strong communication, mentorship, and
          project management capabilities. I lead with ownership and foster
          collaboration, ensuring everyone involved is aligned, empowered, and
          informed.
        </p>
      </section>

      <section className="text-center mt-20">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">
          Let’s Build Something Meaningful
        </h2>
        <p className="text-lg leading-8 mb-6 max-w-2xl mx-auto">
          If you’re looking for a Senior Software Engineer who understands the
          intersection of people, technology, and operations, I’d love to
          connect.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Contact Me
        </Link>
      </section>
    </main>
  );
}
