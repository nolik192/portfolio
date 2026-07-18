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
