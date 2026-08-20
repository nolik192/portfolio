import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { OtherProjectCard } from "@/components/OtherProjectCard";
import { Reveal } from "@/components/Reveal";
import { majorProjects, otherProjects } from "@/lib/data/projects";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Selected projects by Yury Bortsov — backend systems, self-hosted infrastructure, and AI-powered products, from a school hosting platform serving 300+ students to an AI gift-recommendation startup.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Projects — Yury Bortsov",
    description: DESCRIPTION,
    url: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black text-foreground mb-8">Projects</h1>
      <div className="columns-1 sm:columns-2 gap-5 mb-12 [&>*]:mb-5 [&>*]:break-inside-avoid">
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
