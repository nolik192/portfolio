"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function scrollToIndex(next: number) {
    const container = scrollRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(images.length - 1, next));
    container.scrollTo({ left: clamped * container.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  }

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;
    setIndex(Math.round(container.scrollLeft / container.clientWidth));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(index - 1);
    }
  }

  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-video border-b border-border">
        <Image
          src={images[0]}
          alt={alt}
          fill
          sizes="(min-width: 768px) 700px, 100vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className="relative border-b border-border">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={`${alt} gallery`}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory"
      >
        {images.map((src, i) => (
          <div key={src} className="relative w-full aspect-video shrink-0 snap-center">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 700px, 100vw"
              className="object-cover object-top"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scrollToIndex(index - 1)}
        disabled={index === 0}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground transition-opacity hover:bg-background disabled:pointer-events-none disabled:opacity-0"
      >
        &larr;
      </button>
      <button
        type="button"
        onClick={() => scrollToIndex(index + 1)}
        disabled={index === images.length - 1}
        aria-label="Next image"
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground transition-opacity hover:bg-background disabled:pointer-events-none disabled:opacity-0"
      >
        &rarr;
      </button>
      <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-4 bg-accent" : "w-1.5 bg-background/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
