"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * IoT DASHBOARD — Real-time sensor monitoring simulation.
 *
 * Demonstrates:
 * - Real-time data streaming (simulated WebSocket via setInterval)
 * - Time-series line charts (Canvas-rendered)
 * - Multiple sensor nodes with status indicators
 * - Alert system with threshold detection
 * - Gauges for current readings
 * - Connection status & data throughput counters
 */

interface SensorReading {
  timestamp: number;
  value: number;
}

interface SensorNode {
  id: string;
  name: string;
  location: string;
  type: "temperature" | "humidity" | "pressure" | "water_level";
  unit: string;
  min: number;
  max: number;
  alertThreshold: number;
  color: string;
  readings: SensorReading[];
  current: number;
  status: "online" | "warning" | "offline";
}

interface Alert {
  id: number;
  sensorId: string;
  message: string;
  time: number;
  severity: "warning" | "critical";
}

const INITIAL_SENSORS: SensorNode[] = [
  { id: "temp-01", name: "Temperature A", location: "Zone 1", type: "temperature", unit: "°C", min: 15, max: 45, alertThreshold: 38, color: "#ef4444", readings: [], current: 25, status: "online" },
  { id: "temp-02", name: "Temperature B", location: "Zone 2", type: "temperature", unit: "°C", min: 15, max: 45, alertThreshold: 38, color: "#f97316", readings: [], current: 27, status: "online" },
  { id: "hum-01", name: "Humidity", location: "Zone 1", type: "humidity", unit: "%", min: 20, max: 100, alertThreshold: 85, color: "#3b82f6", readings: [], current: 55, status: "online" },
  { id: "pres-01", name: "Pressure", location: "Zone 3", type: "pressure", unit: "hPa", min: 980, max: 1040, alertThreshold: 1030, color: "#10b981", readings: [], current: 1013, status: "online" },
  { id: "water-01", name: "Water Level", location: "Zone 2", type: "water_level", unit: "cm", min: 0, max: 200, alertThreshold: 160, color: "#06b6d4", readings: [], current: 85, status: "online" },
  { id: "temp-03", name: "Temperature C", location: "Zone 3", type: "temperature", unit: "°C", min: 15, max: 45, alertThreshold: 38, color: "#a855f7", readings: [], current: 22, status: "online" },
];

