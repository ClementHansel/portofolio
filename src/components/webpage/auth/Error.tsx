// src/app/auth/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div className="text-center text-white mt-20">
      <h2 className="text-2xl font-semibold mb-4">Authentication Error</h2>
      <p>{error || "Something went wrong. Please try again."}</p>
    </div>
  );
}
