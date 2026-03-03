# Repo Explorer (Endurance Take-Home)

A small, production-minded frontend app that visualizes the GitHub public API.

## Stack
- Next.js (App Router) + React 18
- TypeScript
- Tailwind CSS
- Vitest + Testing Library (lightweight smoke test)

## Features
- Debounced repo search (reduces API calls)
- Sort + order controls
- Pagination (with GitHub Search API 1000-result cap handled)
- Detail page with repo metadata + top language breakdown
- Resilient UX: loading, empty, and error states
- Accessibility basics: labels, focus-visible, keyboard-friendly controls

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Add a GitHub token to avoid rate limits:
   ```bash
   cp .env.example .env.local
   # then set GITHUB_TOKEN in .env.local
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

Open http://localhost:3000

## Scripts
- `npm run dev` – local dev
- `npm run build` – production build
- `npm run start` – run production build
- `npm run lint` – lint
- `npm test` – run unit tests

