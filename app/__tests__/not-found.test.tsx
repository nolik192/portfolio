import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "../not-found";

describe("NotFound", () => {
  it("renders a 404 message and a link home", () => {
    render(<NotFound />);
    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cd ~/i })).toHaveAttribute("href", "/");
  });
});
