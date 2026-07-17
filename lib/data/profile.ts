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
