# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a terminal/hacker-themed developer portfolio for Yury Bortsov — Next.js app with a Sanity-backed blog, deployed as a Docker container on his Raspberry Pi.

**Architecture:** Next.js 15 (App Router, TypeScript) with static project/bio data in the repo and blog posts fetched from a cloud-hosted Sanity project (via a separate `studio/` Sanity Studio sub-project). Styling via Tailwind CSS v4 using the Oxocarbon color palette and JetBrains Mono / IBM Plex Sans. Ships as a standalone Docker image running as a non-root user.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Vitest + React Testing Library, `@sanity/client`, Sanity Studio v3, `@portabletext/react`, Docker.

**Spec:** `docs/superpowers/specs/2026-07-17-portfolio-design.md`

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Initialize package.json**

Run: `npm init -y`
Expected: `package.json` created in the project root.

- [ ] **Step 2: Install Next.js and React**

Run: `npm install next react react-dom`
Expected: `next`, `react`, `react-dom` added to `dependencies` in `package.json`.

- [ ] **Step 3: Install TypeScript and Tailwind CSS v4**

Run: `npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss`
Expected: all six packages added to `devDependencies`.

- [ ] **Step 4: Add npm scripts**

Edit `package.json`, replace the generated `"scripts"` block with:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

- [ ] **Step 5: Write next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 6: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 7: Write postcss.config.mjs**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 8: Write app/globals.css**

```css
@import "tailwindcss";
```

- [ ] **Step 9: Write app/layout.tsx**

```tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 10: Write app/page.tsx**

```tsx
export default function HomePage() {
  return <p>Portfolio coming soon.</p>;
}
```

- [ ] **Step 11: Verify the build succeeds**

Run: `npm run build`
Expected: build completes successfully and lists `/` as a static route.

- [ ] **Step 12: Update .gitignore and commit**

The `.gitignore` at the project root already ignores `node_modules/` and `.next/`. Verify with:

Run: `git status`
Expected: only source files are untracked (no `node_modules/` or `.next/` entries).

```bash
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs app/
git commit -m "Scaffold Next.js project with TypeScript and Tailwind v4"
```

---

## Task 2: Set up Vitest and React Testing Library

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `lib/__tests__/sanity-check.test.ts`

- [ ] **Step 1: Install test dependencies**

Run: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom`
Expected: all six packages added to `devDependencies`.

- [ ] **Step 2: Add test scripts**

Edit `package.json`, update `"scripts"` to:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Write vitest.config.ts**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

- [ ] **Step 4: Write vitest.setup.ts**

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Write a throwaway sanity-check test**

```typescript
import { describe, expect, it } from "vitest";

describe("vitest setup", () => {
  it("runs a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run the test suite**

Run: `npm test`
Expected: 1 test file, 1 test passed.

- [ ] **Step 7: Delete the throwaway test and commit**

Run: `rm lib/__tests__/sanity-check.test.ts`

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts
git commit -m "Add Vitest and React Testing Library"
```

---

## Task 3: Profile data layer

**Files:**
- Create: `lib/data/profile.ts`
- Test: `lib/data/__tests__/profile.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, expect, it } from "vitest";
import { profile } from "../profile";

describe("profile data", () => {
  it("has a name, role, location, and bio", () => {
    expect(profile.name).toBe("Yury Bortsov");
    expect(profile.role).toBe("Junior Software Engineer");
    expect(profile.location).toBe("Gdańsk, Poland");
    expect(profile.bio.length).toBeGreaterThan(0);
  });

  it("has at least one skill group with items", () => {
    expect(profile.skills.length).toBeGreaterThan(0);
    for (const group of profile.skills) {
      expect(group.category.length).toBeGreaterThan(0);
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("has at least one experience entry", () => {
    expect(profile.experience.length).toBeGreaterThan(0);
  });

  it("has three languages", () => {
    expect(profile.languages).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/data/__tests__/profile.test.ts`
Expected: FAIL — cannot find module `../profile`.

- [ ] **Step 3: Write lib/data/profile.ts**

```typescript
export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface LanguageProficiency {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  languages: LanguageProficiency[];
}

export const profile: Profile = {
  name: "Yury Bortsov",
  role: "Junior Software Engineer",
  location: "Gdańsk, Poland",
  bio: "Self-taught developer and systems administrator with 2+ years of hands-on experience running production infrastructure. Currently administer a live multi-service platform used by 300+ students, and co-build an AI-powered web application from architecture to deployment. Comfortable across the stack: backend APIs, databases, Linux server administration, and AI/automation tooling. High-school student on the Math–Physics–CS track, driven by a fascination with software engineering, game development, AI, and the startup ecosystem.",
  skills: [
    {
      category: "Languages",
      items: ["Python", "SQL", "Bash", "JavaScript"],
    },
    {
      category: "Backend & Data",
      items: ["FastAPI", "Nest.js", "PostgreSQL", "MariaDB"],
    },
    {
      category: "AI / Automation",
      items: ["LLM integration", "Ollama", "n8n", "Prompt engineering", "RAG (learning)"],
    },
    {
      category: "Systems & DevOps",
      items: ["Linux (Debian)", "Docker", "Git / GitLab CI", "NAS / self-hosting", "Windows"],
    },
    {
      category: "Tools",
      items: ["VS Code", "MS Office"],
    },
  ],
  experience: [
    {
      title: "Event Organizer & Tech Support",
      organization: "V Liceum Ogólnokształcące, Gdańsk",
      period: "May 2025 — Present",
      description: "Co-organizes school events, managing logistical and technical aspects. Provides technical support and operates audiovisual equipment during live presentations.",
    },
    {
      title: "Video Content Creator & Streamer",
      organization: "YouTube & Twitch (Self-employed)",
      period: "November 2024 — Present",
      description: "Produces, edits, and publishes video content focused on the gaming industry. Hosts live broadcasts, interacts with viewers in real-time, and builds and moderates online communities.",
    },
  ],
  languages: [
    { name: "Russian", level: "Native" },
    { name: "Polish", level: "Fluent" },
    { name: "English", level: "B2" },
  ],
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run lib/data/__tests__/profile.test.ts`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/data/profile.ts lib/data/__tests__/profile.test.ts
git commit -m "Add profile data layer"
```

---

## Task 4: Projects data layer

**Files:**
- Create: `lib/data/projects.ts`
- Test: `lib/data/__tests__/projects.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, expect, it } from "vitest";
import { majorProjects, otherProjects } from "../projects";

