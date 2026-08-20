export interface Project {
  slug: string;
  name: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
  link?: string;
  screenshots?: string[];
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
    screenshots: ["/projects/tryton-home.png", "/projects/tryton-profile.png"],
  },
  {
    slug: "gift-helper",
    name: "gift-helper.com — AI Gift Recommendation Startup",
    role: "Founder",
    period: "2025 — Present",
    description: "Co-architected a full-stack monorepo (Turborepo, pnpm workspaces) with a Next.js frontend and a Nest.js API. Integrated an LLM-based recommendation engine to generate personalized gift suggestions. Set up GitLab CI/CD pipelines and Git hooks (Husky, lint-staged) to keep code quality consistent across the team.",
    stack: ["Next.js", "Nest.js", "JavaScript", "PostgreSQL", "Turborepo", "GitLab CI/CD"],
    link: "https://gift-helper.com",
    screenshots: ["/projects/gift-helper-quiz.png", "/projects/gift-helper.png"],
  },
  {
    slug: "ai-news-pipeline",
    name: "AI News Pipeline",
    role: "Personal Project",
    period: "2025",
    description: "Built an automated content pipeline using n8n: aggregates multiple RSS feeds, filters and selects articles via a locally-hosted LLM, and auto-publishes formatted news posts to a Telegram channel. Self-hosted an open-source LLM (Ollama) optimized to use native GPU acceleration rather than running in a container.",
    stack: ["n8n", "Ollama", "LLM prompting", "Workflow automation"],
  },
  {
    slug: "rustransavto",
    name: "RusTransAvto — Static Multilingual Freight Carrier Website",
    role: "Freelance Developer",
    period: "2025",
    description: "Replaced an outdated WordPress site for a freight company hauling cargo from China, Europe, and the CIS with its own fleet (refrigerated, tarpaulin, and low-bed trailers). Multilingual content is built at compile time — every language version is indexed and works without JavaScript. Built a custom static site generator in Node.js: Russian is the source language, English and Chinese are generated from a shared dictionary, and the build fails if a translation key is missing. The key feature is a blog the owner runs entirely through a Telegram bot: publishing, editing, deleting posts, and granting access to employees — while the site itself stays fully static (PHP only runs at publish time). The contact form is protected with a honeypot, IP-based rate limiting behind Cloudflare, and header-injection protection, plus compliance with Russia's 152-FZ data law. 118 automated tests across five suites, each written from a real bug (e.g. an invisible space silently breaking an SVG icon, or a year-long Cloudflare cache hiding content updates).",
    stack: ["Vanilla JS", "Node.js", "PHP", "Docker", "nginx", "Cloudflare Tunnel"],
    link: "https://rustransavto.bortsov.cc",
    screenshots: ["/projects/rustransavto-home.png", "/projects/rustransavto-fleet.png"],
  },
  {
    slug: "rustransavto-telegram-bot",
    name: "Telegram Bot as a CMS for a Fully Static Website",
    role: "Freelance Developer",
    period: "2025",
    description: "Client: RusTransAvto, an international freight carrier (China/Europe/CIS routes). The site had to be 100% static — zero external requests, instant load even on a poor connection. Problem: how does a non-technical owner publish blog posts without a CMS? Solution: a Telegram bot. He sends a photo and text, sees a preview, edits it in place, and publishes — the site build process takes the Russian text as the source and automatically generates EN/CN versions from a shared translation dictionary. The site stays fully static; a PHP script runs only at publish time to rebuild the relevant subpages. No database, no admin panel to learn, no CMS-typical attack surface — just a chat he uses every day.",
    stack: ["PHP", "Node.js", "Docker", "nginx", "Cloudflare Tunnel"],
    screenshots: ["/projects/rustransavto-telegram-bot.png"],
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
