/**
 * Unified input manager for keyboard and touch.
 * Tracks which keys are currently held and provides press/release events.
 */
export class InputManager {
  private keys: Set<string> = new Set();
  private justPressed: Set<string> = new Set();
  private justReleased: Set<string> = new Set();

  constructor() {
    if (typeof window === "undefined") return;
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.keys.has(e.code)) {
      this.justPressed.add(e.code);
    }
    this.keys.add(e.code);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
    this.justReleased.add(e.code);
  };

  isDown(key: string): boolean {
    return this.keys.has(key);
  }

  wasPressed(key: string): boolean {
    return this.justPressed.has(key);
  }

  wasReleased(key: string): boolean {
    return this.justReleased.has(key);
  }

  /** Call at end of each frame to clear single-frame events */
  update() {
    this.justPressed.clear();
    this.justReleased.clear();
  }

  destroy() {
    if (typeof window === "undefined") return;
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }
}
