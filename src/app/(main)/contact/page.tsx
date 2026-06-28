"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/constants";

const contactLinks = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+62 811 1546 034",
    href: siteConfig.links.whatsapp,
    color: "#25D366",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: siteConfig.links.email,
    href: `mailto:${siteConfig.links.email}`,
    color: "#3b82f6",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "clement-hansel",
    href: siteConfig.links.linkedin,
    color: "#0A66C2",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "ClementHansel",
    href: siteConfig.links.github,
    color: "#f1f5f9",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="section-padding">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Let's Connect"
          subtitle="Have a project idea, need a CTO-level consultation, or just want to talk tech? Reach out."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                    placeholder="Project inquiry, consulting, etc."
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-[var(--accent-blue)] text-white font-semibold hover:bg-[var(--accent-blue)]/90 transition-all hover:shadow-[var(--glow-blue)]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-4 group block"
              >
                <link.icon
                  className="w-5 h-5 transition-colors"
                  style={{ color: link.color }}
                />
                <div>
                  <p className="text-xs text-[var(--text-muted)]">
                    {link.label}
                  </p>
                  <p className="text-sm text-white group-hover:text-[var(--accent-blue)] transition-colors">
                    {link.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
