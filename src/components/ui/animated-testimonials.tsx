"use client";

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AnimatedTestimonialItem = {
  id: string;
  quote: string;
  name: string;
  meta: string;
  age: string;
  rating: number;
  imageSrc: string;
  imageAlt: string;
  imageObjectPosition?: string;
  avatarSrc?: string | null;
  verifiedLabel?: string;
  href?: string;
};

type AnimatedTestimonialsProps = {
  items: AnimatedTestimonialItem[];
  ratingLabel: string;
  reviewCountLabel: string;
  googleMapsUrl: string;
  className?: string;
  autoplay?: boolean;
};

export function AnimatedTestimonials({
  items,
  ratingLabel,
  reviewCountLabel,
  googleMapsUrl,
  className,
  autoplay = true,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0] ?? null;

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [autoplay, items.length]);

  const stars = useMemo(() => {
    if (!activeItem) return [];
    return Array.from({ length: 5 }, (_, index) => index < Math.round(activeItem.rating));
  }, [activeItem]);

  if (!activeItem) {
    return null;
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div
      className={cn(
        "mx-auto max-w-sm px-4 py-8 antialiased md:max-w-5xl md:px-8 lg:px-12",
        className,
      )}
    >
      <div className="relative grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <div className="relative h-[24rem] w-full md:h-[30rem]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-3xl" />
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: getRotation(index),
                  }}
                  animate={{
                    opacity: isActive(index, activeIndex) ? 1 : 0.62,
                    scale: isActive(index, activeIndex) ? 1 : 0.95,
                    rotate: isActive(index, activeIndex) ? 0 : getRotation(index),
                    zIndex: isActive(index, activeIndex) ? 40 : items.length + 2 - index,
                    y: isActive(index, activeIndex) ? [0, -18, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    rotate: getRotation(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,13,20,0.92),rgba(6,10,16,0.84))] shadow-[0_48px_100px_-46px_rgba(0,0,0,0.95)]">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: item.imageObjectPosition ?? "center center" }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.08),rgba(8,10,14,0.16)_46%,rgba(5,8,13,0.84))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(110,206,255,0.18),transparent_26%)] mix-blend-screen" />
                    <div className="absolute inset-x-6 top-5 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/74 backdrop-blur-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_rgba(104,202,255,0.7)]" />
                        Reina&apos;s project
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-2">
          <motion.div
            key={activeIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/78 transition-colors hover:border-primary/30 hover:text-white"
              >
                <GoogleMark className="h-4 w-4 shrink-0" />
                {activeItem.verifiedLabel ?? "Verified Google Review"}
              </a>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-primary/90">
                {ratingLabel}
              </div>
            </div>

            <p className="mt-4 text-sm text-white/52">{reviewCountLabel}</p>

            <div className="mt-7 flex flex-wrap items-start justify-between gap-5">
              <div className="min-w-0">
                <h3 className="text-[1.95rem] font-semibold tracking-[-0.03em] text-white/94 md:text-[2.2rem]">
                  {activeItem.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/46">{activeItem.meta}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/46">
                {activeItem.age}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1.5">
              {stars.map((filled, index) => (
                <StarGlyph
                  key={`${activeItem.id}-star-${index}`}
                  className={filled ? "text-primary" : "text-white/18"}
                />
              ))}
              <span className="ml-2 text-sm font-medium text-white/78">
                {activeItem.rating.toFixed(1)}
              </span>
            </div>

            <motion.p className="mt-8 max-w-[32rem] text-[1.06rem] leading-[1.85] text-white/70 md:text-[1.18rem]">
              {activeItem.quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${activeItem.id}-word-${index}`}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.18,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {activeItem.avatarSrc ? (
                <img
                  src={activeItem.avatarSrc}
                  alt={activeItem.name}
                  className="h-12 w-12 rounded-full border border-white/10 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-semibold text-white/88">
                  {getInitials(activeItem.name)}
                </div>
              )}

              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/42">
                  Google Maps review
                </p>
                <div className="mt-1 flex min-w-0 items-center gap-2">
                  <p className="truncate text-sm font-medium text-white/84">{activeItem.name}</p>
                  {activeItem.href ? (
                    <a
                      href={activeItem.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-primary/84 transition-colors hover:text-primary"
                    >
                      Open
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/48">
                {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </div>
              <button
                onClick={handlePrev}
                className="group/button flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/74 transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                aria-label="Vorige review"
              >
                <ArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover/button:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/74 transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                aria-label="Review berikutnya"
              >
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((value) => value[0]?.toUpperCase() ?? "")
    .join("");
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.3c-2.1 1.6-4.7 2.5-7.3 2.5-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.5 39.6 16.2 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.3-4.3 5.6l.1-.1 6.2 5.3C37 38.6 44 33.5 44 24c0-1.3-.1-2.3-.4-3.5Z"
      />
    </svg>
  );
}

function StarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-4 w-4 fill-current", className)}>
      <path d="m12 2.75 2.84 5.76 6.36.92-4.6 4.49 1.09 6.33L12 17.27l-5.69 2.98 1.09-6.33-4.6-4.49 6.36-.92L12 2.75Z" />
    </svg>
  );
}

function isActive(index: number, activeIndex: number) {
  return index === activeIndex;
}

function getRotation(index: number) {
  const rotations = [-10, 7, -8, 8, -6, 6];
  return rotations[index % rotations.length] ?? 0;
}
