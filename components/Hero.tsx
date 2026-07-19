import Link from "next/link";
import { Reveal } from "./Reveal";
import type { Profile } from "@/lib/data/profile";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <Reveal>
        <p className="text-xs uppercase tracking-wide font-bold text-accent mb-4">
          <span>{profile.role}</span>
          <span className="mx-2">&mdash;</span>
          <span>{profile.location}</span>
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight tracking-tight mb-8 max-w-2xl">
          {profile.name}
        </h1>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="border-2 border-foreground text-foreground px-5 py-2.5 text-sm font-bold hover:border-accent hover:text-accent transition-colors duration-200"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2.5 text-sm font-bold text-accent hover:underline"
          >
            Read the Blog
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
