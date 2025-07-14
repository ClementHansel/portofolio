"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Login from "@/components/webpage/auth/Login";
import Register from "@/components/webpage/auth/Register";
import Verify from "@/components/webpage/auth/Verify";
import Error from "@/components/webpage/auth/Error";
import { AnimatePresence, motion } from "framer-motion";

export default function AuthPage() {
  return (
    <Suspense
      fallback={<div className="text-white text-center">Loading...</div>}
    >
      <AuthContent />
    </Suspense>
  );
}

function AuthContent() {
  const params = useSearchParams();
  const mode = params.get("mode");

  const renderComponent = () => {
    switch (mode) {
      case "register":
        return <Register />;
      case "verify":
        return <Verify />;
      case "error":
        return <Error />;
      default:
        return <Login />;
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          {renderComponent()}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-pink-900/20 to-blue-900/20 blur-3xl opacity-30 pointer-events-none" />
    </main>
  );
}
