import { contactLinks } from "@/lib/data/contact";

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs">
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
        <span className="text-muted">
          &copy; {new Date().getFullYear()} Yury Bortsov &middot; LOCHIFY
        </span>
      </div>
    </footer>
  );
}
