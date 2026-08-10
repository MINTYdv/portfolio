# Lenny Murte — Portfolio

An interactive, iOS Messages-inspired portfolio. Instead of a traditional site, visitors chat with an AI assistant through a virtual iPhone to explore projects, skills, experience, and education — presented as Apple Notes-style pages reached from the conversation.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Google Gemini API (server-side only, streaming + tool calling)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes | Google Gemini API key, used server-side only. Get one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). |
| `GEMINI_MODEL` | No | Overrides the default Gemini model (`gemini-flash-lite-latest`). |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL, used for SEO metadata (Open Graph, sitemap, robots.txt). |

## Project structure

```text
src/
  app/            Routes, layout, API endpoints (chat, hello counter)
  components/     iphone/ messages/ notes/ common/
  content/        Typed, data-driven portfolio content (projects, experience, skills, ...)
  lib/            AI provider, i18n, chat logic, server utilities
  types/          Shared TypeScript types
```

Portfolio content (projects, experience, education, skills, interests) lives in `src/content/` — adding or editing an entry there is all that's needed, no component changes required.
