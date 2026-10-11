/**
 * Touch devices get a stitched screenshot of a demo instead of the live iframe:
 * six viewport frames captured while scrolling the demo at 1440×900, scaled to 900px wide,
 * with the sticky header cut out and supplied separately so it can stay pinned on top.
 */
export interface DemoShot {
  src: string;
  /** Same frames as a static WebP, served as-is (no image optimizer round trip) */
  webp: string;
  header: string;
  /** Pixel size of `src` */
  width: number;
  height: number;
  /** Pixel height of `header` at the same 900px width */
  headerHeight: number;
}

const HEADER_HEIGHT: Record<string, number> = {
  gran: 38,
  lumo: 49,
  ferro: 40,
  kvant: 42,
  alatoo: 45,
  aera: 49,
  meridian: 39,
  forma: 48,
};

export interface DemoVideo {
  /** HEVC first: iPhones play it at about two thirds of the H.264 size */
  hevc: string;
  h264: string;
  poster: string;
}

/**
 * Recordings of a demo auto-scrolling exactly like the desktop hero iframe (1440×900 capture,
 * 960×600, 30fps, ~21s seamless loop), so phones see the live animations without running the page.
 */
const VIDEOS: Record<string, DemoVideo> = {
  gran: { hevc: "/videos/gran-hero-hevc.mp4", h264: "/videos/gran-hero-h264.mp4", poster: "/videos/gran-hero-poster.webp" },
};

export function demoVideo(demo: string | undefined): DemoVideo | null {
  const slug = demo?.match(/^\/demos\/([a-z0-9-]+)\//)?.[1];
  return (slug && VIDEOS[slug]) || null;
}

/** "/demos/gran/index.html" → its screenshot set, or null when none was captured */
export function demoShot(demo: string | undefined): DemoShot | null {
  const slug = demo?.match(/^\/demos\/([a-z0-9-]+)\//)?.[1];
  if (!slug || !(slug in HEADER_HEIGHT)) return null;
  return {
    src: `/images/showcase/${slug}/scroll.jpg`,
    webp: `/images/showcase/${slug}/scroll.webp`,
    header: `/images/showcase/${slug}/scroll-header.jpg`,
    width: 900,
    height: 3372,
    headerHeight: HEADER_HEIGHT[slug],
  };
}
