"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * AI PLAYGROUND — Interactive ML demonstrations.
 *
 * Demonstrates:
 * - Sentiment analysis (rule-based NLP simulation)
 * - Text classification
 * - Pattern recognition (simple nearest-neighbor on canvas)
 * - Live inference with confidence scores
 * - Model selection UI
 *
 * Note: These are simulated models (not real ML inference)
 * designed to demonstrate the UX of AI-powered interfaces.
 */

type ModelType = "sentiment" | "classifier" | "generator";

// Simulated sentiment analysis
function analyzeSentiment(text: string): { label: string; score: number; breakdown: Record<string, number> } {
  const positiveWords = ["great", "amazing", "love", "excellent", "happy", "good", "wonderful", "fantastic", "awesome", "best", "beautiful", "perfect"];
  const negativeWords = ["bad", "terrible", "hate", "awful", "worst", "ugly", "horrible", "disgusting", "poor", "sad", "angry", "fail"];

  const words = text.toLowerCase().split(/\W+/);
  let posCount = 0, negCount = 0;
  words.forEach((w) => {
    if (positiveWords.includes(w)) posCount++;
    if (negativeWords.includes(w)) negCount++;
  });

  const total = posCount + negCount || 1;
  const posScore = posCount / total;
  const negScore = negCount / total;
  const neutral = 1 - posScore - negScore;

  let label: string;
  if (posScore > negScore && posScore > 0.3) label = "Positive";
  else if (negScore > posScore && negScore > 0.3) label = "Negative";
  else label = "Neutral";

  const confidence = Math.max(posScore, negScore, neutral) * 0.6 + 0.4;

  return {
    label,
    score: Math.round(confidence * 100) / 100,
    breakdown: {
      positive: Math.round(posScore * 100),
      negative: Math.round(negScore * 100),
      neutral: Math.round(neutral * 100),
    },
  };
}

