"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent!");
    setFormData({ name: "", email: "", tittle: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <Toaster position="top-right" />

      <section className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
        <p className="text-lg text-gray-300 leading-7">
          I’d love to hear from you — whether it’s a project opportunity,
          collaboration, or just a hello. Drop a message using the form below
          and I’ll get back to you soon!
        </p>
      </section>

      <section className="max-w-3xl mx-auto bg-[#121212] p-6 rounded-2xl shadow-xl border border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              className="w-full bg-black border border-gray-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full bg-black border border-gray-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full bg-black border border-gray-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your title here..."
            />
            <textarea
              id="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-3 bg-black border border-gray-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition duration-200 shadow-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

      <section className="max-w-3xl mx-auto mt-12 text-md text-gray-300">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Reach Me Directly
        </h2>
        <ul className="space-y-2">
          <li>
            <span className="font-medium">WhatsApp:</span>{" "}
            <a
              href="https://wa.me/628111546034"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              +62 811 1546 034
            </a>
          </li>
          <li>
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:clement_hansel@yahoo.com"
              className="text-blue-400 hover:underline"
            >
              clement_hansel@yahoo.com
            </a>
          </li>
          <li>
            <span className="font-medium">LinkedIn:</span>{" "}
            <a
              href="https://www.linkedin.com/in/clement-hansel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              linkedin.com/in/clement-hansel
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
