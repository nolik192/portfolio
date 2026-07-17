# Portfolio Website — Design Spec

**Date:** 2026-07-17
**Owner:** Yury Bortsov (lagepik@gmail.com)

## 1. Purpose

A personal developer portfolio for Yury Bortsov — a high-school student (Math/Physics/CS track, V Liceum Ogólnokształcące, Gdańsk, expected grad. 2028) who is a self-taught developer and systems administrator. The site targets a mixed audience: recruiters/hiring managers, potential freelance/startup clients, and the developer community. Goal: establish credibility and make it easy to reach out, backed by real, substantial project work rather than generic student projects.

## 2. Content

Sourced from the owner's LinkedIn export and CV (`Profile.pdf`, `YuryBortsovCVIT.pdf`). Used directly — no placeholder copy.

### 2.1 Bio (for `/about` and hero)

> Self-taught developer and systems administrator with 2+ years of hands-on experience running production infrastructure. Currently administer a live multi-service platform used by 300+ students, and co-build an AI-powered web application from architecture to deployment. Comfortable across the stack: backend APIs, databases, Linux server administration, and AI/automation tooling. High-school student on the Math–Physics–CS track, driven by a fascination with software engineering, game development, AI, and the startup ecosystem — actively building toward a career as a software engineer.

Languages: Russian (native), Polish (fluent), English (B2).

### 2.2 Skills (grouped, for `/about`)

- **Languages:** Python, SQL, Bash, JavaScript
- **Backend & Data:** FastAPI, Nest.js, PostgreSQL, MariaDB
- **AI / Automation:** LLM integration, Ollama, n8n, prompt engineering, RAG (learning)
- **Systems & DevOps:** Linux (Debian), Docker, Git/GitLab CI, NAS/self-hosting, Windows
- **Tools:** VS Code, MS Office

### 2.3 Major Projects (for `/projects`, expanded cards)

**1. Tryton — School Hosting Platform**
Lead Developer & System Administrator, 2023–Present, independent project.
Designed, built, and operate a production web platform serving 300+ students, running on a self-managed Debian 12 server. Architected the backend with FastAPI and MariaDB, containerized with Docker. Led a security hardening initiative: isolated the Docker socket via a proxy, migrated all containers to run as non-root users, and performed a full production data migration. Built a Discord bot integration, an in-platform economy/cosmetics system, and public user profiles with custom-generated avatars. Wrote internal handoff documentation to keep the project maintainable long-term.
Stack: Python · FastAPI · MariaDB · Docker · Linux · Discord API
Link: `users.tryton.vlo.gda.pl/s322/`

**2. gift-helper.com — AI Gift Recommendation Startup**
Co-Founder & Developer, 2025/2026–Present, early-stage startup (co-developed with one partner).
Co-architected a full-stack monorepo (Turborepo, pnpm workspaces) with a Next.js frontend and a Nest.js API. Integrated an LLM-based recommendation engine to generate personalized gift suggestions. Set up GitLab CI/CD pipelines and Git hooks (Husky, lint-staged) to keep code quality consistent across the team. Uses PostgreSQL for data persistence across frontend/backend packages.
Stack: Next.js · Nest.js · JavaScript · PostgreSQL · Turborepo · GitLab CI/CD

**3. AI News Pipeline**
Personal project, 2025.
Built an automated content pipeline using n8n: aggregates multiple RSS feeds, filters and selects articles via a locally-hosted LLM, and auto-publishes formatted news posts to a Telegram channel. Self-hosted an open-source LLM (Ollama) optimized to use native GPU acceleration rather than running in a container. Iteratively tuned prompts and pipeline logic to fix source bias and improve factual accuracy of generated posts.
Stack: n8n · Ollama · LLM prompting · Workflow automation

### 2.4 Other Projects (lighter cards, below the major ones)

- **Documentary Filmmaking** — Wrote, filmed, and edited an independent documentary on IT life at V LO, publicly screened in December 2025.
- **Game Development** — Building a first-person project in Unreal Engine 5.
- **Home Lab** — Runs a Synology NAS and a Windows workstation (RTX 4070) alongside a MacBook for local AI inference, self-hosting, and development.

### 2.5 Other Experience (for `/about`, brief mention)

- **Event Organizer & Tech Support**, V Liceum Ogólnokształcące, May 2025–Present. Co-organizes school events; provides technical support and operates AV equipment during live presentations.
- **Junior Camp Counselor** — leadership/organizational experience (mentioned briefly).
- **Video Content Creator & Streamer**, YouTube & Twitch, Nov 2024–Present. Produces and edits gaming-industry video content; hosts live broadcasts and moderates online communities.

### 2.6 Contact Links (for `/contact`)

- Email: `lagepik@gmail.com` (mailto link)
- GitHub: `github.com/nolik192`
- LinkedIn: `linkedin.com/in/yury-bortsov`
- YouTube: `https://www.youtube.com/@nolik194`
- Twitch: `https://www.twitch.tv/nolik192`

No contact form. No downloadable résumé PDF — the site itself serves that purpose.

## 3. Architecture

