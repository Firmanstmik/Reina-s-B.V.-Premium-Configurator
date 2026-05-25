import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type RevealVariant =
  | "rise"
  | "lift"
  | "slide-left"
  | "slide-right"
  | "zoom-soft"
  | "curtain"
  | "bloom";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  threshold?: number;
  rootMargin?: string;
  as?: ElementType;
};

export function Reveal({
  children,
  className,
  variant = "rise",
  delay = 0,
  threshold = 0.18,
  rootMargin = "0px 0px -12% 0px",
  as,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Comp = (as ?? "div") as ElementType;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <Comp
      ref={ref}
      className={cn(
        "scroll-reveal",
        `scroll-reveal--${variant}`,
        delay > 0 && `scroll-reveal--d${delay}`,
        visible && "is-visible",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
