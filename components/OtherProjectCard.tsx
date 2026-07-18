import type { OtherProject } from "@/lib/data/projects";

export function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <article className="border border-border rounded-md p-4">
      <h4 className="text-sm font-bold text-foreground font-mono mb-1">{project.name}</h4>
      <p className="text-sm text-foreground-dim">{project.description}</p>
    </article>
  );
}
