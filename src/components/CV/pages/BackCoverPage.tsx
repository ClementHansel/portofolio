"use client";

import { useState } from "react";
import BookPage from "../BookPage";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BackCoverPage() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing: ${email}`);
      setEmail("");
    }
  };

  return (
    <BookPage>
      <div
        className="relative h-full w-full bg-no-repeat bg-cover bg-center shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] border border-black overflow-hidden"
        style={{
          backgroundImage: "url('/assets/textures/BackCover.png')",
          backgroundSize: "100% 100%",
        }}
      >
        {/* Outer container: full height, center the inner content vertically */}
        <div className="h-full w-full flex justify-center items-center">
          {/* Inner container: takes 50% height, content centered inside */}
          <motion.div
            className="h-full w-full flex flex-col justify-center items-center px-6 py-2 text-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            {/* Section 1: Top Image */}
            <div>
              <Image
                src="/assets/images/Hansel1.jpg"
                alt="Hansel Back Cover"
                width={500}
                height={100}
                className="rounded-md object-fill shadow-md mx-auto"
              />
            </div>

            {/* Section 2: Subscribe */}
            <motion.div
              className="w-full max-w-sm flex flex-col items-center text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">
                Stay Connected
              </h2>
              <p className="text-yellow-500 mb-6">
                Subscribe to stay updated on my latest work, insights, and
                opportunities.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubscribe();
                }}
                className="flex flex-col sm:flex-row items-center gap-2 w-full"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 text-white rounded-md border border-yellow-300 shadow-sm w-full"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition w-full sm:w-auto"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>

            {/* Section 3: Footer */}
            <div className="border-t border-yellow-300 mt-6 pt-4 text-xs text-yellow-400">
              <p>
                Designed & Built by Clement Hansel © {new Date().getFullYear()}
              </p>
              <p>Thank you for reading 🙏</p>
            </div>
          </motion.div>
        </div>
      </div>
    </BookPage>
  );
}
