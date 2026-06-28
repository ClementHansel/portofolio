"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { expertiseDomains } from "@/data/expertise/domains";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

const TechRadar = dynamic(() => import("@/components/expertise/TechRadar"), {
  ssr: false,
});

export default function ExpertisePage() {
  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Expertise Domains"
          subtitle="Eight specialized areas unified by systems thinking, leadership experience, and a relentless drive to ship."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseDomains.map((domain, i) => (
            <Link key={domain.id} href={`/expertise/${domain.id}`}>
              <GlassCard
                delay={i * 0.08}
                glowColor={domain.glowColor}
                className="h-full cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{domain.icon}</span>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ color: domain.color }}
                    >
                      {domain.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                      {domain.subtitle}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                      {domain.description}
                    </p>

                    {/* Skills preview */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {domain.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill.name}
                          className="text-[10px] px-2 py-0.5 rounded-full border text-[var(--text-muted)]"
                          style={{ borderColor: `${domain.color}30` }}
                        >
                          {skill.name}
                        </span>
                      ))}
                      {domain.skills.length > 4 && (
                        <span className="text-[10px] text-[var(--text-muted)]">
                          +{domain.skills.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1">
                      {domain.highlights.slice(0, 2).map((h) => (
                        <li
                          key={h}
                          className="text-xs text-[var(--text-muted)] flex items-start gap-2"
                        >
                          <span style={{ color: domain.color }}>▸</span>
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        {/* Tech Radar */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Technology Radar
          </h3>
          <p className="text-sm text-[var(--text-muted)] text-center mb-8 max-w-lg mx-auto">
            Hover over dots to explore my proficiency across languages,
            infrastructure, data, and hardware. Inner rings = deeper expertise.
          </p>
          <TechRadar />
        </div>
      </div>
    </div>
  );
}
