"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Brand */}
        <div className="text-lg font-semibold text-white">
          © 2025 Clement Hansel
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 text-sm">
          <a href="/documentation" className="hover:text-white transition">
            Documentation
          </a>
          <a href="/about" className="hover:text-white transition">
            About Me
          </a>
          <a href="/CV" className="hover:text-white transition">
            My CV
          </a>
          <a href="/game" className="hover:text-white transition">
            Play Game
          </a>
          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>
        </nav>

        {/* Socials */}
        <div className="flex space-x-4 text-lg">
          <a
            href="https://github.com/ClementHansel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/clement-hansel-7a312b55/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:clementhansel8891@gmail.com"
            className="hover:text-white transition"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
