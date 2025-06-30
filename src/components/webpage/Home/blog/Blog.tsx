"use client";

import { blogPreviewData } from "@/data/web/home/blog/blogPreviewData";
import BlogCard from "./BlogCard";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Blog() {
  const hasPosts = blogPreviewData.length > 0;

  return (
    <section className="w-full bg-black py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-md mb-10">
          From the Blog
        </h2>

        {hasPosts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPreviewData.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-900 border border-gray-800 text-white rounded-xl p-8 text-center shadow-lg"
          >
            <p className="text-lg font-medium mb-2">No blog entries yet.</p>
            <p className="text-sm text-gray-400">
              Please check back again in a while!
            </p>
          </motion.div>
        )}

        {hasPosts && (
          <div className="text-center mt-12">
            <Link
              href="/(main)/blog"
              className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
