"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGamepad,
  FaMobile,
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 border-t border-gray-700">
      <div className="max-w-screen mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand + Logo */}
        <div className="flex flex-col items-start md:w-1/4">
          <Image
            src="/assets/images/logo/ch_logo.png"
            alt="Clement Hansel Logo"
            width={120}
            height={40}
            className="object-contain mb-2"
          />
          <p className="text-sm text-gray-400">© 2025 Clement Hansel</p>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 gap-6 text-sm w-full md:w-2/4">
          <div>
            <h4 className="font-semibold text-white mb-2">Navigation</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/shop" className="hover:text-yellow-400">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-yellow-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="hover:text-yellow-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-yellow-400">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/CV" className="hover:text-yellow-400">
                  My CV
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">More</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/games"
                  className="hover:text-yellow-400 flex items-center gap-1"
                >
                  <FaGamepad className="text-xs" /> Games
                </Link>
              </li>
              <li>
                <Link
                  href="/apps"
                  className="hover:text-yellow-400 flex items-center gap-1"
                >
                  <FaMobile className="text-xs" /> Apps
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-yellow-400">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-yellow-400">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Connect / Socials - 2 Columns */}
        <div className="text-sm w-full md:w-1/4">
          <h4 className="font-semibold text-white mb-2">Connect</h4>
          <div className="grid grid-cols-2 gap-3">
            <ul className="space-y-2">
              <li>
                <a
                  href="https://wa.me/62811546034"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <FaWhatsapp className="text-lg" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:clement_hansel@yahoo.com"
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <FaEnvelope className="text-lg" /> Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/clement-hansel-7a312b55/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <FaLinkedin className="text-lg" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ClementHansel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <FaGithub className="text-lg" /> GitHub
                </a>
              </li>
            </ul>

            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <FaInstagram className="text-lg" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <FaXTwitter className="text-lg" /> X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <FaYoutube className="text-lg" /> YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <FaTiktok className="text-lg" /> TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom credit */}
      <div className="mt-10 text-center text-xs text-gray-500 px-4">
        Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
      </div>
    </footer>
  );
}
