export interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:lagepik@gmail.com", external: false },
  { label: "GitHub", href: "https://github.com/nolik192", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yury-bortsov", external: true },
  { label: "YouTube", href: "https://www.youtube.com/@nolik194", external: true },
  { label: "Twitch", href: "https://www.twitch.tv/nolik192", external: true },
];
