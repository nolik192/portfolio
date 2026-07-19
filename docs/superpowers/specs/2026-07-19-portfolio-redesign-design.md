# Portfolio Website — Visual Redesign Spec

**Date:** 2026-07-19
**Owner:** Yury Bortsov (lagepik@gmail.com)
**Supersedes:** Section 4 ("Design System") of `docs/superpowers/specs/2026-07-17-portfolio-design.md`. All other sections of that spec (content, architecture, data flow, error handling, testing, deployment) still apply unchanged.

## 1. Purpose

The original terminal/hacker aesthetic (Oxocarbon palette, JetBrains Mono, `$ whoami`-style prompts) is the single most common visual pattern AI coding assistants reach for when building a developer portfolio — the equivalent of the purple-gradient SaaS cliché, but for devs. The owner wants a distinct visual identity that doesn't read as generated.

Direction chosen after reviewing current portfolio-design trends and mocking up three concrete alternatives in the browser: a **Swiss / International Typographic Style** editorial system — light, grid-driven, typography-led, one restrained accent color, no code/terminal motifs anywhere.

## 2. Visual Identity

### 2.1 Color

Single light theme, no dark mode toggle.

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#f7f5f0` | Page background (warm off-white, not pure white) |
| `--color-surface` | `#ffffff` | Card backgrounds (Projects page) — pure white, distinct from the warm page background |
| `--color-foreground` | `#111111` | Primary text |
| `--color-muted` | `#5c554a` | Secondary/meta text (dates, labels) — verify ≥4.5:1 against background before finalizing (see §5) |
| `--color-border` | `#ccc7bc` | Hairline dividers, card borders |
| `--color-border-strong` | `#111111` | Structural rules (nav bottom border, section dividers, footer top border) |
| `--color-accent` | `#c1401c` | The one accent color — eyebrow text, links, hover states, CTA text. Used sparingly per Swiss principle (hierarchy comes from weight/size, not color) |

### 2.2 Typography

**Single family: Archivo** (Google Font), replacing JetBrains Mono + IBM Plex Sans entirely. No monospace font anywhere on the site.

- Display/headlines: Archivo, weight 900 (Black)
- Subheadings/section labels: Archivo, weight 700 (Bold), often uppercase with letter-spacing for small labels
- Body text: Archivo, weight 400–500

Hero headline: ~52px (`text-5xl`-ish), tight line-height (~0.98), max-width constrained so it wraps to 2–3 lines rather than running the full container width.

### 2.3 Layout motifs

- **Wordmark:** `BORTSOV` (uppercase, Archivo Black) replaces the `~/yury-bortsov $ ls` nav branding.
- **Nav:** plain text links (Index, Projects, About, Blog, Contact), no numbering, bottom border in `--color-border-strong`.
- **No numbered index styling** (rejected during mockup review — homepage nav and lists use plain labels, not `01 / 02 / 03`).
- **Section dividers:** thin hairlines (`--color-border`) between rows; structural top/bottom borders in solid black on nav and footer.
- **Buttons:** outlined (`border: 2px solid var(--color-foreground)`) for primary CTA, no fill; secondary CTA is plain accent-colored text. No arrow glyphs on buttons (e.g. "View Projects", not "View Projects →").

## 3. Page-by-Page Changes

### 3.1 Homepage (`/`)

- Nav → Hero → **"Latest from the Blog"** (replaces the original "Selected Work" project list) → Footer.
- Hero: small uppercase eyebrow line in accent color (`Junior Software Engineer — Gdańsk, PL`), headline, two CTA buttons (View Projects / Read the Blog).
- Latest posts section: row-list pattern — title + date on one line, excerpt below, hairline divider between rows, "View all →" link to `/blog` in the section header. No numbering, no cards/borders around each row.
- Footer: contact links (left), copyright + small "LOCHIFY" personal-brand mark folded into the copyright line (bottom-right, quiet attribution — not a second prominent brand). Exact logo asset (SVG/PNG) to be supplied by the owner before implementation; use a text placeholder until then.

