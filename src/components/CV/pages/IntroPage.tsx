"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaDownload,
  FaPrint,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { about } from "@/data/CV/about";
import { motion } from "framer-motion";
import useResponsiveBookPage from "@/hooks/useResponsiveBookPage";

export default function IntroPage() {
  const Page = useResponsiveBookPage();
  return (
    <Page>
      <motion.div
        className="h-full w-full flex flex-col items-center justify-start text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        {/* Profile Picture */}
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 12px rgba(59,130,246,0.5)",
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-40 h-40 mt-20 rounded-full overflow-hidden border-2 border-blue-300 shadow-md flex-shrink-0 aspect-square"
        >
          <Image
            src="/assets/images/profile/profile.jpg"
            alt="Clement Hansel"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {/* WhatsApp */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://wa.me/628111546034"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition text-sm"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </motion.a>

          {/* Email */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:clement_hansel@yahoo.com"
            className="flex items-center gap-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow transition text-sm"
            title="Email"
          >
            <FaEnvelope />
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://www.linkedin.com/in/clement-hansel/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow transition text-sm"
            title="LinkedIn"
          >
            <FaLinkedin />
          </motion.a>

          {/* GitHub (Placeholder) */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="flex items-center gap-2 p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow transition text-sm"
            title="GitHub"
          >
            <FaGithub />
          </motion.a>

          {/* YouTube (Disabled for now) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 p-2 bg-red-400 text-white rounded-full shadow text-sm opacity-60 cursor-not-allowed"
            title="Coming soon"
          >
            <FaYoutube />
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-3">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="https://drive.google.com/file/d/1nGINbIQsHBjGnho9WyWeF9uIBacc-IjM/view?usp=drive_link"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPrint />
              View Printable CV
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <a
              href="https://drive.google.com/uc?export=download&id=1nGINbIQsHBjGnho9WyWeF9uIBacc-IjM"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition text-sm"
              download
            >
              <FaDownload />
              Download CV
            </a>
          </motion.div>
        </div>

        {/* About section */}
        <motion.div
          className="text-sm text-left text-gray-800 leading-relaxed max-w-[90%] mx-auto mt-3 overflow-y-auto whitespace-pre-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {about}
        </motion.div>
      </motion.div>
    </Page>
  );
}
