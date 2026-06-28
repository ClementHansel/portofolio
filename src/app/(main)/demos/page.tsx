"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";

const IoTDashboard = dynamic(() => import("@/components/demos/iot/IoTDashboard"), { ssr: false });
const AIPlayground = dynamic(() => import("@/components/demos/ai/AIPlayground"), { ssr: false });
const CICDPipeline = dynamic(() => import("@/components/demos/cicd/CICDPipeline"), { ssr: false });

type DemoTab = "iot" | "ai" | "cicd";

const tabs: { id: DemoTab; label: string; icon: string; description: string }[] = [
  { id: "iot", label: "IoT Dashboard", icon: "📡", description: "Real-time sensor monitoring with live data streaming" },
  { id: "ai", label: "AI Playground", icon: "🧠", description: "Interactive NLP models — sentiment, classification, generation" },
  { id: "cicd", label: "CI/CD Pipeline", icon: "🚀", description: "Automated deployment visualization with live logs" },
];

export default function DemosPage() {
  const [activeTab, setActiveTab] = useState<DemoTab>("iot");

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Interactive Demos"
          subtitle="Live, hands-on demonstrations of real systems I build. Each demo runs entirely in your browser."
        />

        {/* Tab selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/40 text-white"
                  : "border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent-blue)]/30"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <div className="text-left">
                <div className="font-medium">{tab.label}</div>
                <div className="text-[10px] text-[var(--text-muted)] hidden sm:block">
                  {tab.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Demo content */}
        <div className="min-h-[500px]">
          {activeTab === "iot" && <IoTDashboard />}
          {activeTab === "ai" && <AIPlayground />}
          {activeTab === "cicd" && <CICDPipeline />}
        </div>
      </div>
    </div>
  );
}
