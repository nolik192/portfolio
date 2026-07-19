import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-wide font-bold text-accent mb-4">Error</p>
      <h1 className="text-7xl font-black text-foreground mb-6">404</h1>
      <p className="text-foreground-dim mb-8">This page doesn&rsquo;t exist.</p>
      <Link href="/" className="text-accent font-bold hover:underline">
        &larr; Back home
      </Link>
    </section>
  );
}
