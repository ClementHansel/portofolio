"use client";

import { createContext, useContext, useState, useRef, useCallback, ReactNode } from "react";

/**
 * Sound Manager — Subtle UI sounds for interactions.
 * All sounds are synthesized with Web Audio API (no external files needed).
 * Togglable by the user. Off by default (opt-in).
 */

interface SoundContextType {
  enabled: boolean;
  toggle: () => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playTransition: () => void;
}

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  toggle: () => {},
  playHover: () => {},
  playClick: () => {},
  playSuccess: () => {},
  playTransition: () => {},
});

export function useSounds() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, volume: number, type: OscillatorType = "sine") => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch {}
    },
    [enabled, getCtx]
  );

  const playHover = useCallback(() => playTone(800, 0.05, 0.03, "sine"), [playTone]);
  const playClick = useCallback(() => playTone(600, 0.08, 0.05, "triangle"), [playTone]);
  const playSuccess = useCallback(() => {
    playTone(523, 0.1, 0.04, "sine");
    setTimeout(() => playTone(659, 0.1, 0.04, "sine"), 80);
    setTimeout(() => playTone(784, 0.15, 0.04, "sine"), 160);
  }, [playTone]);
  const playTransition = useCallback(() => playTone(200, 0.2, 0.02, "sine"), [playTone]);

  const toggle = useCallback(() => {
    setEnabled((e) => !e);
    if (!enabled) {
      // Initialize audio context on first enable (requires user gesture)
      getCtx();
    }
  }, [enabled, getCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, playHover, playClick, playSuccess, playTransition }}>
      {children}
    </SoundContext.Provider>
  );
}
