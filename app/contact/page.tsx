import { contactLinks } from "@/lib/data/contact";

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black text-foreground mb-8">Contact</h1>
      <ul className="space-y-3">
        {contactLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-foreground-dim hover:text-accent transition-colors duration-200"
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="text-accent font-bold">{link.label}:</span>{" "}
              {link.href.replace("mailto:", "")}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
