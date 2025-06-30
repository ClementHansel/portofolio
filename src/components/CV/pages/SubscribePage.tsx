"use client";

import useResponsiveBookPage from "@/hooks/useResponsiveBookPage";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SubscribePage() {
  const Page = useResponsiveBookPage();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing: ${email}`);
      setEmail("");
    }
  };

  return (
    <Page>
      <motion.div
        className="h-full w-full flex flex-col items-center justify-center px-4 py-2 text-center text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Stay Connected
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Subscribe to stay updated on my latest work, insights, and
          opportunities.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm w-68"
          />
          <button
            onClick={handleSubscribe}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </div>
      </motion.div>
    </Page>
  );
}
