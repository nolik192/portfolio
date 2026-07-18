import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-surface border border-border rounded-md p-6 transition-colors duration-200 hover:border-accent-secondary/60">
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
