// In-memory fixed-window rate limiter. Resets on server restart/cold start —
// good enough for now, no extra infrastructure required.
const buckets = new Map<string, { count: number; resetAt: number }>();

// Periodically sweep expired entries so long-running servers don't accumulate
// an ever-growing map of stale keys that are never queried again.
const SWEEP_INTERVAL_CALLS = 500;
let callsSinceSweep = 0;

function sweepExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  callsSinceSweep += 1;
  if (callsSinceSweep >= SWEEP_INTERVAL_CALLS) {
    callsSinceSweep = 0;
    sweepExpired(now);
  }

  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}
