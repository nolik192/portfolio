"use client";

import { useRef, useState } from "react";
import { SanityImage } from "./SanityImage";
import type { SanityImageValue } from "@/lib/sanity/queries";

export function ImageGallery({ images }: { images: SanityImageValue[] }) {
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

  return (
    <div className="my-4">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Photo gallery"
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory rounded-md border border-border"
      >
        {images.map((image, i) => (
          <div key={i} className="w-full shrink-0 snap-center">
            <SanityImage value={image} width={768} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-xs">
        <button
          type="button"
          onClick={() => scrollToIndex(index - 1)}
          disabled={index === 0}
          className="font-bold text-accent disabled:text-muted disabled:opacity-40"
        >
          &larr; Prev
        </button>
        <span className="text-muted">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => scrollToIndex(index + 1)}
          disabled={index === images.length - 1}
          className="font-bold text-accent disabled:text-muted disabled:opacity-40"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
