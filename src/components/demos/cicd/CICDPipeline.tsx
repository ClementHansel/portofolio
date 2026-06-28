"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * CI/CD PIPELINE VISUALIZER — Animated deployment flow.
 *
 * Demonstrates:
 * - Pipeline stage visualization (build → test → deploy → monitor)
 * - Animated progress through stages
 * - Log output simulation
 * - Success/failure states with rollback
 * - Parallel job visualization
 * - Environment promotion (dev → staging → production)
 */

interface PipelineStage {
  id: string;
  name: string;
  status: "pending" | "running" | "success" | "failed" | "skipped";
  duration: number; // seconds to complete
  logs: string[];
  icon: string;
}

interface Deployment {
  id: number;
  commit: string;
  author: string;
  message: string;
  branch: string;
  timestamp: number;
  stages: PipelineStage[];
  environment: "development" | "staging" | "production";
  status: "running" | "success" | "failed";
}

const STAGE_TEMPLATES: Omit<PipelineStage, "status" | "logs">[] = [
  { id: "checkout", name: "Checkout", duration: 2, icon: "📥" },
  { id: "install", name: "Install Deps", duration: 3, icon: "📦" },
  { id: "lint", name: "Lint & Type Check", duration: 2, icon: "🔍" },
  { id: "test", name: "Run Tests", duration: 4, icon: "🧪" },
  { id: "build", name: "Build", duration: 3, icon: "🔨" },
  { id: "deploy", name: "Deploy", duration: 3, icon: "🚀" },
  { id: "health", name: "Health Check", duration: 2, icon: "💚" },
];

const LOG_TEMPLATES: Record<string, string[]> = {
  checkout: ["Cloning repository...", "Checking out branch main", "HEAD is now at a3f72b1"],
  install: ["npm ci --frozen-lockfile", "Installing 847 packages...", "added 847 packages in 12s"],
  lint: ["Running ESLint...", "Running TypeScript compiler...", "No errors found ✓"],
  test: ["Running test suite...", "  ✓ auth.test.ts (23 tests)", "  ✓ api.test.ts (41 tests)", "All 156 tests passed"],
  build: ["Creating optimized production build...", "Compiled successfully", "Bundle size: 245kB gzipped"],
  deploy: ["Uploading artifacts...", "Deploying to cluster...", "Rolling update in progress..."],
  health: ["Checking endpoint /health...", "Response 200 OK (23ms)", "All services healthy ✓"],
};

const COMMITS = [
  { hash: "a3f72b1", author: "clement", message: "feat: add real-time sensor dashboard", branch: "main" },
  { hash: "8b2c4d0", author: "clement", message: "fix: resolve WebSocket reconnection issue", branch: "main" },
  { hash: "f1e9a3c", author: "clement", message: "refactor: migrate to event-driven architecture", branch: "feature/events" },
  { hash: "2d7c6b5", author: "clement", message: "chore: upgrade dependencies, fix security audit", branch: "main" },
];

