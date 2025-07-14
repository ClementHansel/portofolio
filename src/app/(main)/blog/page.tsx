"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RSSParser from "rss-parser";
import {
  format,
  isToday,
  isYesterday,
  subDays,
  subMonths,
  subYears,
} from "date-fns";

type Post = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  categories: string[];
};

const FEEDS = [
  { url: "https://www.linkedin.com/feed", source: "LinkedIn" },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_CHANNEL_ID",
    source: "YouTube",
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState({
    dateRange: "all",
    source: "All",
    tag: "All",
  });

  useEffect(() => {
    const fetchRSS = async () => {
      const parser = new RSSParser();
      const all: Post[] = [];

      await Promise.all(
        FEEDS.map(async (f) => {
          try {
            const feed = await parser.parseURL(f.url);
            (feed.items || []).forEach((item) => {
              if (item.title && item.link && item.pubDate) {
                all.push({
                  title: item.title,
                  link: item.link,
                  pubDate: item.pubDate,
                  source: f.source,
                  categories: item.categories || [],
                });
              }
            });
          } catch (err) {
            console.error("RSS Error:", f.source, err);
          }
        })
      );

      all.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
      setPosts(all);
    };

    fetchRSS();
  }, []);

  const filterByDate = (date: Date) => {
    switch (filter.dateRange) {
      case "today":
        return isToday(date);
      case "yesterday":
        return isYesterday(date);
      case "lastWeek":
        return date >= subDays(new Date(), 7);
      case "lastMonth":
        return date >= subMonths(new Date(), 1);
      case "lastYear":
        return date >= subYears(new Date(), 1);
      default:
        return true;
    }
  };

  const filtered = posts.filter((p) => {
    const dt = new Date(p.pubDate);
    const okDate = filterByDate(dt);
    const okSrc = filter.source === "All" || p.source === filter.source;
    const okTag = filter.tag === "All" || p.categories.includes(filter.tag);
    return okDate && okSrc && okTag;
  });

  const recent = filtered.slice(0, 3);
  const others = filtered.slice(3);

  const allSources = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.source))),
  ];
  const allTags = [
    "All",
    ...Array.from(new Set(posts.flatMap((p) => p.categories))),
  ];

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-100">
      {/* Intro */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to My Blog
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Here you&apos;ll find my latest posts from across the web — from
          LinkedIn, YouTube, and more. Posts are automatically fetched, sorted
          by date, and you can filter by date, source, or tags.
        </p>
      </section>

      {/* Filters */}
      <section className="bg-gray-800 rounded-lg p-4 mb-8 flex flex-wrap gap-4 text-sm text-white">
        <select
          onChange={(e) => setFilter({ ...filter, dateRange: e.target.value })}
          className="px-3 py-2 bg-black border border-gray-700 rounded focus:outline-none"
          title="Filter by date"
        >
          <option value="all">All dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="lastWeek">Last week</option>
          <option value="lastMonth">Last month</option>
          <option value="lastYear">Last year</option>
        </select>

        <select
          onChange={(e) => setFilter({ ...filter, source: e.target.value })}
          className="px-3 py-2 bg-black border border-gray-700 rounded focus:outline-none"
          title="Filter by source"
        >
          {allSources.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
          className="px-3 py-2 bg-black border border-gray-700 rounded focus:outline-none"
          title="Filter by tag"
        >
          {allTags.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </section>

      {/* Recent Posts */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-white">Recent Posts</h2>
        {recent.map((p, i) => (
          <article
            key={i}
            className="mb-6 p-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
          >
            <Link
              href={p.link}
              target="_blank"
              className="text-xl font-medium text-blue-400 hover:underline"
            >
              {p.title}
            </Link>
            <div className="text-sm text-gray-400 mt-1">
              {format(new Date(p.pubDate), "MMM d, yyyy")} • {p.source}
              {p.categories.length > 0 && (
                <>
                  {" "}
                  • <em>{p.categories.join(", ")}</em>
                </>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Other Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Other Posts</h2>
        <ul className="space-y-4">
          {others.map((p, i) => (
            <li
              key={i}
              className="p-3 border border-gray-700 rounded hover:bg-gray-800 transition"
            >
              <Link
                href={p.link}
                target="_blank"
                className="font-medium text-blue-400 hover:underline"
              >
                {p.title}
              </Link>
              <div className="text-xs text-gray-400">
                {format(new Date(p.pubDate), "PPP")} • {p.source}
              </div>
            </li>
          ))}
          {!filtered.length && (
            <p className="text-gray-500 italic">No posts match this filter.</p>
          )}
        </ul>
      </section>
    </main>
  );
}
