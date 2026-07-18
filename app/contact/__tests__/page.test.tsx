import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "../page";
import { contactLinks } from "@/lib/data/contact";

describe("ContactPage", () => {
  it("renders all contact links", () => {
    render(<ContactPage />);
    for (const link of contactLinks) {
      expect(screen.getByRole("link", { name: new RegExp(link.label, "i") })).toHaveAttribute(
        "href",
        link.href
      );
    }
  });
});
