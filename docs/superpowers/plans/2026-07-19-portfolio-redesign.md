# Portfolio Swiss-Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the terminal/hacker visual theme (Oxocarbon dark palette, JetBrains Mono, `$ whoami`-style prompts) with a Swiss/International Typographic Style editorial system: light theme, single Archivo typeface, one rust accent color, no code/terminal motifs anywhere.

**Architecture:** Presentation-layer-only redesign. No data layer, Sanity integration, or routing changes — only CSS design tokens, font loading, and component/page markup. `TerminalPrompt` is deleted entirely; every page that used it is rewritten without it.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4 (`@theme` tokens), `next/font/google` (Archivo), Vitest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-07-19-portfolio-redesign-design.md`

---

## Task 1: Design tokens and font

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace the full contents of `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-background: #f7f5f0;
  --color-surface: #ffffff;
  --color-border: #ccc7bc;
  --color-muted: #5c554a;
  --color-foreground: #111111;
  --color-foreground-dim: #3a352c;
  --color-accent: #c1401c;

  --font-sans: var(--font-archivo), ui-sans-serif, sans-serif;
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

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

This removes `--color-accent-secondary`, the old dark values, `--font-mono`, and the `.cursor-blink` keyframes/class (the blinking cursor is deleted in Task 5 along with its usage).

- [ ] **Step 2: Replace the full contents of `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Yury Bortsov",
  description: "Junior Software Engineer — backend, self-hosted infra, AI/automation.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col">
        <MotionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Confirm the existing test suite still passes (nothing visual is asserted, so this should be unaffected)**

Run: `npm test`
Expected: all currently-passing tests still pass (component markup hasn't changed yet, only tokens/fonts).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "Replace Oxocarbon dark theme with Swiss-editorial light palette and Archivo"
```

---

## Task 2: Delete TerminalPrompt

**Files:**
- Delete: `components/TerminalPrompt.tsx`
- Delete: `components/__tests__/TerminalPrompt.test.tsx`

The terminal-prompt motif (`$ whoami`, `$ ls projects/`, etc.) is the component being removed for this whole redesign. Every page currently importing it will be rewritten in later tasks to not import it. Deleting it now means later tasks will show a clear compile error anywhere it's still referenced, which is a useful checklist as you go.

- [ ] **Step 1: Delete both files**

```bash
rm components/TerminalPrompt.tsx components/__tests__/TerminalPrompt.test.tsx
```

- [ ] **Step 2: Confirm the project no longer builds (expected — every page still imports it) and note the error list**

Run: `npx tsc --noEmit`
Expected: FAIL, with "Cannot find module '@/components/TerminalPrompt'" errors in `app/page.tsx`, `app/projects/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/not-found.tsx`, `components/Hero.tsx`. This is expected and will be resolved as each of those files is rewritten in the following tasks.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Delete TerminalPrompt component"
```

---

## Task 3: Nav

**Files:**
- Modify: `components/Nav.tsx`
- Modify: `components/__tests__/Nav.test.tsx`

- [ ] **Step 1: Update the failing test to expect the new labels**

Replace the full contents of `components/__tests__/Nav.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "../Nav";

