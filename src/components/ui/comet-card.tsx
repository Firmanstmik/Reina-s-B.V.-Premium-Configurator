"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  hoverScale = 1.03,
  glareOpacity = 0.28,
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  hoverScale?: number;
  glareOpacity?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 28, mass: 0.7 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 28, mass: 0.7 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`],
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`],
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`],
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.34) 0%, rgba(122,214,255,0.18) 16%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0) 72%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn("[perspective:1400px] [transform-style:preserve-3d]", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 140px 56px -72px, rgba(0, 0, 0, 0.08) 0px 60px 32px -44px, rgba(0, 0, 0, 0.32) 0px 22px 24px -24px",
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: hoverScale,
          z: 30,
          transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
        }}
        className="relative h-full rounded-[inherit]"
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 rounded-[inherit] mix-blend-screen"
          style={{
            background: glareBackground,
            opacity: glareOpacity,
          }}
          transition={{ duration: 0.22 }}
        />
      </motion.div>
    </div>
  );
};
