// Live numbers for the L1 blocks on the home page, read from the chain's public
// health endpoint on the server (the API only allows its own origin in CORS).
// The page revalidates every 10 minutes; in between, the client extrapolates
// one batch per second — the network's block time.

export interface L1Snapshot {
  height: number;
  /** ms timestamp of `height` */
  at: number;
  live: boolean;
}

// Last known values, used when the endpoint is unreachable at build time.
const FALLBACK: L1Snapshot = { height: 23_706_458, at: 1_791_550_700_000, live: false };

export async function getL1Snapshot(): Promise<L1Snapshot> {
  try {
    const res = await fetch("https://api.armascan.io/health", { next: { revalidate: 600 }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return FALLBACK;
    const d = (await res.json()) as { committed_height?: number; committed_time_ms?: number };
    if (!d.committed_height || !d.committed_time_ms) return FALLBACK;
    return { height: d.committed_height, at: d.committed_time_ms, live: true };
  } catch {
    return FALLBACK;
  }
}

/** Estimated height now, given a snapshot (1 batch ≈ 1 s) */
export function estimateHeight(s: L1Snapshot, now = Date.now()) {
  return s.height + Math.max(0, Math.floor((now - s.at) / 1000));
}
