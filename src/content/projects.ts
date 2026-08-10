import type { Project } from "@/types/project";

// Placeholder content — replace with Lenny's real project details.
export const projects: Project[] = [
  {
    id: "copapp",
    title: "CopApp",
    summary: "Social fashion platform for sharing and discovering outfits.",
    description:
      "CopApp is a social platform where users share outfit photos, tag the pieces they're wearing, and discover new styles from a community feed.",
    problem:
      "Finding outfit inspiration and identifying exactly which pieces to buy is scattered across too many apps.",
    features: [
      "Outfit feed with likes and comments",
      "Tagging individual clothing items in a photo",
      "User profiles and a following system",
    ],
    architecture:
      "React Native client talking to a Supabase backend (Postgres, Auth, Storage) through a typed API layer.",
    technologies: ["React Native", "TypeScript", "Supabase", "PostgreSQL"],
    challenges:
      "Designing an image-tagging UX that stays fast on lower-end phones while keeping the underlying data model flexible.",
    results: "Placeholder — real results and metrics to be added.",
    githubUrl: "https://github.com/lennymurte/copapp",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    summary: "An iMessage-inspired interactive portfolio, powered by an AI assistant.",
    description:
      "Instead of a traditional portfolio site, this project simulates an iPhone Messages conversation where an AI assistant answers questions about Lenny's background.",
    problem:
      "Traditional portfolios are easy to skim and forget. A conversational, memorable format stands out to recruiters.",
    features: [
      "iOS Messages-accurate UI with typing indicators and read receipts",
      "LLM-powered assistant grounded in structured portfolio data",
      "Apple Notes-style content pages reached through link previews",
    ],
    architecture:
      "Next.js App Router frontend, with a server API route mediating all LLM calls so no key is ever exposed to the browser.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    challenges: "Recreating iOS interaction fidelity — timing, spacing, animations — using only web technologies.",
    results: "Placeholder — to be updated once the project is complete.",
    githubUrl: "https://github.com/lennymurte/murte-portfolio",
  },
];
