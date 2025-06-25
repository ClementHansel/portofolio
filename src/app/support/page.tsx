/* eslint-disable */
"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa6";

type Donation = {
  name: string;
  email: string;
  amount: string;
  currency: string;
};

export default function SupportPage() {
  const [donation, setDonation] = useState<Donation>({
    name: "",
    email: "",
    amount: "",
    currency: "IDR",
  });

  const goal = {
    goalName: "Support My Portfolio Hosting",
    target: 1_000_000, // in Rupiah
    current: 320_000, // in Rupiah
  };

  const progress = Math.min((goal.current / goal.target) * 100, 100);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDonation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (donation.currency === "IDR") {
      alert("Redirecting to local payment...");
    } else {
      alert("Redirecting to international payment...");
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 text-gray-800">
      {/* Page Intro */}
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">
          Support My Work
        </h1>
        <p className="text-lg text-gray-600">
          This page exists to help support the time, effort, and cost that go
          into maintaining and improving my portfolio and open work. Every
          contribution makes a difference 🙏
        </p>
      </section>

      {/* Goal Widget */}
      <section className="mb-10 bg-white shadow rounded-xl p-6 border">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">
          🎯 {goal.goalName}
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Collected: <strong>Rp{goal.current.toLocaleString()}</strong> / Rp
          {goal.target.toLocaleString()}
        </p>
      </section>

      {/* Donation Form */}
      <section className="mb-8 bg-white shadow rounded-xl p-6 border">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={donation.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={donation.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                required
                value={donation.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2"
                placeholder="e.g. 50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                name="currency"
                value={donation.currency}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-2"
                title="set currency"
              >
                <option value="IDR">Rupiah (IDR) 🇮🇩</option>
                <option value="USD">USD 🌐</option>
                <option value="EUR">EUR 🌍</option>
                <option value="SGD">SGD 🌏</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl shadow-md flex items-center gap-2"
          >
            <FaHeart /> Donate Now
          </button>
        </form>
      </section>

      {/* Encouragement Message */}
      <p className="text-center text-sm text-gray-500 italic">
        Your support means the world to me 🌍 Whether small or large, each
        donation helps me continue doing what I love.
      </p>
    </main>
  );
}
