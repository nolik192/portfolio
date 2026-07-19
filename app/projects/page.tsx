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
