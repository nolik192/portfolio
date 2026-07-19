import { contactLinks } from "@/lib/data/contact";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-sm">
        <ul className="flex flex-wrap gap-6">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-block py-3 text-foreground-dim hover:text-accent transition-colors duration-200"
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-muted">&copy; {new Date().getFullYear()} Yury Bortsov</span>
      </div>
    </footer>
  );
}