// Simulated text classification
function classifyText(text: string): { category: string; confidence: number; alternatives: { label: string; score: number }[] } {
  const categories: Record<string, string[]> = {
    "Technology": ["code", "software", "api", "server", "database", "algorithm", "machine", "learning", "data", "cloud", "deploy"],
    "Business": ["revenue", "market", "sales", "customer", "growth", "profit", "strategy", "invest", "roi", "kpi"],
    "Science": ["research", "hypothesis", "experiment", "theory", "quantum", "physics", "biology", "chemistry", "evolution"],
    "Sports": ["game", "team", "score", "player", "match", "win", "championship", "league", "coach"],
    "Health": ["health", "medical", "doctor", "patient", "treatment", "disease", "vaccine", "hospital", "fitness"],
  };

  const words = text.toLowerCase().split(/\W+/);
  const scores: Record<string, number> = {};

  Object.entries(categories).forEach(([cat, keywords]) => {
    scores[cat] = words.filter((w) => keywords.includes(w)).length;
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];
  const confidence = topScore > 0 ? Math.min(0.95, 0.5 + topScore * 0.15) : 0.2;

  return {
    category: topScore > 0 ? sorted[0][0] : "General",
    confidence: Math.round(confidence * 100) / 100,
    alternatives: sorted.slice(0, 3).map(([label, s]) => ({
      label,
      score: Math.round((s / (topScore || 1)) * confidence * 100) / 100,
    })),
  };
}

// Simulated text generation
function generateText(prompt: string): string {
  const templates = [
    `Building on "${prompt.slice(0, 30)}...", the system proposes an architecture leveraging microservices and event-driven patterns for maximum scalability.`,
    `Analysis of "${prompt.slice(0, 30)}..." suggests implementing a distributed pipeline with real-time processing capabilities and automated failover.`,
    `Based on the input context, the recommended approach involves containerized deployments with CI/CD integration and observability-first monitoring.`,
    `The model identifies key patterns in the prompt and recommends a modular solution incorporating both synchronous APIs and asynchronous message queues.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

export default function AIPlayground() {
  const [model, setModel] = useState<ModelType>("sentiment");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<{ input: string; model: string; time: number }[]>([]);

  const runInference = () => {
    if (!input.trim()) return;
    setIsProcessing(true);

    // Simulate network latency
    setTimeout(() => {
      let res: Record<string, unknown>;
      if (model === "sentiment") res = analyzeSentiment(input);
      else if (model === "classifier") res = classifyText(input);
      else res = { output: generateText(input) };

      setResult(res);
      setIsProcessing(false);
      setHistory((h) => [{ input: input.slice(0, 50), model, time: Date.now() }, ...h].slice(0, 5));
    }, 600 + Math.random() * 400);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">AI Playground</h3>
          <p className="text-xs text-[var(--text-muted)]">Interactive NLP model demonstrations</p>
        </div>
        <div className="text-[10px] px-2 py-1 rounded-full border border-[var(--accent-purple)]/30 text-[var(--accent-purple)]">
          Simulated Models
        </div>
      </div>

      {/* Model selector */}
      <div className="flex gap-2 mb-6">
        {([
          { id: "sentiment", label: "Sentiment Analysis", icon: "😊" },
          { id: "classifier", label: "Text Classifier", icon: "📂" },
          { id: "generator", label: "Text Generator", icon: "✨" },
        ] as { id: ModelType; label: string; icon: string }[]).map((m) => (
          <button
            key={m.id}
            onClick={() => { setModel(m.id); setResult(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              model === m.id
                ? "bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/40 text-white"
                : "border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white"
            }`}
          >
            <span>{m.icon}</span>
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="glass-card p-4">
            <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider block mb-2">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-purple)] resize-none"
              placeholder={
                model === "sentiment"
                  ? "Enter text to analyze sentiment... (try: 'This product is amazing and wonderful!')"
                  : model === "classifier"
                  ? "Enter text to classify... (try: 'The new API deployment uses cloud containers')"
                  : "Enter a prompt for text generation..."
              }
            />
            <button
              onClick={runInference}
              disabled={isProcessing || !input.trim()}
              className="mt-3 w-full px-4 py-2.5 rounded-xl bg-[var(--accent-purple)] text-white font-medium hover:bg-[var(--accent-purple)]/90 disabled:opacity-50 transition-all"
            >
              {isProcessing ? "Processing..." : "Run Inference →"}
            </button>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="glass-card p-3">
              <div className="text-xs text-[var(--text-muted)] mb-2">Recent queries</div>
              {history.map((h, i) => (
                <div key={i} className="text-[10px] text-[var(--text-secondary)] py-1 border-b border-[var(--border-subtle)] last:border-0">
                  <span className="text-[var(--accent-purple)]">[{h.model}]</span> {h.input}...
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="glass-card p-4">
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider block mb-3">
            Model Output
          </label>
          {isProcessing ? (
            <div className="flex items-center justify-center h-40">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-[var(--accent-purple)] border-t-transparent rounded-full"
              />
            </div>
          ) : result ? (
            <div className="space-y-3">
              {model === "sentiment" && (
                <>
                  <div className="text-center">
                    <div className="text-3xl mb-1">
                      {(result as { label: string }).label === "Positive" ? "😊" : (result as { label: string }).label === "Negative" ? "😞" : "😐"}
                    </div>
                    <div className="text-lg font-bold text-white">{(result as { label: string }).label}</div>
                    <div className="text-xs text-[var(--text-muted)]">
                      Confidence: {((result as { score: number }).score * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    {Object.entries((result as { breakdown: Record<string, number> }).breakdown).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)] w-16 capitalize">{key}</span>
                        <div className="flex-1 h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${val}%` }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: key === "positive" ? "#10b981" : key === "negative" ? "#ef4444" : "#6b7280" }}
                          />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] w-8">{val}%</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {model === "classifier" && (
                <>
                  <div className="text-center mb-4">
                    <div className="text-sm text-[var(--text-muted)]">Classified as</div>
                    <div className="text-xl font-bold text-[var(--accent-cyan)]">{(result as { category: string }).category}</div>
                    <div className="text-xs text-[var(--text-muted)]">
                      Confidence: {((result as { confidence: number }).confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(result as { alternatives: { label: string; score: number }[] }).alternatives.map((alt) => (
                      <div key={alt.label} className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)] w-20">{alt.label}</span>
                        <div className="flex-1 h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${alt.score * 100}%` }} className="h-full rounded-full bg-[var(--accent-cyan)]" />
                        </div>
                        <span className="text-xs w-10">{(alt.score * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {model === "generator" && (
                <div className="bg-[var(--bg-primary)] rounded-xl p-4 border border-[var(--border-subtle)]">
                  <div className="text-xs text-[var(--accent-purple)] mb-2 font-mono">Generated Output:</div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {(result as { output: string }).output}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-sm text-[var(--text-muted)]">
              Enter text and run inference to see results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
