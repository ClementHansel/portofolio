"use client";

import React from "react";

export default function StaticCVPage() {
  return (
    <div className="min-h-screen bg-white">
      <iframe
        src="/assets/CV/Clement Hansel CV.pdf"
        title="Clement Hansel CV"
        className="w-full h-screen"
        style={{ border: "none" }}
      />
    </div>
  );
}
