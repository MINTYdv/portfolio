// In-memory hello counter. Resets on server restart/cold start — a simple
// starting point, swappable for persistent storage later without touching call sites.
let count = 0;

// Best-effort per-visitor dedup by client key (IP-based). Not a hard security
// boundary — just keeps the public counter honest against casual repeat POSTs
// (e.g. the client localStorage flag being cleared, or a direct curl retry).
const seenClientKeys = new Set<string>();

export function getHelloCount(): number {
  return count;
}

export function incrementHelloCountOnce(clientKey: string): number {
  if (!seenClientKeys.has(clientKey)) {
    seenClientKeys.add(clientKey);
    count += 1;
  }
  return count;
}