### 3.2 Projects (`/projects`)

- **Keeps the existing bordered-card layout** for `ProjectCard` and `OtherProjectCard` (explicitly chosen over switching to the row-list pattern, to keep projects visually distinct/prominent) — just recolored to the new light palette: card background `--color-surface`, border `--color-border`, hover border `--color-accent`.

### 3.3 Blog (`/blog`, `/blog/[slug]`)

- `/blog`: same row-list pattern as the homepage's "Latest from the Blog" (title, date, excerpt, hairline dividers), with the existing Newer/Older pagination restyled to plain accent-colored text links.
- `/blog/[slug]`: title in Archivo Black, meta line (date) in muted color, body text in Archivo 400/500 with existing `leading-relaxed` spacing. Cover image and inline Portable Text images unchanged structurally (still via `SanityImage`/`next/image`), just no longer sitting on a dark surface — add a hairline border or subtle frame consistent with the editorial look if needed.

### 3.4 About (`/about`) and Contact (`/contact`)

- No structural change — same sections (bio, skills, experience, languages / contact link list). Just typography and color follow the new system (Archivo throughout, headers in Black/Bold weight, accent color instead of teal/pink).

### 3.5 404 (`not-found.tsx`)

- **Full rewrite.** The current copy (`$ cd /nonexistent-page`, `bash: cd: ... No such file or directory`) is a terminal joke and must go — it's the last explicit terminal artifact. Replace with a plain editorial treatment: large "404" in Archivo Black, a short line of copy, a text link home (no `cd ~` joke).

## 4. Components Removed

- `TerminalPrompt` component — deleted, along with every usage (`$ whoami`, `$ ls projects/`, `cat about.md`, `cat contact.txt`, `ls blog/`, `cat blog/${slug}.md`, `cd /nonexistent-page`).
- Blinking cursor (`.cursor-blink` CSS animation and its usage in `Hero`).
- Oxocarbon color tokens and both Google Fonts (JetBrains Mono, IBM Plex Sans) — replaced by Archivo.

## 5. Components Kept As-Is (logic unchanged, restyled only)

- `Reveal` / `MotionProvider` scroll animations — kept, just verify they still read as tasteful (not overdone) against the new, calmer visual language. No structural change expected.
- All Sanity integration: `lib/sanity/client.ts`, `queries.ts`, `image.ts`, Studio schema — completely unaffected, this is a presentation-layer-only redesign.
- Data layer (`lib/data/profile.ts`, `projects.ts`, `contact.ts`) — unchanged.
- `ProjectCard`, `OtherProjectCard`, `BlogPostPreview`, `BlogPostList`, `SanityImage` — kept, recolored/retyped in place.
- Accessibility work from the previous pass (44px touch targets, focus-visible outlines, contrast fixes) — carried over; focus ring color changes from teal (`#08bdba`) to the new accent (`#c1401c`), and all contrast ratios must be re-verified against the new light palette (see §6).

## 6. Verification Requirements

Before this is considered done:

- Recompute WCAG contrast for every foreground/background pairing in the new palette (same method used for the previous accessibility pass) — particularly `--color-muted` (`#5c554a`) on `--color-background` (`#f7f5f0`), and `--color-accent` (`#c1401c`) on background for link/button text.
- Existing Vitest suite (39 tests) must still pass — these test structure/content, not visual styling, so they should be unaffected, but must be re-run after the rewrite.
- `tsc --noEmit` and `next build` clean, per the existing project convention.
- Manual browser check of every route (`/`, `/projects`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, 404) after implementation, per this project's established practice of verifying UI changes live before calling them done.

## 7. Out of Scope

- The Lochify logo asset itself (owner will supply the file; implementation uses a text placeholder until then).
- Any change to Sanity Studio's own UI (Studio is a separate app, not covered by this site redesign).
- Dark mode / theme toggle (explicitly rejected — light only).
- Restructuring the Projects page to the row-list pattern (explicitly rejected — cards are kept).
