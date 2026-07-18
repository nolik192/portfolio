import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "../page";
import { majorProjects, otherProjects } from "@/lib/data/projects";

describe("ProjectsPage", () => {
  it("renders all major and other projects", () => {
    render(<ProjectsPage />);
    for (const project of majorProjects) {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    }
    for (const project of otherProjects) {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    }
  });
});
