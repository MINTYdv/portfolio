// Public site origin, used for SEO metadata (Open Graph, sitemap, robots).
// Safe to expose to the client — it's just the site's own URL, not a secret.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