- **Framework:** Next.js (App Router, TypeScript).
- **Hosting:** Self-hosted on the owner's Raspberry Pi, running as a **Docker container** (non-root, matching the security pattern already used on the Tryton project).
- **Blog CMS:** **Sanity** (cloud-hosted headless CMS, free tier). Sanity's backend runs entirely on their infrastructure — the Pi only runs the Next.js container and never hosts a database or CMS admin panel. Free tier (500K–1M API requests/mo, 10GB+ bandwidth, 20GB assets) is explicitly licensed for production use, unlike Contentful's free tier which forbids commercial use.
- **Static content:** Projects, skills, bio, and contact links live in TypeScript data files in the repo (`lib/data/projects.ts`, `lib/data/profile.ts`). This content changes rarely, so editing via code + redeploy is acceptable — no CMS needed for it.

### 3.1 Site Map (multi-page)

| Route | Content |
|---|---|
| `/` | Hero (terminal-style intro) + latest 3 blog post previews, linking to `/blog` |
| `/projects` | 3 major project cards (expanded, with description/stack/links) + "Other Projects" section (documentary, game dev, home lab) |
| `/about` | Bio, skills, other experience |
| `/blog` | Full paginated post feed, sourced from Sanity |
| `/blog/[slug]` | Individual post page (Sanity portable text rendered) |
| `/contact` | Email + GitHub/LinkedIn/YouTube/Twitch links only, no form |

## 4. Design System

- **Style:** Terminal/hacker aesthetic (Portfolio Grid layout pattern: Hero → Project Grid → About/Philosophy → Contact, adapted to a multi-page site).
- **Palette — Oxocarbon** (IBM Carbon-inspired, chosen after rejecting more generic dev-portfolio palettes like Tokyo Night/Catppuccin for being overused):
  - Background: `#161616`
  - Surface/card: `#262626`
  - Border: `#393939`
  - Muted text: `#525252`
  - Body text: `#f2f4f8` (primary), `#dde1e6` (secondary)
  - Primary accent (CTAs, highlights): `#ee5396` (pink)
  - Secondary accent (prompts, links): `#08bdba` (teal)
- **Typography:** JetBrains Mono for headings/nav/code-styled elements (the terminal identity); IBM Plex Sans for longer body copy (bio, blog prose) for readability.
- **Motif:** Terminal-prompt styling throughout — section headers styled like `$ cat about.md`, nav items styled like a command list, a subtle blinking cursor in the hero (respects `prefers-reduced-motion`).
- **Mode:** Dark only, no light/dark toggle.
- **Responsive breakpoints:** 375px, 768px, 1024px, 1440px. Minimum 44×44px touch targets. Visible focus rings. WCAG AA contrast (Oxocarbon is high-contrast by design).

## 5. Data Flow

- **Static data:** Imported directly from `lib/data/*.ts` into the relevant page components at build time. No fetch, no loading state needed.
- **Blog data:** Next.js fetches from Sanity via `@sanity/client` at build time (`generateStaticParams` for `/blog/[slug]`) with ISR (`revalidate`) so new posts appear without a full redeploy.
  - Sanity schema: `post` — `title`, `slug`, `excerpt`, `body` (portable text), `publishedAt`, `coverImage`.
  - Homepage preview: latest 3 posts sorted by `publishedAt` descending.
  - `/blog`: full list, paginated.
- **Images:** `next/image`. Project/site images bundled in `/public`; blog cover images served via Sanity's CDN.

## 6. Error Handling

- Custom 404 page styled to match the terminal theme (e.g. `$ cd /nonexistent-page`, `bash: cd: no such file or directory`).
- If the Sanity fetch fails or returns empty (CMS temporarily unreachable), the blog list/preview renders an empty-state message instead of throwing — no other page depends on Sanity, so a CMS outage never breaks `/`, `/projects`, `/about`, or `/contact`.
- Missing/malformed optional fields in Sanity content degrade gracefully: missing excerpt is derived from the body text; missing cover image simply omits the image slot.

## 7. Testing

- **Vitest + React Testing Library:**
  - Unit tests for the static data layer (project/profile data shape/completeness).
  - Unit tests for Sanity query functions (mocked client) — including the empty/error fallback path.
  - Smoke render test per page: hero renders name/role, `/projects` renders all 3 major project cards plus all 3 "Other Projects" entries, `/blog` renders a post list from mocked data.
- **Type/build gates:** `tsc --noEmit` and `next build` run before any deploy.
- **No E2E framework for v1** (YAGNI for a solo portfolio) — revisit if the site gains more interactive surface (e.g. a contact form) later.

## 8. Deployment

- Multi-stage `Dockerfile` (Next.js standalone output) built and run on the Raspberry Pi.
- Container runs as a non-root user, consistent with the security pattern already established on the Tryton project.
- Environment variables (Sanity project ID/dataset/token) injected at container runtime, not baked into the image.
- Reverse-proxied alongside the owner's other self-hosted services (exact proxy/domain setup out of scope for this spec — an infra decision made at deploy time, not part of the application build).

## 9. Out of Scope (for this iteration)

- Light/dark theme toggle
- Downloadable résumé PDF
- Contact form / email-sending backend
- Individual detail pages per project (beyond the expanded cards on `/projects`)
- CMS for project/about content (static data files are sufficient)
- E2E test suite
