import Link from "next/link";

const links = [
  { href: "/", label: "Index" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="border-b-2 border-foreground">
      <nav className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-6 px-6 py-4 text-sm">
        <Link href="/" className="font-black text-lg tracking-tight text-foreground">
          BORTSOV
        </Link>
        <ul className="flex flex-wrap gap-6 uppercase text-xs tracking-wide font-bold">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block py-3 text-foreground hover:text-accent transition-colors duration-200"
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
