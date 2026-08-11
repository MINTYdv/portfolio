import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/siteUrl";
import "./globals.css";

const TITLE = "Lenny Murte — Software Engineer";
const DESCRIPTION =
  "Chat with Lenny Murte's AI assistant to explore his portfolio, iMessage-style — projects, skills, and experience, one message at a time.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Lenny Murte",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
  // Ask supporting browsers to resize the layout viewport (not overlay it)
  // when the on-screen keyboard opens, so the header stays visible above it.
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full overflow-hidden bg-white text-black">{children}</body>
    </html>
  );
}