describe("Nav", () => {
  it("links to all five pages", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Index" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/__tests__/Nav.test.tsx`
Expected: FAIL — current Nav renders lowercase "home" not "Index", or errors if Nav.tsx hasn't changed yet.

- [ ] **Step 3: Replace the full contents of `components/Nav.tsx`**

```tsx
import Link from "next/link";

const links = [
  { href: "/", label: "Index" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="border-b-2 border-foreground">
      <nav className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-6 px-6 py-4 text-sm">
        <Link href="/" className="font-black text-lg tracking-tight text-foreground">
          BORTSOV
        </Link>
        <ul className="flex flex-wrap gap-6 uppercase text-xs tracking-wide font-bold">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block py-3 text-foreground hover:text-accent transition-colors duration-200"
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

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/__tests__/Nav.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx components/__tests__/Nav.test.tsx
git commit -m "Redesign Nav: BORTSOV wordmark, plain labels, no terminal styling"
```

---

## Task 4: Footer

**Files:**
- Modify: `components/Footer.tsx`

No test changes — `Footer.test.tsx` checks the five contact links by regex, which stay unaffected by this restyle.

- [ ] **Step 1: Replace the full contents of `components/Footer.tsx`**

```tsx
import { contactLinks } from "@/lib/data/contact";

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <ul className="flex flex-wrap gap-6">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-block py-3 text-foreground-dim hover:text-accent transition-colors duration-200"
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-muted">
          &copy; {new Date().getFullYear()} Yury Bortsov &middot; LOCHIFY
        </span>
      </div>
    </footer>
  );
}
```

`LOCHIFY` is a plain text placeholder per the spec (§3.1) — swap it for the real logo asset once the owner supplies the SVG/PNG file; not part of this plan.

- [ ] **Step 2: Run the Footer test to confirm it still passes**

Run: `npx vitest run components/__tests__/Footer.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "Restyle Footer for Swiss-editorial palette, add Lochify placeholder"
```

---

## Task 5: Hero

**Files:**
- Modify: `components/Hero.tsx`

No test changes — `Hero.test.tsx` checks the name heading and the two CTA links, both preserved.

- [ ] **Step 1: Replace the full contents of `components/Hero.tsx`**

```tsx
import Link from "next/link";
import { Reveal } from "./Reveal";
import type { Profile } from "@/lib/data/profile";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <Reveal>
        <p className="text-xs uppercase tracking-wide font-bold text-accent mb-4">
          <span>{profile.role}</span>
          <span className="mx-2">&mdash;</span>
          <span>{profile.location}</span>
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight tracking-tight mb-8 max-w-2xl">
          {profile.name}
        </h1>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="border-2 border-foreground text-foreground px-5 py-2.5 text-sm font-bold hover:border-accent hover:text-accent transition-colors duration-200"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2.5 text-sm font-bold text-accent hover:underline"
          >
            Read the Blog
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
```

This removes the `TerminalPrompt` (`$ whoami`), the blinking cursor, and the "cat status.txt" bio box (the bio still displays in full on `/about` — the homepage hero is name + role + location + CTAs only, per the approved mockup). The arrow is dropped from "View Projects" per feedback during brainstorming; "Read the Blog" has no arrow either, matching it.

- [ ] **Step 2: Run the Hero test to confirm it still passes**

Run: `npx vitest run components/__tests__/Hero.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "Redesign Hero: remove terminal prompt and blinking cursor"
```

---

## Task 6: Homepage

**Files:**
- Modify: `app/page.tsx`

No test changes — `app/__tests__/page.test.tsx` checks the hero heading, "Post One" text, and a "view all posts" link, all preserved.

- [ ] **Step 1: Replace the full contents of `app/page.tsx`**

```tsx
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BlogPostList } from "@/components/BlogPostList";
import { profile } from "@/lib/data/profile";
import { getLatestPosts } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      <Hero profile={profile} />
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex items-baseline justify-between border-b-2 border-foreground pb-2 mb-2">
          <h2 className="text-xs uppercase tracking-wide font-bold text-foreground">
            Latest from the Blog
          </h2>
          <Link href="/blog" className="text-xs font-bold text-accent hover:underline">
            View all posts &rarr;
          </Link>
        </div>
        <BlogPostList posts={latestPosts} emptyMessage="No posts yet — check back soon." />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Run the homepage test to confirm it still passes**

Run: `npx vitest run app/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

Note: `npm run build` will still fail at this point — `app/projects/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and `app/not-found.tsx` still import the deleted `TerminalPrompt` and aren't fixed until their own tasks below. A full build is only expected to succeed starting at Task 15.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "Redesign homepage: latest posts section replaces terminal prompt"
```

---

## Task 7: ProjectCard and OtherProjectCard

**Files:**
- Modify: `components/ProjectCard.tsx`
- Modify: `components/OtherProjectCard.tsx`

No test changes — both test files check text content and link presence, unaffected by restyling.

- [ ] **Step 1: Replace the full contents of `components/ProjectCard.tsx`**

```tsx
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-surface border border-border rounded-md p-6 transition-colors duration-200 hover:border-accent/60">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
        <span className="text-xs text-muted whitespace-nowrap">{project.period}</span>
      </div>
      <p className="text-sm text-accent font-bold mb-3">{project.role}</p>
      <p className="text-foreground-dim mb-4">{project.description}</p>
      <ul className="flex flex-wrap gap-2 mb-4">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="text-xs text-foreground-dim border border-border rounded px-2 py-1"
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

- [ ] **Step 2: Replace the full contents of `components/OtherProjectCard.tsx`**

```tsx
import type { OtherProject } from "@/lib/data/projects";

export function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <article className="border border-border rounded-md p-4 transition-colors duration-200 hover:border-accent/60">
      <h4 className="text-sm font-bold text-foreground mb-1">{project.name}</h4>
      <p className="text-sm text-foreground-dim">{project.description}</p>
    </article>
  );
}
```

- [ ] **Step 3: Run both tests to confirm they still pass**

Run: `npx vitest run components/__tests__/ProjectCard.test.tsx components/__tests__/OtherProjectCard.test.tsx`
Expected: PASS — 4 tests passed total.

- [ ] **Step 4: Commit**

```bash
git add components/ProjectCard.tsx components/OtherProjectCard.tsx
git commit -m "Restyle ProjectCard and OtherProjectCard for Swiss-editorial palette"
```

---

## Task 8: Projects page

**Files:**
- Modify: `app/projects/page.tsx`

No test changes — `app/projects/__tests__/page.test.tsx` checks project names render, unaffected.

- [ ] **Step 1: Replace the full contents of `app/projects/page.tsx`**

```tsx
import { ProjectCard } from "@/components/ProjectCard";
import { OtherProjectCard } from "@/components/OtherProjectCard";
import { Reveal } from "@/components/Reveal";
import { majorProjects, otherProjects } from "@/lib/data/projects";

export default function ProjectsPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black text-foreground mb-8">Projects</h1>
      <div className="grid gap-6 mb-12">
        {majorProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
      <h2 className="text-xl font-black text-foreground mb-4">Other Projects</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {otherProjects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08}>
            <OtherProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run the test to confirm it still passes**

Run: `npx vitest run app/projects/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "Remove terminal prompt from /projects page"
```

---

## Task 9: BlogPostPreview and BlogPostList

**Files:**
- Modify: `components/BlogPostPreview.tsx`
- Modify: `components/BlogPostList.tsx`

No test changes — both test files check text/link/date content, unaffected by the structural switch from bordered card to divided row.

- [ ] **Step 1: Replace the full contents of `components/BlogPostPreview.tsx`**

```tsx
import Link from "next/link";
import { SanityImage } from "./SanityImage";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostPreview({ post }: { post: PostPreview }) {
  return (
    <article className="py-6 border-b border-border">
      {post.coverImage && (
        <SanityImage
          value={post.coverImage}
          width={640}
          className="w-full h-auto rounded mb-4 object-cover"
        />
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Link
          href={`/blog/${post.slug}`}
          className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-200"
        >
          {post.title}
        </Link>
        <span className="text-xs text-muted whitespace-nowrap">
          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <p className="text-foreground-dim mt-2">{post.excerpt}</p>
    </article>
  );
}
```

This switches from a bordered card to a divided row (title + date on one line, excerpt below, hairline bottom border) — the pattern used identically on the homepage and `/blog`, per spec §3.1/§3.3.

- [ ] **Step 2: Replace the full contents of `components/BlogPostList.tsx`**

```tsx
import { BlogPostPreview } from "./BlogPostPreview";
import { Reveal } from "./Reveal";
import type { PostPreview } from "@/lib/sanity/queries";

export function BlogPostList({
  posts,
  emptyMessage,
}: {
  posts: PostPreview[];
  emptyMessage: string;
}) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted">{emptyMessage}</p>;
  }

  return (
    <ul>
      {posts.map((post, index) => (
        <li key={post.slug}>
          <Reveal delay={index * 0.08}>
            <BlogPostPreview post={post} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 3: Run both tests to confirm they still pass**

Run: `npx vitest run components/__tests__/BlogPostPreview.test.tsx components/__tests__/BlogPostList.test.tsx`
Expected: PASS — 3 tests passed total.

- [ ] **Step 4: Commit**

```bash
git add components/BlogPostPreview.tsx components/BlogPostList.tsx
git commit -m "Switch BlogPostPreview to divided-row layout"
```

---

## Task 10: Blog list page

**Files:**
- Modify: `app/blog/page.tsx`

No test changes — `app/blog/__tests__/page.test.tsx` checks post text and Newer/Older links, unaffected.

- [ ] **Step 1: Replace the full contents of `app/blog/page.tsx`**

```tsx
import Link from "next/link";
import { BlogPostList } from "@/components/BlogPostList";
import { getAllPosts } from "@/lib/sanity/queries";

export const revalidate = 60;

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
      <h1 className="text-4xl font-black text-foreground mb-8">Blog</h1>
      <BlogPostList posts={pagePosts} emptyMessage="No posts yet — check back soon." />
      {totalPages > 1 && (
        <nav className="flex gap-4 mt-10 text-sm font-bold" aria-label="Blog pagination">
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

- [ ] **Step 2: Run the test to confirm it still passes**

Run: `npx vitest run app/blog/__tests__/page.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "Remove terminal prompt from /blog page"
```

---

## Task 11: Blog post page

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

No test changes — `app/blog/[slug]/__tests__/page.test.tsx` checks the title heading, date, and body text, unaffected.

- [ ] **Step 1: Replace the full contents of `app/blog/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SanityImage } from "@/components/SanityImage";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries";
import type { SanityImageValue } from "@/lib/sanity/queries";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <SanityImage
        value={value as SanityImageValue}
        width={800}
        className="w-full h-auto rounded-md"
      />
    ),
  },
};

export const revalidate = 60;

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
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2">{post.title}</h1>
      <p className="text-xs text-muted mb-8">
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {post.coverImage && (
        <SanityImage
          value={post.coverImage}
          width={768}
          className="w-full h-auto rounded-md mb-8"
          priority
        />
      )}
      <div className="text-foreground-dim leading-relaxed space-y-4">
        <PortableText value={post.body as never} components={portableTextComponents} />
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Run the test to confirm it still passes**

Run: `npx vitest run "app/blog/[slug]/__tests__/page.test.tsx"`
Expected: PASS — 2 tests passed.

- [ ] **Step 3: Commit**

```bash
git add "app/blog/[slug]/page.tsx"
git commit -m "Remove terminal prompt from /blog/[slug] page"
```

---

## Task 12: About page

**Files:**
- Modify: `app/about/page.tsx`

No test changes — `app/about/__tests__/page.test.tsx` checks bio, skill categories, experience titles, and languages text, all unaffected.

- [ ] **Step 1: Replace the full contents of `app/about/page.tsx`**

```tsx
import { profile } from "@/lib/data/profile";

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black text-foreground mb-6">About</h1>
      <p className="text-foreground-dim leading-relaxed mb-10">{profile.bio}</p>

      <h2 className="text-lg font-black text-foreground mb-4">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {profile.skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-bold text-accent mb-2">{group.category}</h3>
            <p className="text-sm text-foreground-dim">{group.items.join(", ")}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-black text-foreground mb-4">Other Experience</h2>
      <ul className="space-y-4 mb-10">
        {profile.experience.map((entry) => (
          <li key={entry.title}>
            <p className="text-sm font-bold text-foreground">
              {entry.title} &mdash; {entry.organization}
            </p>
            <p className="text-xs text-muted mb-1">{entry.period}</p>
            <p className="text-foreground-dim">{entry.description}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-black text-foreground mb-4">Natural Languages</h2>
      <p className="text-sm text-foreground-dim">
        {profile.languages.map((lang) => `${lang.name} (${lang.level})`).join(" · ")}
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Run the test to confirm it still passes**

Run: `npx vitest run app/about/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "Remove terminal prompt from /about page"
```

---

## Task 13: Contact page

**Files:**
- Modify: `app/contact/page.tsx`

No test changes — `app/contact/__tests__/page.test.tsx` checks each contact link by label regex, unaffected.

- [ ] **Step 1: Replace the full contents of `app/contact/page.tsx`**

```tsx
import { contactLinks } from "@/lib/data/contact";

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black text-foreground mb-8">Contact</h1>
      <ul className="space-y-3">
        {contactLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-foreground-dim hover:text-accent transition-colors duration-200"
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="text-accent font-bold">{link.label}:</span>{" "}
              {link.href.replace("mailto:", "")}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Run the test to confirm it still passes**

Run: `npx vitest run app/contact/__tests__/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "Remove terminal prompt from /contact page"
```

---

## Task 14: Custom 404 page

**Files:**
- Modify: `app/not-found.tsx`
- Modify: `app/__tests__/not-found.test.tsx`

This is the last file referencing the deleted `TerminalPrompt`, and its copy (`bash: cd: ... No such file or directory`, `cd ~`) is the last explicit terminal joke in the codebase — full rewrite per spec §3.5.

- [ ] **Step 1: Update the failing test to expect the new link text**

Replace the full contents of `app/__tests__/not-found.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "../not-found";

describe("NotFound", () => {
  it("renders a 404 message and a link home", () => {
    render(<NotFound />);
    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back home/i })).toHaveAttribute("href", "/");
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/__tests__/not-found.test.tsx`
Expected: FAIL — current page has no "back home" link (it says "cd ~"), or a module-not-found error if `TerminalPrompt` is still imported.

- [ ] **Step 3: Replace the full contents of `app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-wide font-bold text-accent mb-4">Error</p>
      <h1 className="text-7xl font-black text-foreground mb-6">404</h1>
      <p className="text-foreground-dim mb-8">This page doesn&rsquo;t exist.</p>
      <Link href="/" className="text-accent font-bold hover:underline">
        &larr; Back home
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
git commit -m "Rewrite 404 page without terminal joke"
```

---

## Task 15: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Recompute WCAG contrast for the new palette (spec §6)**

Run:

```bash
python3 -c "
def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def luminance(rgb):
    def chan(c):
        c = c / 255
        return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055) ** 2.4
    r, g, b = rgb
    return 0.2126*chan(r) + 0.7152*chan(g) + 0.0722*chan(b)

def contrast(hex1, hex2):
    l1 = luminance(hex_to_rgb(hex1))
    l2 = luminance(hex_to_rgb(hex2))
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

bg = '#f7f5f0'
surface = '#ffffff'
tokens = {
    'foreground': '#111111',
    'foreground-dim': '#3a352c',
    'muted': '#5c554a',
    'accent': '#c1401c',
}
for name, hexv in tokens.items():
    print(f'{name}: on background={contrast(hexv, bg):.2f}:1  on surface={contrast(hexv, surface):.2f}:1')
"
```

Expected: every ratio printed is ≥ 4.5:1 (WCAG AA for normal text). All four should already pass comfortably (6.75–18.88:1) since these values were chosen against this exact check during planning — this step is a record/re-confirmation, not expected to surface a new failure.

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: all test files pass, no failures (39 tests, same count as before — this redesign changed 2 test files' assertions but not the total number of tests).

- [ ] **Step 3: Run the TypeScript compiler**

Run: `npx tsc --noEmit`
Expected: no type errors. In particular, confirm there are no remaining references to `TerminalPrompt`, `--color-accent-secondary`, `bg-background`-on-dark assumptions, or `font-mono`/`font-jetbrains-mono`/`font-ibm-plex-sans` anywhere:

```bash
grep -rn "TerminalPrompt\|accent-secondary\|font-mono\|jetbrains\|ibm-plex" app components --include="*.tsx" --include="*.css"
```

Expected: no output (empty).

- [ ] **Step 4: Run the production build**

Run: `npm run build`
Expected: build completes successfully, listing `/`, `/about`, `/projects`, `/blog`, `/blog/[slug]`, `/contact` routes.

- [ ] **Step 5: Start the dev server and manually check every route in the browser**

Run: `npm run dev`, then check each of: `/`, `/projects`, `/about`, `/blog`, `/blog/[slug]` (use the real post slug from Sanity), `/contact`, and a nonexistent path (e.g. `/does-not-exist`) to see the 404 page.
Expected: light off-white background throughout, Archivo typeface, rust accent color, `BORTSOV` wordmark in the nav, no dark backgrounds, no monospace text, no `$`-prompt styling anywhere, no blinking cursor. Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 6: Confirm the working tree is clean**

Run: `git status`
Expected: nothing to commit, working tree clean.
