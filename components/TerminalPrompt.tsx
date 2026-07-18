export function TerminalPrompt({ command }: { command: string }) {
  return (
    <p className="font-mono text-sm text-accent-secondary mb-4">
      <span aria-hidden="true">$ </span>
      {command}
    </p>
  );
}
