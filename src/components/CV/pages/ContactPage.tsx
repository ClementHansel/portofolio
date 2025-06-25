"use client";

import { useState } from "react";
import BookPage from "../BookPage";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tittle: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Your message has been sent (simulated).");
    // Reset form (optional)
    setFormData({
      name: "",
      email: "",
      tittle: "",
      message: "",
    });
  };

  return (
    <BookPage>
      <motion.div
        className="h-full w-full flex flex-col items-center justify-start px-4 py-2 text-center text-sm overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-4">
          Contact Me
        </h2>

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="https://wa.me/628111546034"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

          <a
            href="mailto:clement_hansel@yahoo.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
          >
            <FaEnvelope />
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/clement-hansel/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-md transition"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        </div>

        {/* Contact Form */}
        <form
          className="space-y-6 w-full max-w-md text-left"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="tittle">
              Title
            </label>
            <textarea
              id="tittle"
              rows={1}
              required
              value={formData.tittle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your title here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition duration-200 shadow-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </motion.div>
    </BookPage>
  );
}
