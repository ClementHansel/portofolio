"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="w-full bg-black py-20 px-4 md:px-10 lg:px-20 text-white relative">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-screen-xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-md mb-4">
          Got Something to Share?
        </h2>
        <p className="text-gray-300 mb-10 max-w-2xl">
          Got a project idea, collaboration, or just want to say hi? Send a
          quick message here or{" "}
          <Link
            href="/(main)/contact"
            className="underline hover:text-yellow-300"
          >
            view full contact page
          </Link>
          .
        </p>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="col-span-1 md:col-span-1 bg-neutral-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="col-span-1 md:col-span-1 bg-neutral-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <textarea
            id="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            className="md:col-span-2 bg-neutral-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-300 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
