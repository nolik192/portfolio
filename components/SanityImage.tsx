import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImageValue } from "@/lib/sanity/queries";

const DEFAULT_ASPECT_RATIO = 1.5;
/** Fetch the Sanity source at this multiple of the display size so retina (2x/3x) srcset
 * variants have real detail to downscale from, instead of Next.js upscaling a tiny source. */
const SOURCE_RESOLUTION_MULTIPLIER = 3;

export function SanityImage({
  value,
  width = 800,
  aspectRatio,
  className,
  priority,
}: {
  value: SanityImageValue;
  width?: number;
  /** Force a fixed width/height ratio (e.g. 3/2), cropped server-side around the hotspot, instead of the source image's native ratio. */
  aspectRatio?: number;
  className?: string;
  priority?: boolean;
}) {
  if (!value?.asset) return null;

  const height = aspectRatio
    ? Math.round(width / aspectRatio)
    : value.dimensions
      ? Math.round(width * (value.dimensions.height / value.dimensions.width))
      : Math.round(width / DEFAULT_ASPECT_RATIO);

  const image = urlFor(value)
    .width(width * SOURCE_RESOLUTION_MULTIPLIER)
    .height(height * SOURCE_RESOLUTION_MULTIPLIER)
    .fit(aspectRatio ? "crop" : "max");

  return (
    <Image
      className={className}
      src={image.url()}
      alt={value.alt ?? ""}
      width={width}
      height={height}
      quality={90}
      priority={priority}
    />
  );
}
