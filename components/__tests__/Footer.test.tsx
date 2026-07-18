import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders all five contact links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", "mailto:lagepik@gmail.com");
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/nolik192");
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", "https://www.linkedin.com/in/yury-bortsov");
    expect(screen.getByRole("link", { name: /youtube/i })).toHaveAttribute("href", "https://www.youtube.com/@nolik194");
    expect(screen.getByRole("link", { name: /twitch/i })).toHaveAttribute("href", "https://www.twitch.tv/nolik192");
  });
});
