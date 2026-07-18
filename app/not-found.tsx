import Link from "next/link";
import { TerminalPrompt } from "@/components/TerminalPrompt";

export default function NotFound() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 font-mono text-center">
      <TerminalPrompt command="cd /nonexistent-page" />
      <p className="text-accent mb-2">bash: cd: /nonexistent-page: No such file or directory</p>
      <h1 className="text-2xl font-bold text-foreground mb-6">404 — Page Not Found</h1>
      <Link href="/" className="text-accent-secondary hover:underline">
        cd ~
      </Link>
    </section>
  );
}
