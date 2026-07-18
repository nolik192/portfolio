import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TerminalPrompt } from "../TerminalPrompt";

describe("TerminalPrompt", () => {
  it("renders the given command text", () => {
    render(<TerminalPrompt command="cat about.md" />);
    expect(screen.getByText("cat about.md")).toBeInTheDocument();
  });
});
