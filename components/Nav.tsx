import Link from "next/link";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="border-b border-border">
      <nav className="max-w-4xl mx-auto flex flex-wrap items-center gap-6 px-6 py-4 font-mono text-sm">
        <span className="text-accent-secondary">~/yury-bortsov $ ls</span>
        <ul className="flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-foreground hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
