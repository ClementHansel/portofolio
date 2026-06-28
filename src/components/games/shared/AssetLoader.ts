/**
 * Asset loader with fallback support.
 * Tries to load image from path, falls back to procedural rendering if unavailable.
 */
export class AssetLoader {
  private cache: Map<string, HTMLImageElement> = new Map();
  private failed: Set<string> = new Set();

  async load(path: string): Promise<HTMLImageElement | null> {
    if (this.cache.has(path)) return this.cache.get(path)!;
    if (this.failed.has(path)) return null;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(path, img);
        resolve(img);
      };
      img.onerror = () => {
        this.failed.add(path);
        resolve(null);
      };
      img.src = path;
    });
  }

  async loadAll(paths: string[]): Promise<Map<string, HTMLImageElement | null>> {
    const results = new Map<string, HTMLImageElement | null>();
    await Promise.all(
      paths.map(async (path) => {
        const img = await this.load(path);
        results.set(path, img);
      })
    );
    return results;
  }

  isLoaded(path: string): boolean {
    return this.cache.has(path);
  }

  get(path: string): HTMLImageElement | null {
    return this.cache.get(path) || null;
  }
}

/**
 * Asset paths configuration.
 * Download from kenney.nl (CC0 license) and place in these locations:
 *
 * PLATFORMER (https://kenney.nl/assets/pixel-platformer):
 * - /assets/games/platformer/tilemap.png
 * - /assets/games/platformer/characters.png
 * - /assets/games/platformer/items.png
 *
 * CARDS (https://kenney.nl/assets/playing-cards-pack):
 * - /assets/games/cards/cardBacks.png
 * - /assets/games/cards/cardFaces.png
 *
 * If assets aren't present, games use procedural CSS/Canvas rendering.
 */
export const ASSET_PATHS = {
  platformer: {
    tilemap: "/assets/games/platformer/tilemap.png",
    characters: "/assets/games/platformer/characters.png",
    items: "/assets/games/platformer/items.png",
    background: "/assets/games/platformer/background.png",
  },
  cards: {
    backs: "/assets/games/cards/cardBacks.png",
    faces: "/assets/games/cards/cardFaces.png",
  },
} as const;
