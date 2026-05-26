"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type FloatingDockPreview = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export type FloatingDockItem = {
  title: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  previews: FloatingDockPreview[];
  accent?: string;
  external?: boolean;
};

type FloatingDockProps = {
  items: FloatingDockItem[];
  className?: string;
};

export function FloatingDock({ items, className }: FloatingDockProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dockInView = useInView(rootRef, {
    amount: 0.18,
    margin: "0px 0px -16% 0px",
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = useMemo(() => items[activeIndex] ?? items[0] ?? null, [activeIndex, items]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div className="hidden md:block">
        <div className="relative mx-auto flex max-w-[min(72rem,calc(100vw-4rem))] flex-col items-center">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-32 -translate-y-4 rounded-full bg-primary/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none relative mb-7 w-full"
          >
            <motion.div
              initial={false}
              animate={{
                opacity: activeItem ? 1 : 0,
                y: activeItem ? 0 : 10,
                scale: activeItem ? 1 : 0.985,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,12,18,0.84),rgba(7,10,16,0.66))] px-6 py-5 shadow-[0_40px_100px_-44px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(104,202,255,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%,rgba(104,202,255,0.05)_100%)]" />
              {activeItem?.accent ? (
                <motion.div
                  key={`${activeItem.title}-accent`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -right-14 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full blur-3xl"
                  style={{ background: activeItem.accent }}
                />
              ) : null}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {activeItem && (
                <div className="relative grid min-h-[13rem] grid-cols-[minmax(0,1.08fr)_minmax(24rem,1fr)] items-center gap-8 overflow-visible">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary/88">
                      {activeItem.label}
                    </p>
                    <h3 className="mt-3 text-[1.55rem] font-medium tracking-[-0.015em] text-white/94">
                      {activeItem.title}
                    </h3>
                    <p className="mt-3 max-w-[27rem] text-[0.98rem] leading-relaxed text-white/62">
                      {activeItem.description}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/48">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_rgba(104,202,255,0.65)]" />
                      Premium quick access
                    </div>
                  </div>

                  <div className="relative flex min-w-0 items-center justify-end">
                    <div className="absolute inset-y-6 left-6 right-6 rounded-[1.9rem] bg-[radial-gradient(circle_at_65%_35%,rgba(104,202,255,0.14),transparent_36%)] blur-2xl" />
                    <div className="relative flex items-center justify-end gap-0 overflow-visible pr-1">
                      {activeItem.previews.slice(0, 3).map((preview, index) => (
                        <motion.div
                          key={`${activeItem.title}-${preview.src}-${index}`}
                          initial={false}
                          animate={{
                            y: [24, 6, -6][index] ?? 0,
                            rotate: [-8, -2, 5][index] ?? 0,
                            scale: [0.94, 0.985, 1.025][index] ?? 1,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.55,
                            delay: index * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={cn(
                            "relative -ml-7 overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/40 shadow-[0_28px_46px_-28px_rgba(0,0,0,0.95)]",
                            index === 1 ? "h-[8.4rem] w-[12rem]" : "h-[9rem] w-[12.75rem]",
                          )}
                          style={{ zIndex: index + 1 }}
                        >
                          <img
                            src={preview.src}
                            alt={preview.alt}
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ objectPosition: preview.objectPosition ?? "center center" }}
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,14,0.06),rgba(7,10,14,0.2)_54%,rgba(7,10,14,0.72))]" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(120,210,255,0.22),transparent_38%)] mix-blend-screen" />
                          <div className="absolute inset-x-4 top-3 h-px bg-gradient-to-r from-transparent via-white/52 to-transparent" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          <FloatingDockDesktop
            items={items}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>

      <FloatingDockMobile items={items} visible={dockInView} />
    </div>
  );
}

function FloatingDockDesktop({
  items,
  activeIndex,
  setActiveIndex,
}: {
  items: FloatingDockItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.pageX)}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setActiveIndex(0);
      }}
      className="relative rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,14,20,0.78),rgba(7,10,15,0.64))] px-3 py-2 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(104,202,255,0.16),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_46%,rgba(100,198,255,0.06)_100%)]" />
      <div className="pointer-events-none absolute inset-x-10 bottom-[-1.25rem] h-8 rounded-full bg-primary/18 blur-2xl" />
      <div className="relative flex items-end gap-3 px-1">
        {items.map((item, index) => (
          <DockIcon
            key={item.title}
            item={item}
            index={index}
            mouseX={mouseX}
            active={activeIndex === index}
            onActivate={setActiveIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}

function DockIcon({
  item,
  index,
  mouseX,
  active,
  onActivate,
}: {
  item: FloatingDockItem;
  index: number;
  mouseX: MotionValue<number>;
  active: boolean;
  onActivate: (index: number) => void;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });

  const sizeRaw = useTransform(distance, [-180, 0, 180], [56, 78, 56]);
  const iconSizeRaw = useTransform(distance, [-180, 0, 180], [17, 24, 17]);
  const liftRaw = useTransform(distance, [-180, 0, 180], [0, -12, 0]);
  const glowRaw = useTransform(distance, [-180, 0, 180], [0.12, 0.26, 0.12]);

  const size = useSpring(sizeRaw, { stiffness: 220, damping: 18, mass: 0.24 });
  const iconSize = useSpring(iconSizeRaw, { stiffness: 220, damping: 18, mass: 0.24 });
  const lift = useSpring(liftRaw, { stiffness: 260, damping: 18, mass: 0.22 });
  const glow = useSpring(glowRaw, { stiffness: 220, damping: 18, mass: 0.22 });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      onMouseEnter={() => {
        setHovered(true);
        onActivate(index);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => {
        setHovered(true);
        onActivate(index);
      }}
      onBlur={() => setHovered(false)}
      className="group relative flex flex-col items-center justify-end"
      style={{ y: lift }}
    >
      <AnimatePresence>
        {(hovered || active) && (
          <motion.div
            initial={{ opacity: 0, y: 8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -top-11 left-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(20,25,34,0.96),rgba(10,14,20,0.9))] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/86 shadow-[0_16px_34px_-22px_rgba(0,0,0,0.95)] backdrop-blur-xl"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <motion.div
          className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(104,202,255,0.2),transparent_64%)]"
          style={{ opacity: glow }}
        />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_46%)]" />
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className={cn(
            "relative z-10 flex items-center justify-center rounded-full text-primary",
            active && "drop-shadow-[0_0_14px_rgba(104,202,255,0.35)]",
          )}
        >
          <Icon className="h-full w-full" />
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

function FloatingDockMobile({ items, visible }: { items: FloatingDockItem[]; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const featuredItem = items[0];

  useEffect(() => {
    if (!visible) {
      setOpen(false);
    }
  }, [visible]);

  return (
    <div className="md:hidden">
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileTap={{ scale: 0.98 }}
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.96,
          y: visible ? 0 : 10,
          pointerEvents: visible ? "auto" : "none",
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-3 rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,20,0.82),rgba(7,10,15,0.72))] px-4 text-sm font-medium text-white/88 shadow-[0_26px_60px_-28px_rgba(0,0,0,0.96)] backdrop-blur-2xl"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/14 text-primary ring-1 ring-primary/18">
          <span className="h-2 w-2 rounded-[4px] bg-primary shadow-[0_0_18px_rgba(104,202,255,0.7)]" />
        </span>
        Premium acties
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          opacity: open && visible ? 1 : 0,
          pointerEvents: open && visible ? "auto" : "none",
        }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-30 bg-[rgba(5,7,12,0.46)] backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />

      <motion.div
        initial={false}
        animate={{
          opacity: open && visible ? 1 : 0,
          y: open && visible ? 0 : 16,
          pointerEvents: open && visible ? "auto" : "none",
        }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-4 bottom-24 z-40 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,18,0.9),rgba(7,10,15,0.82))] p-4 shadow-[0_32px_80px_-36px_rgba(0,0,0,0.98)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(104,202,255,0.16),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_44%,rgba(100,198,255,0.05)_100%)]" />
        <div className="relative mb-4 overflow-hidden rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-3.5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(104,202,255,0.18),transparent_34%)]" />
          <div className="relative flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/14 ring-1 ring-primary/18">
              <featuredItem.icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary/88">
                Premium quick access
              </p>
              <p className="mt-1 text-sm text-white/86">{featuredItem.title}</p>
            </div>
          </div>
          <p className="relative mt-3 text-sm leading-relaxed text-white/60">
            Direct naar configuraties, projecten en persoonlijk advies.
          </p>
        </div>
        <div className="relative grid grid-cols-2 gap-2.5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="group relative overflow-hidden rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-3"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(104,202,255,0.12),transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/18">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium tracking-[-0.01em] text-white/88">
                      {item.title}
                    </p>
                    <p className="mt-0.5 truncate text-[9px] uppercase tracking-[0.18em] text-white/44">
                      {item.label}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
