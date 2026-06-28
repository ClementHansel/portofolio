"use client";

import { useState } from "react";

interface TechItem {
  name: string;
  ring: "expert" | "advanced" | "proficient" | "exploring";
  quadrant: number; // 0-3
  color: string;
}

const techItems: TechItem[] = [
  // Quadrant 0: Languages & Frameworks
  { name: "TypeScript", ring: "expert", quadrant: 0, color: "#3b82f6" },
  { name: "React/Next.js", ring: "expert", quadrant: 0, color: "#3b82f6" },
  { name: "Node.js", ring: "expert", quadrant: 0, color: "#10b981" },
  { name: "Python", ring: "advanced", quadrant: 0, color: "#f59e0b" },
  { name: "Go", ring: "proficient", quadrant: 0, color: "#06b6d4" },
  // Quadrant 1: Infrastructure & DevOps
  { name: "Docker", ring: "advanced", quadrant: 1, color: "#3b82f6" },
  { name: "Kubernetes", ring: "advanced", quadrant: 1, color: "#3b82f6" },
  { name: "AWS", ring: "advanced", quadrant: 1, color: "#f59e0b" },
  { name: "CI/CD", ring: "expert", quadrant: 1, color: "#10b981" },
  { name: "Terraform", ring: "proficient", quadrant: 1, color: "#a855f7" },
  // Quadrant 2: Data & AI
  { name: "PostgreSQL", ring: "expert", quadrant: 2, color: "#3b82f6" },
  { name: "TensorFlow", ring: "advanced", quadrant: 2, color: "#f59e0b" },
  { name: "Redis", ring: "advanced", quadrant: 2, color: "#ef4444" },
  { name: "TimescaleDB", ring: "advanced", quadrant: 2, color: "#06b6d4" },
  { name: "LLM/RAG", ring: "proficient", quadrant: 2, color: "#a855f7" },
  // Quadrant 3: IoT & Hardware
  { name: "MQTT", ring: "expert", quadrant: 3, color: "#10b981" },
  { name: "LoRaWAN", ring: "expert", quadrant: 3, color: "#06b6d4" },
  { name: "GSM/GPS", ring: "advanced", quadrant: 3, color: "#f59e0b" },
  { name: "Edge Computing", ring: "proficient", quadrant: 3, color: "#a855f7" },
  { name: "Three.js", ring: "advanced", quadrant: 3, color: "#3b82f6" },
];

const rings = ["expert", "advanced", "proficient", "exploring"] as const;
const ringRadii = [0.25, 0.5, 0.75, 1.0];
const quadrantLabels = [
  "Languages & Frameworks",
  "Infrastructure & DevOps",
  "Data & AI",
  "IoT & Hardware",
];

export default function TechRadar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const svgSize = 500;
  const center = svgSize / 2;
  const maxRadius = svgSize * 0.42;

  // Position calculation for each item
  const getPosition = (item: TechItem) => {
    const ringIndex = rings.indexOf(item.ring);
    const ringInner = ringIndex === 0 ? 0 : ringRadii[ringIndex - 1];
    const ringOuter = ringRadii[ringIndex];
    const r = (ringInner + ringOuter) / 2 * maxRadius;

    // Spread items within their quadrant
    const quadrantStart = item.quadrant * 90 - 45;
    const itemsInQuadrant = techItems.filter(
      (t) => t.quadrant === item.quadrant && t.ring === item.ring
    );
    const indexInGroup = itemsInQuadrant.indexOf(item);
    const spread = 70 / Math.max(itemsInQuadrant.length, 1);
    const angle = quadrantStart + 10 + indexInGroup * spread;
    const rad = (angle * Math.PI) / 180;

    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Quadrant labels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-[10px] text-[var(--text-muted)]">
        {quadrantLabels[0]}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-[10px] text-[var(--text-muted)] [writing-mode:vertical-rl]">
        {quadrantLabels[1]}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-[10px] text-[var(--text-muted)]">
        {quadrantLabels[2]}
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 text-[10px] text-[var(--text-muted)] [writing-mode:vertical-rl] rotate-180">
        {quadrantLabels[3]}
      </div>

      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-auto">
        {/* Ring circles */}
        {ringRadii.map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={r * maxRadius}
            fill="none"
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth={1}
          />
        ))}

        {/* Quadrant lines */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = ((angle - 45) * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={center}
              y1={center}
              x2={center + maxRadius * Math.cos(rad)}
              y2={center + maxRadius * Math.sin(rad)}
              stroke="rgba(59, 130, 246, 0.08)"
              strokeWidth={1}
            />
          );
        })}

        {/* Ring labels */}
        {rings.map((ring, i) => (
          <text
            key={ring}
            x={center + 4}
            y={center - ringRadii[i] * maxRadius + 12}
            fill="rgba(148, 163, 184, 0.4)"
            fontSize={9}
            fontFamily="monospace"
          >
            {ring}
          </text>
        ))}

        {/* Tech items as dots */}
        {techItems.map((item) => {
          const pos = getPosition(item);
          const isHovered = hoveredItem === item.name;
          return (
            <g
              key={item.name}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className="cursor-pointer"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 8 : 5}
                fill={item.color}
                opacity={isHovered ? 1 : 0.7}
                className="transition-all duration-200"
              />
              {isHovered && (
                <text
                  x={pos.x}
                  y={pos.y - 12}
                  textAnchor="middle"
                  fill="white"
                  fontSize={10}
                  fontWeight="bold"
                >
                  {item.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        {rings.map((ring) => (
          <div key={ring} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-blue)] opacity-70" />
            <span className="text-[10px] text-[var(--text-muted)] capitalize">
              {ring}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
