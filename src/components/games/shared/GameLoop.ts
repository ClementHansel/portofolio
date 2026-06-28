/**
 * Core game loop using requestAnimationFrame with delta time.
 * Provides consistent game speed regardless of frame rate.
 */
export class GameLoop {
  private animationId: number | null = null;
  private lastTime = 0;
  private isRunning = false;
  private updateFn: (dt: number) => void;
  private renderFn: () => void;

  constructor(update: (dt: number) => void, render: () => void) {
    this.updateFn = update;
    this.renderFn = render;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private tick = () => {
    if (!this.isRunning) return;

    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.05); // Cap at 50ms
    this.lastTime = now;

    this.updateFn(dt);
    this.renderFn();

    this.animationId = requestAnimationFrame(this.tick);
  };

  get running() {
    return this.isRunning;
  }
}
