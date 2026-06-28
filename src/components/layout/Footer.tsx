"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/lib/constants";

const footerLinks = {
  main: [
    { name: "Expertise", href: "/expertise" },
    { name: "Projects", href: "/projects" },
    { name: "Architecture", href: "/architecture" },
    { name: "Career", href: "/career" },
  ],
  secondary: [
    { name: "Blog", href: "/blog" },
    { name: "Demos", href: "/demos" },
    { name: "CV", href: "/cv" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Support", href: "/support" },
    { name: "Documentation", href: "/documentation" },
  ],
};

const socials = [
  { icon: FaGithub, href: siteConfig.links.github, label: "GitHub" },
  { icon: FaLinkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: FaEnvelope, href: `mailto:${siteConfig.links.email}`, label: "Email" },
  { icon: FaWhatsapp, href: siteConfig.links.whatsapp, label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/images/logo/ch_logo.png"
                alt="Clement Hansel"
                width={48}
                height={48}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
              Technology Executive & System Architect building scalable solutions
              that drive impact.
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.secondary.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Other
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Clement Hansel. Architected & built from scratch.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Next.js • Three.js • GSAP • Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
