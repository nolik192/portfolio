import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImageValue } from "@/lib/sanity/queries";

const DEFAULT_ASPECT_RATIO = 1.5;

export function SanityImage({
  value,
  width = 800,
  className,
  priority,
}: {
  value: SanityImageValue;
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  if (!value?.asset) return null;

  const height = value.dimensions
    ? Math.round(width * (value.dimensions.height / value.dimensions.width))
    : Math.round(width / DEFAULT_ASPECT_RATIO);

  return (
    <Image
      className={className}
      src={urlFor(value).width(width).height(height).fit("max").url()}
      alt={value.alt ?? ""}
      width={width}
      height={height}
      priority={priority}
    />
  );
}
