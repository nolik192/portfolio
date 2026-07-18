import { TerminalPrompt } from "@/components/TerminalPrompt";
import { profile } from "@/lib/data/profile";

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 font-sans">
      <TerminalPrompt command="cat about.md" />
      <h1 className="text-3xl font-bold text-foreground font-mono mb-6">About</h1>
      <p className="text-foreground-dim leading-relaxed mb-10">{profile.bio}</p>

      <h2 className="text-lg font-bold text-foreground font-mono mb-4">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {profile.skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-bold text-accent-secondary font-mono mb-2">{group.category}</h3>
            <p className="text-sm text-foreground-dim">{group.items.join(", ")}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-foreground font-mono mb-4">Other Experience</h2>
      <ul className="space-y-4 mb-10">
        {profile.experience.map((entry) => (
          <li key={entry.title}>
            <p className="text-sm font-bold text-foreground">
              {entry.title} &mdash; {entry.organization}
            </p>
            <p className="text-xs text-muted font-mono mb-1">{entry.period}</p>
            <p className="text-sm text-foreground-dim">{entry.description}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold text-foreground font-mono mb-4">Natural Languages</h2>
      <p className="text-sm text-foreground-dim">
        {profile.languages.map((lang) => `${lang.name} (${lang.level})`).join(" · ")}
      </p>
    </section>
  );
}