describe("projects data", () => {
  it("has exactly three major projects", () => {
    expect(majorProjects).toHaveLength(3);
  });

  it("gives every major project a unique slug, name, role, period, description, and stack", () => {
    const slugs = new Set<string>();
    for (const project of majorProjects) {
      expect(project.slug.length).toBeGreaterThan(0);
      expect(slugs.has(project.slug)).toBe(false);
      slugs.add(project.slug);
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.role.length).toBeGreaterThan(0);
      expect(project.period.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it("includes the Tryton project with a link", () => {
    const tryton = majorProjects.find((project) => project.slug === "tryton");
    expect(tryton).toBeDefined();
    expect(tryton?.link).toBe("https://users.tryton.vlo.gda.pl/s322/");
  });

  it("has exactly three other projects", () => {
    expect(otherProjects).toHaveLength(3);
    for (const project of otherProjects) {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/data/__tests__/projects.test.ts`
Expected: FAIL — cannot find module `../projects`.

- [ ] **Step 3: Write lib/data/projects.ts**

```typescript
export interface Project {
  slug: string;
  name: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
  link?: string;
}

export interface OtherProject {
  name: string;
  description: string;
}

export const majorProjects: Project[] = [
  {
    slug: "tryton",
    name: "Tryton — School Hosting Platform",
    role: "Lead Developer & System Administrator",
    period: "2023 — Present",
    description: "Designed, built, and operate a production web platform serving 300+ students, running on a self-managed Debian 12 server. Led a security hardening initiative: isolated the Docker socket via a proxy, migrated all containers to run as non-root users, and performed a full production data migration. Built a Discord bot integration, an in-platform economy/cosmetics system, and public user profiles with custom-generated avatars.",
    stack: ["Python", "FastAPI", "MariaDB", "Docker", "Linux", "Discord API"],
    link: "https://users.tryton.vlo.gda.pl/s322/",
  },
  {
    slug: "gift-helper",
    name: "gift-helper.com — AI Gift Recommendation Startup",
    role: "Co-Founder & Developer",
    period: "2025 — Present",
    description: "Co-architected a full-stack monorepo (Turborepo, pnpm workspaces) with a Next.js frontend and a Nest.js API. Integrated an LLM-based recommendation engine to generate personalized gift suggestions. Set up GitLab CI/CD pipelines and Git hooks (Husky, lint-staged) to keep code quality consistent across the team.",
    stack: ["Next.js", "Nest.js", "JavaScript", "PostgreSQL", "Turborepo", "GitLab CI/CD"],
  },
  {
    slug: "ai-news-pipeline",
    name: "AI News Pipeline",
    role: "Personal Project",
    period: "2025",
    description: "Built an automated content pipeline using n8n: aggregates multiple RSS feeds, filters and selects articles via a locally-hosted LLM, and auto-publishes formatted news posts to a Telegram channel. Self-hosted an open-source LLM (Ollama) optimized to use native GPU acceleration rather than running in a container.",
    stack: ["n8n", "Ollama", "LLM prompting", "Workflow automation"],
  },
];

export const otherProjects: OtherProject[] = [
  {
    name: "Documentary Filmmaking",
    description: "Wrote, filmed, and edited an independent documentary on IT life at V LO, publicly screened in December 2025.",
  },
  {
    name: "Game Development",
    description: "Building a first-person project in Unreal Engine 5.",
  },
  {
    name: "Home Lab",
    description: "Runs a Synology NAS and a Windows workstation (RTX 4070) alongside a MacBook for local AI inference, self-hosting, and development.",
  },
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run lib/data/__tests__/projects.test.ts`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/data/projects.ts lib/data/__tests__/projects.test.ts
git commit -m "Add projects data layer"
```

---

## Task 5: Contact data layer

**Files:**
- Create: `lib/data/contact.ts`
- Test: `lib/data/__tests__/contact.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, expect, it } from "vitest";
import { contactLinks } from "../contact";

describe("contact data", () => {
  it("has exactly five contact links", () => {
    expect(contactLinks).toHaveLength(5);
  });

  it("includes a mailto email link", () => {
    const email = contactLinks.find((link) => link.label === "Email");
    expect(email?.href).toBe("mailto:lagepik@gmail.com");
    expect(email?.external).toBe(false);
  });

  it("includes GitHub, LinkedIn, YouTube, and Twitch as external links", () => {
    for (const label of ["GitHub", "LinkedIn", "YouTube", "Twitch"]) {
      const link = contactLinks.find((entry) => entry.label === label);
      expect(link).toBeDefined();
      expect(link?.external).toBe(true);
      expect(link?.href.startsWith("https://")).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/data/__tests__/contact.test.ts`
Expected: FAIL — cannot find module `../contact`.

- [ ] **Step 3: Write lib/data/contact.ts**

```typescript
export interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:lagepik@gmail.com", external: false },
  { label: "GitHub", href: "https://github.com/nolik192", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yury-bortsov", external: true },
  { label: "YouTube", href: "https://www.youtube.com/@nolik194", external: true },
  { label: "Twitch", href: "https://www.twitch.tv/nolik192", external: true },
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run lib/data/__tests__/contact.test.ts`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/data/contact.ts lib/data/__tests__/contact.test.ts
git commit -m "Add contact data layer"
```

---

## Task 6: Design tokens — Oxocarbon theme and fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add the Oxocarbon theme to app/globals.css**

Replace the full contents of `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-background: #161616;
  --color-surface: #262626;
  --color-border: #393939;
  --color-muted: #525252;
  --color-foreground: #f2f4f8;
  --color-foreground-dim: #dde1e6;
  --color-accent: #ee5396;
  --color-accent-secondary: #08bdba;

  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
  --font-sans: var(--font-ibm-plex-sans), ui-sans-serif, sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Load fonts and apply the theme in app/layout.tsx**

Replace the full contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "Yury Bortsov",
  description: "Junior Software Engineer — backend, self-hosted infra, AI/automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body className="bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: build completes successfully.

- [ ] **Step 4: Manually verify the theme renders**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: near-black background (`#161616`), light text, "Portfolio coming soon." rendered in a monospace-adjacent sans font. Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "Add Oxocarbon design tokens and fonts"
```

---

## Task 7: TerminalPrompt and Nav components

**Files:**
- Create: `components/TerminalPrompt.tsx`
- Create: `components/Nav.tsx`
- Test: `components/__tests__/TerminalPrompt.test.tsx`
- Test: `components/__tests__/Nav.test.tsx`

- [ ] **Step 1: Write the failing TerminalPrompt test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TerminalPrompt } from "../TerminalPrompt";

describe("TerminalPrompt", () => {
  it("renders the given command text", () => {
    render(<TerminalPrompt command="cat about.md" />);
    expect(screen.getByText("cat about.md")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/__tests__/TerminalPrompt.test.tsx`
Expected: FAIL — cannot find module `../TerminalPrompt`.

- [ ] **Step 3: Write components/TerminalPrompt.tsx**

```tsx
export function TerminalPrompt({ command }: { command: string }) {
  return (
    <p className="font-mono text-sm text-accent-secondary mb-4">
      <span aria-hidden="true">$ </span>
      {command}
    </p>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/__tests__/TerminalPrompt.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Write the failing Nav test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "../Nav";

describe("Nav", () => {
  it("links to all five pages", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "about" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "contact" })).toHaveAttribute("href", "/contact");
  });
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run components/__tests__/Nav.test.tsx`
Expected: FAIL — cannot find module `../Nav`.

- [ ] **Step 7: Write components/Nav.tsx**

```tsx
import Link from "next/link";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="border-b border-border">
      <nav className="max-w-4xl mx-auto flex flex-wrap items-center gap-6 px-6 py-4 font-mono text-sm">
        <span className="text-accent-secondary">~/yury-bortsov $ ls</span>
        <ul className="flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-foreground hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 8: Run it to verify it passes**

Run: `npx vitest run components/__tests__/Nav.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 9: Commit**

```bash
git add components/TerminalPrompt.tsx components/Nav.tsx components/__tests__/TerminalPrompt.test.tsx components/__tests__/Nav.test.tsx
git commit -m "Add TerminalPrompt and Nav components"
```

---

## Task 8: Footer component and root layout wiring

**Files:**
- Create: `components/Footer.tsx`
- Test: `components/__tests__/Footer.test.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders all five contact links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", "mailto:lagepik@gmail.com");
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/nolik192");
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", "https://www.linkedin.com/in/yury-bortsov");
    expect(screen.getByRole("link", { name: /youtube/i })).toHaveAttribute("href", "https://www.youtube.com/@nolik194");
    expect(screen.getByRole("link", { name: /twitch/i })).toHaveAttribute("href", "https://www.twitch.tv/nolik192");
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/__tests__/Footer.test.tsx`
Expected: FAIL — cannot find module `../Footer`.

- [ ] **Step 3: Write components/Footer.tsx**

```tsx
import { contactLinks } from "@/lib/data/contact";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 font-mono text-sm">
        <ul className="flex flex-wrap gap-6">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-foreground-dim hover:text-accent transition-colors duration-200"
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-muted">&copy; {new Date().getFullYear()} Yury Bortsov</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/__tests__/Footer.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Wire Nav and Footer into the root layout**

Replace the full contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "Yury Bortsov",
  description: "Junior Software Engineer — backend, self-hosted infra, AI/automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify the build succeeds**

Run: `npm run build`
Expected: build completes successfully.

- [ ] **Step 7: Commit**

```bash
git add components/Footer.tsx components/__tests__/Footer.test.tsx app/layout.tsx
git commit -m "Add Footer and wire Nav/Footer into root layout"
```

---

## Task 9: Hero component

**Files:**
- Create: `components/Hero.tsx`
- Test: `components/__tests__/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "../Hero";
import { profile } from "@/lib/data/profile";

describe("Hero", () => {
  it("renders the profile name and role", () => {
    render(<Hero profile={profile} />);
    expect(screen.getByRole("heading", { name: /yury bortsov/i })).toBeInTheDocument();
    expect(screen.getByText(profile.role)).toBeInTheDocument();
  });

  it("links to /projects and /blog", () => {
    render(<Hero profile={profile} />);
    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: /read the blog/i })).toHaveAttribute("href", "/blog");
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/__tests__/Hero.test.tsx`
Expected: FAIL — cannot find module `../Hero`.

- [ ] **Step 3: Write components/Hero.tsx**

```tsx
import Link from "next/link";
import { TerminalPrompt } from "./TerminalPrompt";
import type { Profile } from "@/lib/data/profile";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 font-mono">
      <TerminalPrompt command="whoami" />
      <h1 className="text-4xl font-bold text-foreground mb-2">
        {profile.name}
        <span className="text-accent" aria-hidden="true">
          _
        </span>
      </h1>
      <p className="text-lg text-foreground-dim mb-1">{profile.role}</p>
      <p className="text-sm text-muted mb-8">{profile.location}</p>
      <div className="bg-surface border border-border rounded-md p-4 text-sm text-foreground-dim mb-8">
        <p>
          <span className="text-accent-secondary">$</span> cat status.txt
        </p>
        <p className="mt-1 text-foreground">{profile.bio}</p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="bg-accent text-background px-5 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition-opacity duration-200"
        >
          View Projects &rarr;
        </Link>
        <Link
          href="/blog"
          className="border border-border text-foreground px-5 py-2.5 rounded-md text-sm hover:border-accent transition-colors duration-200"
        >
          Read the Blog
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/__tests__/Hero.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/__tests__/Hero.test.tsx
git commit -m "Add Hero component"
```

---

## Task 10: Homepage (hero only)

**Files:**
- Modify: `app/page.tsx`
- Test: `app/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "../page";

describe("HomePage", () => {
  it("renders the hero", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /yury bortsov/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/__tests__/page.test.tsx`
Expected: FAIL — "Portfolio coming soon." renders instead; no heading found.

- [ ] **Step 3: Replace app/page.tsx**

```tsx
import { Hero } from "@/components/Hero";
import { profile } from "@/lib/data/profile";

export default function HomePage() {
  return <Hero profile={profile} />;
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run app/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/__tests__/page.test.tsx
git commit -m "Render Hero on the homepage"
```

---

## Task 11: ProjectCard and OtherProjectCard components

**Files:**
- Create: `components/ProjectCard.tsx`
- Create: `components/OtherProjectCard.tsx`
- Test: `components/__tests__/ProjectCard.test.tsx`
- Test: `components/__tests__/OtherProjectCard.test.tsx`

- [ ] **Step 1: Write the failing ProjectCard test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "../ProjectCard";
import { majorProjects } from "@/lib/data/projects";

describe("ProjectCard", () => {
  it("renders the project name, role, description, and stack", () => {
    const project = majorProjects[0];
    render(<ProjectCard project={project} />);
    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(project.role)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    for (const tech of project.stack) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it("renders a link when the project has one", () => {
    const project = majorProjects[0];
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", project.link);
  });

  it("renders no link when the project has none", () => {
    const project = majorProjects[1];
    render(<ProjectCard project={project} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/__tests__/ProjectCard.test.tsx`
Expected: FAIL — cannot find module `../ProjectCard`.

- [ ] **Step 3: Write components/ProjectCard.tsx**

```tsx
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-surface border border-border rounded-md p-6">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="text-lg font-bold text-foreground font-mono">{project.name}</h3>
        <span className="text-xs text-muted font-mono whitespace-nowrap">{project.period}</span>
      </div>
      <p className="text-sm text-accent-secondary font-mono mb-3">{project.role}</p>
      <p className="text-sm text-foreground-dim mb-4">{project.description}</p>
      <ul className="flex flex-wrap gap-2 mb-4">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="text-xs font-mono text-foreground-dim border border-border rounded px-2 py-1"
          >
            {tech}
          </li>
        ))}
      </ul>
      {project.link && (
        <a
          href={project.link}
          className="text-sm text-accent hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {project.link.replace(/^https?:\/\//, "")} &rarr;
        </a>
      )}
    </article>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/__tests__/ProjectCard.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Write the failing OtherProjectCard test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OtherProjectCard } from "../OtherProjectCard";
import { otherProjects } from "@/lib/data/projects";

describe("OtherProjectCard", () => {
  it("renders the project name and description", () => {
    const project = otherProjects[0];
    render(<OtherProjectCard project={project} />);
    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run components/__tests__/OtherProjectCard.test.tsx`
Expected: FAIL — cannot find module `../OtherProjectCard`.

- [ ] **Step 7: Write components/OtherProjectCard.tsx**

```tsx
import type { OtherProject } from "@/lib/data/projects";

export function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <article className="border border-border rounded-md p-4">
      <h4 className="text-sm font-bold text-foreground font-mono mb-1">{project.name}</h4>
      <p className="text-sm text-foreground-dim">{project.description}</p>
    </article>
  );
}
```

- [ ] **Step 8: Run it to verify it passes**

Run: `npx vitest run components/__tests__/OtherProjectCard.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 9: Commit**

```bash
git add components/ProjectCard.tsx components/OtherProjectCard.tsx components/__tests__/ProjectCard.test.tsx components/__tests__/OtherProjectCard.test.tsx
git commit -m "Add ProjectCard and OtherProjectCard components"
```

---

## Task 12: /projects page

**Files:**
- Create: `app/projects/page.tsx`
- Test: `app/projects/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "../page";
import { majorProjects, otherProjects } from "@/lib/data/projects";

describe("ProjectsPage", () => {
  it("renders all major and other projects", () => {
    render(<ProjectsPage />);
    for (const project of majorProjects) {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    }
    for (const project of otherProjects) {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/projects/__tests__/page.test.tsx`
Expected: FAIL — cannot find module `../page`.

- [ ] **Step 3: Write app/projects/page.tsx**

```tsx
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { ProjectCard } from "@/components/ProjectCard";
import { OtherProjectCard } from "@/components/OtherProjectCard";
import { majorProjects, otherProjects } from "@/lib/data/projects";

export default function ProjectsPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <TerminalPrompt command="ls projects/" />
      <h1 className="text-3xl font-bold text-foreground font-mono mb-8">Projects</h1>
      <div className="grid gap-6 mb-12">
        {majorProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <h2 className="text-xl font-bold text-foreground font-mono mb-4">Other Projects</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {otherProjects.map((project) => (
          <OtherProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run app/projects/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add app/projects/page.tsx app/projects/__tests__/page.test.tsx
git commit -m "Add /projects page"
```

---

## Task 13: /about page

**Files:**
- Create: `app/about/page.tsx`
- Test: `app/about/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "../page";
import { profile } from "@/lib/data/profile";

describe("AboutPage", () => {
  it("renders the bio, skill categories, experience, and languages", () => {
    render(<AboutPage />);
    expect(screen.getByText(profile.bio)).toBeInTheDocument();
    for (const group of profile.skills) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
    }
    for (const entry of profile.experience) {
      expect(screen.getByText(new RegExp(entry.title))).toBeInTheDocument();
    }
    expect(screen.getByText(/Russian \(Native\)/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/about/__tests__/page.test.tsx`
Expected: FAIL — cannot find module `../page`.

- [ ] **Step 3: Write app/about/page.tsx**

```tsx
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { profile } from "@/lib/data/profile";

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 font-sans">
      <TerminalPrompt command="cat about.md" />
      <h1 className="text-3xl font-bold text-foreground font-mono mb-6">About</h1>
      <p className="text-foreground-dim leading-relaxed mb-10">{profile.bio}</p>

      <h2 className="text-lg font-bold text-foreground font-mono mb-4">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {profile.skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-bold text-accent-secondary font-mono mb-2">{group.category}</h3>
            <p className="text-sm text-foreground-dim">{group.items.join(", ")}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-foreground font-mono mb-4">Other Experience</h2>
      <ul className="space-y-4 mb-10">
        {profile.experience.map((entry) => (
          <li key={entry.title}>
            <p className="text-sm font-bold text-foreground">
              {entry.title} &mdash; {entry.organization}
            </p>
            <p className="text-xs text-muted font-mono mb-1">{entry.period}</p>
            <p className="text-sm text-foreground-dim">{entry.description}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold text-foreground font-mono mb-4">Languages</h2>
      <p className="text-sm text-foreground-dim">
        {profile.languages.map((lang) => `${lang.name} (${lang.level})`).join(" · ")}
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run app/about/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx app/about/__tests__/page.test.tsx
git commit -m "Add /about page"
```

---

## Task 14: /contact page

**Files:**
- Create: `app/contact/page.tsx`
- Test: `app/contact/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "../page";
import { contactLinks } from "@/lib/data/contact";

describe("ContactPage", () => {
  it("renders all contact links", () => {
    render(<ContactPage />);
    for (const link of contactLinks) {
      expect(screen.getByRole("link", { name: new RegExp(link.label, "i") })).toHaveAttribute(
        "href",
        link.href
      );
    }
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/contact/__tests__/page.test.tsx`
Expected: FAIL — cannot find module `../page`.

- [ ] **Step 3: Write app/contact/page.tsx**

```tsx
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { contactLinks } from "@/lib/data/contact";

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <TerminalPrompt command="cat contact.txt" />
      <h1 className="text-3xl font-bold text-foreground font-mono mb-8">Contact</h1>
      <ul className="space-y-3 font-mono">
        {contactLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-foreground-dim hover:text-accent transition-colors duration-200"
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="text-accent-secondary">{link.label}:</span>{" "}
              {link.href.replace("mailto:", "")}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run app/contact/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add app/contact/page.tsx app/contact/__tests__/page.test.tsx
git commit -m "Add /contact page"
```

---

## Task 15: Custom 404 page

**Files:**
- Create: `app/not-found.tsx`
- Test: `app/__tests__/not-found.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "../not-found";

describe("NotFound", () => {
  it("renders a 404 message and a link home", () => {
    render(<NotFound />);
    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cd ~/i })).toHaveAttribute("href", "/");
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/__tests__/not-found.test.tsx`
Expected: FAIL — cannot find module `../not-found`.

- [ ] **Step 3: Write app/not-found.tsx**

```tsx
import Link from "next/link";
import { TerminalPrompt } from "@/components/TerminalPrompt";

export default function NotFound() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 font-mono text-center">
      <TerminalPrompt command="cd /nonexistent-page" />
      <p className="text-accent mb-2">bash: cd: /nonexistent-page: No such file or directory</p>
      <h1 className="text-2xl font-bold text-foreground mb-6">404 — Page Not Found</h1>
      <Link href="/" className="text-accent-secondary hover:underline">
        cd ~
      </Link>
    </section>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run app/__tests__/not-found.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add app/not-found.tsx app/__tests__/not-found.test.tsx
git commit -m "Add custom 404 page"
```

---

## Task 16: Sanity client and queries with error handling

**Files:**
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/queries.ts`
- Test: `lib/sanity/__tests__/queries.test.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Install the Sanity client**

Run: `npm install @sanity/client`
Expected: `@sanity/client` added to `dependencies`.

- [ ] **Step 2: Write lib/sanity/client.ts**

```typescript
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-01-01",
  useCdn: true,
});
```

- [ ] **Step 3: Write the failing queries test**

```typescript
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../client", () => ({
  sanityClient: { fetch: vi.fn() },
}));

import { sanityClient } from "../client";
import { getAllPosts, getLatestPosts, getPostBySlug } from "../queries";

describe("sanity queries", () => {
  beforeEach(() => {
    vi.mocked(sanityClient.fetch).mockReset();
  });

  it("returns posts from getLatestPosts", async () => {
    vi.mocked(sanityClient.fetch).mockResolvedValueOnce([
      { title: "A", slug: "a", excerpt: "e", publishedAt: "2026-01-01" },
    ]);
    const posts = await getLatestPosts(3);
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("A");
  });

  it("returns an empty array when getLatestPosts fetch fails", async () => {
    vi.mocked(sanityClient.fetch).mockRejectedValueOnce(new Error("network error"));
    const posts = await getLatestPosts(3);
    expect(posts).toEqual([]);
  });

  it("returns posts from getAllPosts", async () => {
    vi.mocked(sanityClient.fetch).mockResolvedValueOnce([
      { title: "A", slug: "a", excerpt: "e", publishedAt: "2026-01-01" },
      { title: "B", slug: "b", excerpt: "e", publishedAt: "2026-01-02" },
    ]);
    const posts = await getAllPosts();
    expect(posts).toHaveLength(2);
  });

  it("returns an empty array when getAllPosts fetch fails", async () => {
    vi.mocked(sanityClient.fetch).mockRejectedValueOnce(new Error("network error"));
    const posts = await getAllPosts();
    expect(posts).toEqual([]);
  });

  it("returns a post from getPostBySlug", async () => {
    vi.mocked(sanityClient.fetch).mockResolvedValueOnce({
      title: "A",
      slug: "a",
      excerpt: "e",
      publishedAt: "2026-01-01",
      body: [],
    });
    const post = await getPostBySlug("a");
    expect(post?.title).toBe("A");
  });

  it("returns null when getPostBySlug fetch fails", async () => {
    vi.mocked(sanityClient.fetch).mockRejectedValueOnce(new Error("network error"));
    const post = await getPostBySlug("missing");
    expect(post).toBeNull();
  });

  it("returns null when getPostBySlug finds nothing", async () => {
    vi.mocked(sanityClient.fetch).mockResolvedValueOnce(null);
    const post = await getPostBySlug("missing");
    expect(post).toBeNull();
  });
});
```

- [ ] **Step 4: Run it to verify it fails**

Run: `npx vitest run lib/sanity/__tests__/queries.test.ts`
Expected: FAIL — cannot find module `../queries`.

- [ ] **Step 5: Write lib/sanity/queries.ts**

```typescript
import { sanityClient } from "./client";

export interface PostPreview {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
}

export interface Post extends PostPreview {
  body: unknown;
}

const PREVIEW_PROJECTION = `{
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, pt::text(body)[0...160]),
  publishedAt,
  "coverImage": coverImage.asset->url
}`;

export async function getLatestPosts(limit: number): Promise<PostPreview[]> {
  try {
    const posts = await sanityClient.fetch<PostPreview[]>(
      `*[_type == "post"] | order(publishedAt desc)[0...$limit]${PREVIEW_PROJECTION}`,
      { limit }
    );
    return posts ?? [];
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<PostPreview[]> {
  try {
    const posts = await sanityClient.fetch<PostPreview[]>(
      `*[_type == "post"] | order(publishedAt desc)${PREVIEW_PROJECTION}`
    );
    return posts ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await sanityClient.fetch<Post | null>(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, pt::text(body)[0...160]),
        publishedAt,
        "coverImage": coverImage.asset->url,
        body
      }`,
      { slug }
    );
    return post ?? null;
  } catch {
    return null;
  }
}
```

- [ ] **Step 6: Run it to verify it passes**

Run: `npx vitest run lib/sanity/__tests__/queries.test.ts`
Expected: PASS — 7 tests passed.

- [ ] **Step 7: Add the Sanity image CDN to next.config.ts**

Replace the full contents of `next.config.ts` with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json lib/sanity/client.ts lib/sanity/queries.ts lib/sanity/__tests__/queries.test.ts next.config.ts
git commit -m "Add Sanity client and queries with error fallback"
```

---

## Task 17: Sanity Studio scaffold

**Files:**
- Create: `studio/schemaTypes/post.ts`
- Create: `studio/schemaTypes/index.ts`
- Create: `studio/sanity.config.ts`
- Modify: `.gitignore`

This task sets up the separate Sanity Studio project used to author blog posts. Its backend and hosting are entirely on Sanity's cloud — it never runs on the Raspberry Pi.

- [ ] **Step 1: Scaffold the studio directory**

Run: `mkdir -p studio/schemaTypes`

- [ ] **Step 2: Initialize the studio package**

Run: `cd studio && npm init -y && cd ..`
Expected: `studio/package.json` created.

- [ ] **Step 3: Install Sanity Studio dependencies**

Run: `cd studio && npm install sanity react react-dom && npm install -D typescript && cd ..`
Expected: `sanity`, `react`, `react-dom` added to `studio/package.json` dependencies; `typescript` added to devDependencies.

- [ ] **Step 4: Add studio scripts**

Edit `studio/package.json`, replace the generated `"scripts"` block with:

```json
"scripts": {
  "dev": "sanity dev",
  "build": "sanity build",
  "deploy": "sanity deploy"
}
```

- [ ] **Step 5: Write studio/schemaTypes/post.ts**

```typescript
import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
```

- [ ] **Step 6: Write studio/schemaTypes/index.ts**

```typescript
import { postType } from "./post";

export const schemaTypes = [postType];
```

- [ ] **Step 7: Write studio/sanity.config.ts**

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Yury Bortsov Portfolio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
```

- [ ] **Step 8: Update .gitignore for the studio sub-project**

Replace the full contents of `.gitignore` with:

```
.superpowers/
node_modules/
.next/
studio/dist/
.env*
```

- [ ] **Step 9: Create a Sanity project (manual, one-time)**

This step requires a free Sanity.io account and cannot be scripted.

Run: `cd studio && npx sanity login` and follow the browser prompt to authenticate.
Run: `npx sanity init --project-plan free --dataset production` and follow the prompts to create a new Sanity project. When it asks to use the existing config, confirm; when it asks about TypeScript, confirm yes.
Expected: a new Sanity project ID printed in the terminal.

- [ ] **Step 10: Set environment variables**

Create `studio/.env` (gitignored) with:

```
SANITY_STUDIO_PROJECT_ID=<the project ID from Step 9>
SANITY_STUDIO_DATASET=production
```

Create `.env.local` at the repo root (gitignored) with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<the same project ID>
NEXT_PUBLIC_SANITY_DATASET=production
```

- [ ] **Step 11: Verify the Studio runs**

Run: `cd studio && npm run dev`
Expected: Studio available at `http://localhost:3333`, showing a "Post" document type in the sidebar with no errors. Stop it (Ctrl+C) once confirmed, then `cd ..`.

- [ ] **Step 12: Commit**

```bash
git add studio/package.json studio/package-lock.json studio/schemaTypes/ studio/sanity.config.ts .gitignore
git commit -m "Add Sanity Studio for blog content management"
```

---

## Task 18: BlogPostPreview and BlogPostList components

**Files:**
- Create: `components/BlogPostPreview.tsx`
- Create: `components/BlogPostList.tsx`
- Test: `components/__tests__/BlogPostPreview.test.tsx`
- Test: `components/__tests__/BlogPostList.test.tsx`

- [ ] **Step 1: Write the failing BlogPostPreview test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogPostPreview } from "../BlogPostPreview";
import type { PostPreview } from "@/lib/sanity/queries";

const post: PostPreview = {
  title: "Building a Discord bot for Tryton",
  slug: "building-a-discord-bot-for-tryton",
  excerpt: "How I integrated a Discord bot into a school platform.",
  publishedAt: "2026-03-15T10:00:00.000Z",
};

describe("BlogPostPreview", () => {
  it("renders the title, date, and excerpt, linking to the post", () => {
    render(<BlogPostPreview post={post} />);
    const link = screen.getByRole("link", { name: post.title });
    expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
    expect(screen.getByText(/15 March 2026/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/__tests__/BlogPostPreview.test.tsx`
Expected: FAIL — cannot find module `../BlogPostPreview`.

- [ ] **Step 3: Write components/BlogPostPreview.tsx**

```tsx
import Link from "next/link";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostPreview({ post }: { post: PostPreview }) {
  return (
    <article className="border border-border rounded-md p-5">
      <Link
        href={`/blog/${post.slug}`}
        className="text-lg font-bold text-foreground font-mono hover:text-accent transition-colors duration-200"
      >
        {post.title}
      </Link>
      <p className="text-xs text-muted font-mono mt-1 mb-2">
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="text-sm text-foreground-dim">{post.excerpt}</p>
    </article>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/__tests__/BlogPostPreview.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Write the failing BlogPostList test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogPostList } from "../BlogPostList";
import type { PostPreview } from "@/lib/sanity/queries";

const posts: PostPreview[] = [
  { title: "Post One", slug: "post-one", excerpt: "Excerpt one", publishedAt: "2026-01-01T00:00:00.000Z" },
  { title: "Post Two", slug: "post-two", excerpt: "Excerpt two", publishedAt: "2026-01-02T00:00:00.000Z" },
];

describe("BlogPostList", () => {
  it("renders every post", () => {
    render(<BlogPostList posts={posts} emptyMessage="No posts yet." />);
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  it("renders the empty message when there are no posts", () => {
    render(<BlogPostList posts={[]} emptyMessage="No posts yet." />);
    expect(screen.getByText("No posts yet.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run components/__tests__/BlogPostList.test.tsx`
Expected: FAIL — cannot find module `../BlogPostList`.

- [ ] **Step 7: Write components/BlogPostList.tsx**

```tsx
import { BlogPostPreview } from "./BlogPostPreview";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostList({
  posts,
  emptyMessage,
}: {
  posts: PostPreview[];
  emptyMessage: string;
}) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted font-mono">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <BlogPostPreview post={post} />
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 8: Run it to verify it passes**

Run: `npx vitest run components/__tests__/BlogPostList.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 9: Commit**

```bash
git add components/BlogPostPreview.tsx components/BlogPostList.tsx components/__tests__/BlogPostPreview.test.tsx components/__tests__/BlogPostList.test.tsx
git commit -m "Add BlogPostPreview and BlogPostList components"
```

---

## Task 19: Homepage blog integration

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace the full contents of `app/__tests__/page.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/sanity/queries", () => ({
  getLatestPosts: vi.fn().mockResolvedValue([
    { title: "Post One", slug: "post-one", excerpt: "Excerpt one", publishedAt: "2026-01-01T00:00:00.000Z" },
  ]),
}));

import HomePage from "../page";

describe("HomePage", () => {
  it("renders the hero and the latest blog posts", async () => {
    render(await HomePage());
    expect(screen.getByRole("heading", { name: /yury bortsov/i })).toBeInTheDocument();
    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view all posts/i })).toHaveAttribute("href", "/blog");
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/__tests__/page.test.tsx`
Expected: FAIL — "Post One" not found, `HomePage` is not async yet.

- [ ] **Step 3: Replace app/page.tsx**

```tsx
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { BlogPostList } from "@/components/BlogPostList";
import { profile } from "@/lib/data/profile";
import { getLatestPosts } from "@/lib/sanity/queries";

export const revalidate = 3600;

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      <Hero profile={profile} />
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <TerminalPrompt command="tail -n 3 blog/*.md" />
        <h2 className="text-xl font-bold text-foreground font-mono mb-6">Latest from the blog</h2>
        <BlogPostList posts={latestPosts} emptyMessage="No posts yet — check back soon." />
        <Link
          href="/blog"
          className="inline-block mt-6 text-sm text-accent hover:underline font-mono"
        >
          View all posts &rarr;
        </Link>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run app/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/__tests__/page.test.tsx
git commit -m "Show latest blog posts on the homepage"
```

---

## Task 20: /blog page — list and pagination

**Files:**
- Create: `app/blog/page.tsx`
- Test: `app/blog/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const allPosts = Array.from({ length: 12 }, (_, index) => ({
  title: `Post ${index + 1}`,
  slug: `post-${index + 1}`,
  excerpt: `Excerpt ${index + 1}`,
  publishedAt: `2026-01-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
}));

vi.mock("@/lib/sanity/queries", () => ({
  getAllPosts: vi.fn().mockResolvedValue(allPosts),
}));

import BlogPage from "../page";

describe("BlogPage", () => {
  it("renders the first 10 posts and an Older link on page 1", async () => {
    render(await BlogPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 10")).toBeInTheDocument();
    expect(screen.queryByText("Post 11")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /older/i })).toHaveAttribute("href", "/blog?page=2");
    expect(screen.queryByRole("link", { name: /newer/i })).not.toBeInTheDocument();
  });

  it("renders the remaining posts and a Newer link on page 2", async () => {
    render(await BlogPage({ searchParams: Promise.resolve({ page: "2" }) }));
    expect(screen.getByText("Post 11")).toBeInTheDocument();
    expect(screen.getByText("Post 12")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /newer/i })).toHaveAttribute("href", "/blog?page=1");
    expect(screen.queryByRole("link", { name: /older/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/blog/__tests__/page.test.tsx`
Expected: FAIL — cannot find module `../page`.

- [ ] **Step 3: Write app/blog/page.tsx**

```tsx
import Link from "next/link";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { BlogPostList } from "@/components/BlogPostList";
import { getAllPosts } from "@/lib/sanity/queries";

export const revalidate = 3600;

const PAGE_SIZE = 10;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const posts = await getAllPosts();
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = posts.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <TerminalPrompt command="ls blog/" />
      <h1 className="text-3xl font-bold text-foreground font-mono mb-8">Blog</h1>
      <BlogPostList posts={pagePosts} emptyMessage="No posts yet — check back soon." />
      {totalPages > 1 && (
        <nav className="flex gap-4 mt-10 font-mono text-sm" aria-label="Blog pagination">
          {currentPage > 1 && (
            <Link href={`/blog?page=${currentPage - 1}`} className="text-accent hover:underline">
              &larr; Newer
            </Link>
          )}
          <span className="text-muted">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link href={`/blog?page=${currentPage + 1}`} className="text-accent hover:underline">
              Older &rarr;
            </Link>
          )}
        </nav>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run app/blog/__tests__/page.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add app/blog/page.tsx app/blog/__tests__/page.test.tsx
git commit -m "Add /blog page with pagination"
```

---

## Task 21: /blog/[slug] page

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Test: `app/blog/[slug]/__tests__/page.test.tsx`

- [ ] **Step 1: Install portable text rendering**

Run: `npm install @portabletext/react @portabletext/types`
Expected: both packages added to `dependencies`.

- [ ] **Step 2: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const post = {
  title: "Building a Discord bot for Tryton",
  slug: "building-a-discord-bot-for-tryton",
  excerpt: "How I integrated a Discord bot into a school platform.",
  publishedAt: "2026-03-15T10:00:00.000Z",
  body: [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      children: [{ _type: "span", _key: "s1", text: "It started with a simple Discord bot." }],
    },
  ],
};

vi.mock("@/lib/sanity/queries", () => ({
  getPostBySlug: vi.fn(),
  getAllPosts: vi.fn(),
}));

import { getPostBySlug } from "@/lib/sanity/queries";
import BlogPostPage from "../page";

describe("BlogPostPage", () => {
  it("renders the post title, date, and body", async () => {
    vi.mocked(getPostBySlug).mockResolvedValueOnce(post);
    render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));
    expect(screen.getByRole("heading", { name: post.title })).toBeInTheDocument();
    expect(screen.getByText(/15 March 2026/)).toBeInTheDocument();
    expect(screen.getByText("It started with a simple Discord bot.")).toBeInTheDocument();
  });

  it("calls notFound when the post does not exist", async () => {
    vi.mocked(getPostBySlug).mockResolvedValueOnce(null);
    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: "missing" }) })
    ).rejects.toThrow();
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npx vitest run "app/blog/[slug]/__tests__/page.test.tsx"`
Expected: FAIL — cannot find module `../page`.

- [ ] **Step 4: Write app/blog/[slug]/page.tsx**

```tsx
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
      <TerminalPrompt command={`cat blog/${post.slug}.md`} />
      <h1 className="text-3xl font-bold text-foreground font-mono mb-2">{post.title}</h1>
      <p className="text-xs text-muted font-mono mb-8">
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="text-foreground-dim leading-relaxed space-y-4">
        <PortableText value={post.body as never} />
      </div>
    </article>
  );
}
```

- [ ] **Step 5: Run it to verify it passes**

Run: `npx vitest run "app/blog/[slug]/__tests__/page.test.tsx"`
Expected: PASS — 2 tests passed.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json "app/blog/[slug]/page.tsx" "app/blog/[slug]/__tests__/page.test.tsx"
git commit -m "Add /blog/[slug] post page"
```

---

## Task 22: Dockerfile and Docker build verification

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`
- Create: `public/.gitkeep`
- Modify: `next.config.ts`

- [ ] **Step 1: Enable standalone output**

Replace the full contents of `next.config.ts` with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Write .dockerignore**

```
node_modules
.next
.git
.superpowers
docs
studio
*.pdf
.env
.env.local
```

- [ ] **Step 3: Write Dockerfile**

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

- [ ] **Step 4: Add a public directory placeholder**

The Dockerfile copies `/app/public`, which must exist for the `COPY` to succeed.

Run: `mkdir -p public && touch public/.gitkeep`

- [ ] **Step 5: Build the Docker image**

Run: `docker build -t portfolio .`
Expected: build completes successfully through all three stages.

- [ ] **Step 6: Run the container and verify it serves the homepage**

Run: `docker run --rm -d -p 3000:3000 --name portfolio-test -e NEXT_PUBLIC_SANITY_PROJECT_ID= -e NEXT_PUBLIC_SANITY_DATASET=production portfolio`
Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
Expected: `200`
Run: `docker stop portfolio-test`

- [ ] **Step 7: Commit**

```bash
git add Dockerfile .dockerignore next.config.ts public/.gitkeep
git commit -m "Add Docker deployment for the Raspberry Pi"
```

---

## Task 23: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all test files pass, no failures.

- [ ] **Step 2: Run the TypeScript compiler**

Run: `npx tsc --noEmit`
Expected: no type errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: build completes successfully, listing `/`, `/about`, `/projects`, `/blog`, `/blog/[slug]`, `/contact` routes.

- [ ] **Step 4: Confirm the working tree is clean**

Run: `git status`
Expected: nothing to commit, working tree clean.
