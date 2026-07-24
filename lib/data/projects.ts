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
  },
  {
    slug: "gift-helper",
    name: "gift-helper.com — AI Gift Recommendation Startup",
    role: "Co-Founder & Developer",
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
