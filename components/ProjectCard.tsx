import type { Project } from "@/lib/data/projects";
import { ProjectGallery } from "@/components/ProjectGallery";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-surface border border-border rounded-md overflow-hidden transition-colors duration-200 hover:border-accent/60">
      {project.screenshots && project.screenshots.length > 0 && (
        <ProjectGallery images={project.screenshots} alt={`${project.name} screenshot`} />
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
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
      </div>
    </article>
  );
}
