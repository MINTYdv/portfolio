export const MAX_MESSAGE_LENGTH = 250;

// Minimum time between two sends, enforced client-side regardless of how fast
// the AI replies — a basic anti-spam measure independent of the server rate limit.
export const MIN_SEND_INTERVAL_MS = 4000;
