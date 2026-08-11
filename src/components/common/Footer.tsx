// Reserved space at the bottom of the phone screen — kept for consistent
// layout/safe-area breathing room now that Resume/GitHub live in the header
// and there's no language selector to show here.
export function Footer() {
  return <div aria-hidden className="h-6 pb-[max(0.5rem,env(safe-area-inset-bottom))]" />;
}
