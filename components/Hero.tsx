import Link from "next/link";
import { TerminalPrompt } from "./TerminalPrompt";
import { Reveal } from "./Reveal";
import type { Profile } from "@/lib/data/profile";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 font-mono">
      <Reveal>
        <TerminalPrompt command="whoami" />
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {profile.name}
          <span className="text-accent cursor-blink" aria-hidden="true">
            _
          </span>
        </h1>
        <p className="text-lg text-foreground-dim mb-1">{profile.role}</p>
        <p className="text-sm text-muted mb-8">{profile.location}</p>
        <div className="bg-surface border border-border rounded-md p-4 text-sm text-foreground-dim mb-8">
          <p>
            <span className="text-accent-secondary">$</span> cat status.txt
          </p>
          <p className="mt-1 text-foreground">{profile.bio}</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="bg-accent text-background px-5 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition-opacity duration-200"
          >
            View Projects &rarr;
          </Link>
          <Link
            href="/blog"
            className="border border-border text-foreground px-5 py-2.5 rounded-md text-sm hover:border-accent transition-colors duration-200"
          >
            Read the Blog
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