export default function CICDPipeline() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [env, setEnv] = useState<"development" | "staging" | "production">("development");

  const triggerPipeline = useCallback(() => {
    if (isRunning) return;

    const commit = COMMITS[Math.floor(Math.random() * COMMITS.length)];
    const stages: PipelineStage[] = STAGE_TEMPLATES.map((t) => ({
      ...t,
      status: "pending" as const,
      logs: [],
    }));

    const deployment: Deployment = {
      id: Date.now(),
      commit: commit.hash,
      author: commit.author,
      message: commit.message,
      branch: commit.branch,
      timestamp: Date.now(),
      stages,
      environment: env,
      status: "running",
    };

    setDeployments((d) => [deployment, ...d].slice(0, 5));
    setIsRunning(true);
    setCurrentStage(0);
    setLogs([`[${new Date().toLocaleTimeString()}] Pipeline triggered for ${commit.hash}`]);
  }, [isRunning, env]);

  // Run through stages
  useEffect(() => {
    if (!isRunning || currentStage < 0) return;

    if (currentStage >= STAGE_TEMPLATES.length) {
      // Pipeline complete
      setIsRunning(false);
      setDeployments((d) => {
        const updated = [...d];
        if (updated[0]) updated[0] = { ...updated[0], status: "success" };
        return updated;
      });
      setLogs((l) => [...l, `[${new Date().toLocaleTimeString()}] ✓ Pipeline completed successfully`]);
      setCurrentStage(-1);
      return;
    }

    const stage = STAGE_TEMPLATES[currentStage];
    const stageLogs = LOG_TEMPLATES[stage.id] || ["Processing..."];

    // Mark stage as running
    setDeployments((d) => {
      const updated = [...d];
      if (updated[0]) {
        const stages = [...updated[0].stages];
        stages[currentStage] = { ...stages[currentStage], status: "running" };
        updated[0] = { ...updated[0], stages };
      }
      return updated;
    });

    setLogs((l) => [...l, `[${new Date().toLocaleTimeString()}] ▶ ${stage.name}...`]);

    // Simulate stage execution
    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < stageLogs.length) {
        setLogs((l) => [...l, `  ${stageLogs[logIdx]}`]);
        logIdx++;
      }
    }, (stage.duration * 1000) / (stageLogs.length + 1));

    const timeout = setTimeout(() => {
      clearInterval(logInterval);

      // Random failure chance (5% for non-prod, 2% for prod)
      const failChance = env === "production" ? 0.02 : 0.05;
      const failed = Math.random() < failChance;

      setDeployments((d) => {
        const updated = [...d];
        if (updated[0]) {
          const stages = [...updated[0].stages];
          stages[currentStage] = { ...stages[currentStage], status: failed ? "failed" : "success", logs: stageLogs };
          if (failed) {
            for (let i = currentStage + 1; i < stages.length; i++) {
              stages[i] = { ...stages[i], status: "skipped" };
            }
            updated[0] = { ...updated[0], stages, status: "failed" };
          } else {
            updated[0] = { ...updated[0], stages };
          }
        }
        return updated;
      });

      if (failed) {
        setLogs((l) => [...l, `  ✗ FAILED`, `[${new Date().toLocaleTimeString()}] Pipeline failed at ${stage.name}`]);
        setIsRunning(false);
        setCurrentStage(-1);
      } else {
        setLogs((l) => [...l, `  ✓ ${stage.name} complete`]);
        setCurrentStage((s) => s + 1);
      }
    }, stage.duration * 1000);

    return () => { clearTimeout(timeout); clearInterval(logInterval); };
  }, [currentStage, isRunning, env]);

  const currentDeployment = deployments[0];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">CI/CD Pipeline</h3>
          <p className="text-xs text-[var(--text-muted)]">Automated deployment visualization</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Environment selector */}
          <div className="flex gap-1">
            {(["development", "staging", "production"] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEnv(e)}
                className={`text-[10px] px-2 py-1 rounded-md capitalize ${
                  env === e
                    ? "bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border border-[var(--accent-blue)]/30"
                    : "text-[var(--text-muted)] border border-[var(--border-subtle)]"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <button
            onClick={triggerPipeline}
            disabled={isRunning}
            className="neon-btn px-4 py-2 text-sm disabled:opacity-50"
          >
            {isRunning ? "Running..." : "▶ Deploy"}
          </button>
        </div>
      </div>

      {/* Pipeline stages */}
      {currentDeployment && (
        <div className="glass-card p-4 mb-4">
          <div className="flex items-center gap-2 mb-3 text-xs">
            <span className="text-[var(--accent-cyan)] font-mono">{currentDeployment.commit}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--text-secondary)]">{currentDeployment.message}</span>
          </div>

          {/* Stage progress */}
          <div className="flex items-center gap-1">
            {currentDeployment.stages.map((stage, i) => (
              <div key={stage.id} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: stage.status === "running" ? [1, 1.1, 1] : 1,
                    backgroundColor:
                      stage.status === "success" ? "#10b981" :
                      stage.status === "failed" ? "#ef4444" :
                      stage.status === "running" ? "#3b82f6" :
                      stage.status === "skipped" ? "#374151" : "#1f2937",
                  }}
                  transition={stage.status === "running" ? { repeat: Infinity, duration: 1 } : {}}
                  className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg min-w-[60px]"
                >
                  <span className="text-sm">{stage.icon}</span>
                  <span className="text-[9px] text-white text-center leading-tight">{stage.name}</span>
                </motion.div>
                {i < currentDeployment.stages.length - 1 && (
                  <div className={`w-4 h-0.5 ${
                    currentDeployment.stages[i + 1].status !== "pending" ? "bg-[var(--accent-blue)]" : "bg-[var(--border-subtle)]"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Logs */}
        <div className="glass-card p-4">
          <div className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider">Build Logs</div>
          <div className="bg-[var(--bg-primary)] rounded-lg p-3 h-48 overflow-y-auto font-mono text-[10px] space-y-0.5">
            {logs.length === 0 ? (
              <span className="text-[var(--text-muted)]">Click Deploy to start pipeline...</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={
                  log.includes("✓") ? "text-emerald-400" :
                  log.includes("✗") || log.includes("FAILED") ? "text-red-400" :
                  log.includes("▶") ? "text-[var(--accent-blue)]" : "text-[var(--text-secondary)]"
                }>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* History */}
        <div className="glass-card p-4">
          <div className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider">Deployment History</div>
          <div className="space-y-2">
            {deployments.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)]">No deployments yet</p>
            ) : (
              deployments.map((d) => (
                <div key={d.id} className="flex items-center gap-2 text-xs py-2 border-b border-[var(--border-subtle)] last:border-0">
                  <span className={`w-2 h-2 rounded-full ${
                    d.status === "success" ? "bg-emerald-400" : d.status === "failed" ? "bg-red-400" : "bg-blue-400 animate-pulse"
                  }`} />
                  <span className="text-[var(--accent-cyan)] font-mono">{d.commit}</span>
                  <span className="text-[var(--text-secondary)] flex-1 truncate">{d.message}</span>
                  <span className="text-[var(--text-muted)] capitalize text-[10px]">{d.environment}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
