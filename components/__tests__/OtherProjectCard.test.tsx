import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OtherProjectCard } from "../OtherProjectCard";
import { otherProjects } from "@/lib/data/projects";

describe("OtherProjectCard", () => {
  it("renders the project name and description", () => {
    const project = otherProjects[0];
    render(<OtherProjectCard project={project} />);
    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
  });
});
