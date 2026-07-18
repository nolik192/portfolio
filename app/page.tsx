import { Hero } from "@/components/Hero";
import { profile } from "@/lib/data/profile";

export default function HomePage() {
  return <Hero profile={profile} />;
}