export default function IoTDashboard() {
  const [sensors, setSensors] = useState<SensorNode[]>(INITIAL_SENSORS);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dataPoints, setDataPoints] = useState(0);
  const [selectedSensor, setSelectedSensor] = useState<string>("temp-01");
  const [isStreaming, setIsStreaming] = useState(true);
  const alertIdRef = useRef(0);
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Simulate real-time data streaming
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => {
          // Random walk with mean reversion
          const noise = (Math.random() - 0.5) * 3;
          const mean = (sensor.min + sensor.max) / 2;
          const reversion = (mean - sensor.current) * 0.02;
          let newValue = sensor.current + noise + reversion;
          newValue = Math.max(sensor.min, Math.min(sensor.max, newValue));

          // Occasional spikes
          if (Math.random() < 0.02) newValue = sensor.current + (Math.random() - 0.3) * 10;
          newValue = Math.max(sensor.min, Math.min(sensor.max, newValue));

          const newReading: SensorReading = {
            timestamp: Date.now(),
            value: Math.round(newValue * 10) / 10,
          };

          const readings = [...sensor.readings, newReading].slice(-60);
          const status: SensorNode["status"] =
            newValue > sensor.alertThreshold ? "warning" :
            Math.random() < 0.005 ? "offline" : "online";

          // Generate alert
          if (newValue > sensor.alertThreshold) {
            setAlerts((a) => {
              alertIdRef.current += 1;
              const severity: Alert["severity"] = newValue > sensor.alertThreshold * 1.05 ? "critical" : "warning";
              return [{
                id: alertIdRef.current,
                sensorId: sensor.id,
                message: `${sensor.name} exceeded threshold: ${newValue.toFixed(1)}${sensor.unit}`,
                time: Date.now(),
                severity,
              }, ...a].slice(0, 10);
            });
          }

          return { ...sensor, readings, current: newValue, status };
        })
      );
      setDataPoints((d) => d + INITIAL_SENSORS.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Draw chart
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const sensor = sensors.find((s) => s.id === selectedSensor);
    if (!sensor) return;

    const W = canvas.width;
    const H = canvas.height;
    const readings = sensor.readings;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#0a0f1a";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(59,130,246,0.06)";
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += H / 5) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    if (readings.length < 2) return;

    // Scale
    const minV = sensor.min;
    const maxV = sensor.max;
    const range = maxV - minV;

    // Threshold line
    const threshY = H - ((sensor.alertThreshold - minV) / range) * H;
    ctx.strokeStyle = "rgba(239,68,68,0.4)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(0, threshY); ctx.lineTo(W, threshY); ctx.stroke();
    ctx.setLineDash([]);

    // Data line
    ctx.strokeStyle = sensor.color;
    ctx.lineWidth = 2;
    ctx.shadowColor = sensor.color;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    readings.forEach((r, i) => {
      const x = (i / (readings.length - 1)) * W;
      const y = H - ((r.value - minV) / range) * H;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Fill area
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = `${sensor.color}10`;
    ctx.fill();

    // Labels
    ctx.fillStyle = "#64748b";
    ctx.font = "10px monospace";
    ctx.fillText(`${maxV}${sensor.unit}`, 4, 12);
    ctx.fillText(`${minV}${sensor.unit}`, 4, H - 4);
  }, [sensors, selectedSensor]);

  const selected = sensors.find((s) => s.id === selectedSensor);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">IoT Monitoring Platform</h3>
          <p className="text-xs text-[var(--text-muted)]">
            {sensors.filter((s) => s.status === "online").length}/{sensors.length} nodes online •{" "}
            {dataPoints.toLocaleString()} data points
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`text-xs px-3 py-1.5 rounded-lg border ${
              isStreaming
                ? "border-emerald-500/30 text-emerald-400"
                : "border-red-500/30 text-red-400"
            }`}
          >
            {isStreaming ? "● LIVE" : "○ PAUSED"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sensor list */}
        <div className="lg:col-span-1 space-y-2">
          {sensors.map((sensor) => (
            <button
              key={sensor.id}
              onClick={() => setSelectedSensor(sensor.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                selectedSensor === sensor.id
                  ? "border-[var(--accent-blue)]/50 bg-[var(--accent-blue)]/5"
                  : "border-[var(--border-subtle)] hover:border-[var(--border-glow)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white">{sensor.name}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    sensor.status === "online" ? "bg-emerald-400" :
                    sensor.status === "warning" ? "bg-amber-400 animate-pulse" : "bg-red-400"
                  }`}
                />
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold" style={{ color: sensor.color }}>
                  {sensor.current.toFixed(1)}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">{sensor.unit}</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">{sensor.location}</span>
            </button>
          ))}
        </div>

        {/* Chart + details */}
        <div className="lg:col-span-3 space-y-4">
          {/* Main chart */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">
                {selected?.name} — {selected?.location}
              </span>
              <span className="text-xs text-[var(--text-muted)]">Last 60 readings</span>
            </div>
            <canvas ref={chartRef} width={600} height={180} className="w-full rounded-lg" />
          </div>

          {/* Gauge cards */}
          <div className="grid grid-cols-3 gap-3">
            {sensors.slice(0, 3).map((s) => {
              const pct = ((s.current - s.min) / (s.max - s.min)) * 100;
              return (
                <div key={s.id} className="glass-card p-3 text-center">
                  <div className="text-[10px] text-[var(--text-muted)] mb-1">{s.name}</div>
                  <div className="relative w-full h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: s.color, width: `${pct}%` }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-sm font-bold mt-1" style={{ color: s.color }}>
                    {s.current.toFixed(1)}{s.unit}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alerts */}
          <div className="glass-card p-4 max-h-40 overflow-y-auto">
            <div className="text-xs font-medium text-white mb-2">Alerts ({alerts.length})</div>
            {alerts.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)]">No alerts</p>
            ) : (
              alerts.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center gap-2 text-xs py-1 border-b border-[var(--border-subtle)] last:border-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.severity === "critical" ? "bg-red-400" : "bg-amber-400"}`} />
                  <span className="text-[var(--text-secondary)] flex-1">{a.message}</span>
                  <span className="text-[var(--text-muted)]">
                    {new Date(a.time).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
