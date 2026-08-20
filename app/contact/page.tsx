import type { Metadata } from "next";
import { contactLinks } from "@/lib/data/contact";
import { ContactIcon } from "@/components/ContactIcon";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black text-foreground mb-8">Contact</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {contactLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="flex items-center gap-4 border border-border rounded-md px-4 py-4 transition-colors duration-200 hover:border-accent hover:bg-surface cursor-pointer"
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <ContactIcon label={link.label} className="h-6 w-6 shrink-0 text-accent" />
              <span className="min-w-0">
                <span className="block text-sm font-bold text-foreground">{link.label}</span>
                <span className="block text-sm text-foreground-dim truncate">
                  {link.href.replace("mailto:", "").replace(/^https?:\/\//, "")}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
