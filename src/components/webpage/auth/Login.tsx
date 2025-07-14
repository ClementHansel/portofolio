"use client";

import { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  // const router = useRouter();

  const cardStyle =
    "p-6 shadow-2xl backdrop-blur-md bg-white/10 border border-white/30 rounded-xl text-white relative overflow-hidden";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    // 🔒 Skip login logic temporarily
    setTimeout(() => {
      setMessage("Login skipped. Auth logic disabled.");
      setLoading(false);
    }, 500);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    // 🔒 Skip Google login logic
    setTimeout(() => {
      setMessage("Google login skipped. Auth logic disabled.");
      setLoading(false);
    }, 500);
  };

  return (
    <div className={`${cardStyle} w-full max-w-md mx-auto mt-10`}>
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form onSubmit={handlePasswordLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-2 text-black"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-2 text-black"
          required
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login with Email & Password"}
        </button>
      </form>

      <div className="my-4 flex items-center justify-center gap-2 text-sm text-gray-300">
        <span className="border-t w-full" />
        or
        <span className="border-t w-full" />
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <Link
          href="/auth?mode=register"
          className="text-blue-400 hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
