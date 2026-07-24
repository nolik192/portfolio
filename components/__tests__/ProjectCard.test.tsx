import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "../ProjectCard";
import { majorProjects } from "@/lib/data/projects";

describe("ProjectCard", () => {
  it("renders the project name, role, description, and stack", () => {
    const project = majorProjects[0];
    render(<ProjectCard project={project} />);
    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(project.role)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    for (const tech of project.stack) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it("renders a link when the project has one", () => {
    const project = majorProjects[1];
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", project.link);
  });

  it("renders no link when the project has none", () => {
    const project = majorProjects[0];
    render(<ProjectCard project={project} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
