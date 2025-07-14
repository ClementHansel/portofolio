"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const inputStyle =
    "w-full bg-transparent border border-yellow-400 rounded-lg p-2 text-yellow-400 placeholder-yellow-200";

  const cardStyle =
    "p-6 shadow-2xl backdrop-blur-md bg-white/10 border border-white/30 rounded-xl text-white relative overflow-hidden";

  const [form, setForm] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const titles = ["Mr.", "Mrs.", "Ms.", "Mx.", "Dr.", "Prof."];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Something went wrong");
        return;
      }

      setMessage("✅ Registration successful! Please check your email.");
      setForm({
        title: "",
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${cardStyle} w-full max-w-md mx-auto mt-10`}>
      <h2 className="text-2xl font-semibold text-yellow-400 text-center mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="title"
          value={form.title}
          onChange={handleChange}
          className={inputStyle}
          aria-label="select tittle"
        >
          <option value="">Select Title</option>
          {titles.map((t) => (
            <option key={t} value={t} className="text-black">
              {t}
            </option>
          ))}
        </select>

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          className={inputStyle}
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className={inputStyle}
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="tel"
          placeholder="Phone Number"
          className={inputStyle}
        />

        {/* Password */}
        <div className="relative">
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={inputStyle}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2 text-yellow-400 hover:text-blue-400"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className={inputStyle}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-2 text-yellow-400 hover:text-blue-400"
            aria-label="Toggle confirm password visibility"
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link href="/auth" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
