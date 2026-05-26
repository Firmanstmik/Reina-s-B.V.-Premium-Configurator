import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImagesBadgeProps {
  text: string;
  images: string[];
  className?: string;
  href?: string;
  target?: string;
  folderSize?: { width: number; height: number };
  teaserImageSize?: { width: number; height: number };
  hoverImageSize?: { width: number; height: number };
  hoverTranslateY?: number;
  hoverSpread?: number;
  hoverRotation?: number;
  imageObjectPositions?: string[];
  imageAltPrefix?: string;
  textClassName?: string;
}

export function ImagesBadge({
  text,
  images,
  className,
  href,
  target,
  folderSize = { width: 34, height: 24 },
  teaserImageSize = { width: 20, height: 14 },
  hoverImageSize = { width: 62, height: 46 },
  hoverTranslateY = -52,
  hoverSpread = 22,
  hoverRotation = 10,
  imageObjectPositions = [],
  imageAltPrefix = "Preview",
  textClassName,
}: ImagesBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const displayImages = images.slice(0, 3);
  const useHoverEffect = isHovered && !prefersReducedMotion;

  const tabWidth = folderSize.width * 0.42;
  const tabHeight = folderSize.height * 0.26;

  const sharedClassName = cn(
    "group inline-flex cursor-pointer items-center gap-2.5 [perspective:1000px]",
    className,
  );

  const content = (
    <>
      <motion.div
        className="relative shrink-0"
        animate={useHoverEffect ? { y: -1.5, scale: 1.015 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: folderSize.width,
          height: folderSize.height,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="pointer-events-none absolute -inset-2 rounded-[1rem] bg-[radial-gradient(circle_at_50%_45%,oklch(0.78_0.13_215_/_0.18),transparent_62%)] opacity-70 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute inset-0 rounded-[0.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,34,0.72),rgba(8,12,18,0.92))] shadow-[0_14px_28px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
          <div
            className="absolute left-0.5 rounded-t-[0.3rem] rounded-br-[0.22rem] border border-b-0 border-white/8 bg-[linear-gradient(180deg,rgba(22,31,44,0.92),rgba(12,16,23,0.9))]"
            style={{
              top: -tabHeight * 0.72,
              width: tabWidth,
              height: tabHeight,
            }}
          />
          <div className="absolute inset-x-1.5 top-1 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <div className="absolute inset-x-1 bottom-1.5 top-[42%] rounded-[0.32rem] border border-primary/12 bg-[linear-gradient(135deg,rgba(104,202,255,0.12),rgba(255,255,255,0.02))]" />
        </div>

        {displayImages.map((image, index) => {
          const totalImages = displayImages.length;
          const rotationBase =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * hoverRotation
                : (index - 1) * hoverRotation;

          const hoverY = prefersReducedMotion
            ? -teaserImageSize.height * 0.65
            : hoverTranslateY - (totalImages - 1 - index) * 2.5;
          const hoverX =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * hoverSpread
                : (index - 1) * hoverSpread;

          const teaserY = -4 - (totalImages - 1 - index) * 0.8;
          let teaserRotation = 0;
          if (totalImages === 2) {
            teaserRotation = (index - 0.5) * 2.4;
          } else if (totalImages > 2) {
            teaserRotation = (index - 1) * 2.4;
          }
          const targetWidth = useHoverEffect ? hoverImageSize.width : teaserImageSize.width;
          const targetHeight = useHoverEffect ? hoverImageSize.height : teaserImageSize.height;
          const targetX = `calc(-50% + ${useHoverEffect ? hoverX : 0}px)`;
          const targetRotate = useHoverEffect ? rotationBase : teaserRotation;

          return (
            <motion.div
              key={`${image}-${index}`}
              className="absolute left-1/2 top-0.5 origin-bottom overflow-hidden rounded-[0.42rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.95)]"
              animate={{
                x: targetX,
                y: isHovered ? hoverY : teaserY,
                rotate: targetRotate,
                width: targetWidth,
                height: targetHeight,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
                mass: 0.9,
                delay: index * 0.025,
              }}
              style={{
                zIndex: 10 + index,
              }}
            >
              <img
                src={image}
                alt={`${imageAltPrefix} ${index + 1}`}
                className="h-full w-full object-cover"
                style={{ objectPosition: imageObjectPositions[index] ?? "center center" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,16,0.05),rgba(7,11,16,0.25)_58%,rgba(7,11,16,0.55))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(122,214,255,0.16),transparent_38%)] mix-blend-screen" />
              <div className="absolute inset-x-2 top-1.5 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
            </motion.div>
          );
        })}

        <motion.div
          className="absolute inset-x-0 bottom-0 h-[82%] origin-bottom rounded-[0.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(26,35,48,0.96),rgba(9,13,19,0.94))] shadow-[0_16px_28px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)]"
          animate={{
            rotateX: useHoverEffect ? -51 : -27,
            scaleY: useHoverEffect ? 0.78 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 28,
            mass: 0.92,
          }}
          style={{
            transformStyle: "preserve-3d",
            zIndex: 20,
            boxShadow:
              "0 18px 34px -24px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(122,214,255,0.08)",
          }}
        >
          <div className="absolute inset-x-1.5 top-1 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
          <div className="absolute inset-x-1.5 bottom-2 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent" />
        </motion.div>
      </motion.div>

      <span
        className={cn(
          "max-w-[10rem] text-[11px] font-medium tracking-[-0.01em] text-white/78 transition-colors duration-500 group-hover:text-white/90",
          textClassName,
        )}
      >
        {text}
      </span>
    </>
  );

  const hoverHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={sharedClassName}
        {...hoverHandlers}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={sharedClassName} {...hoverHandlers}>
      {content}
    </div>
  );
}
