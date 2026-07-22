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
        <span className="text-muted inline-flex items-center gap-1.5">
          &copy; {new Date().getFullYear()} Yury Bortsov
          <span aria-hidden="true">&middot;</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lochify.svg" alt="Lochify" className="h-3.5 w-auto opacity-70" />
        </span>
      </div>
    </footer>
  );
}
