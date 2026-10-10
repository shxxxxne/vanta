'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

import { cn } from '@/lib/utils';

interface MovingGlowProps {
  className?: string;
}

/**
 * Radial gradient in the primary (lime) color that:
 * 1. drifts slowly on its own (works on touch devices too), and
 * 2. gently follows the mouse across its parent section (desktop only).
 *
 * The parent must be `relative overflow-hidden`.
 * Respects `prefers-reduced-motion` (renders a static glow).
 */
export default function MovingGlow({ className }: MovingGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Pointer offset (px from section center) -> smoothed with a spring
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 40, damping: 22, mass: 1 });
  const y = useSpring(pointerY, { stiffness: 40, damping: 22, mass: 1 });

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent || reduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = parent.getBoundingClientRect();
      // Follow at ~60% of the pointer distance for a soft, trailing feel
      pointerX.set((event.clientX - rect.left - rect.width / 2) * 0.6);
      pointerY.set((event.clientY - rect.top - rect.height / 2) * 0.6);
    };

    const handleLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    parent.addEventListener('pointermove', handleMove);
    parent.addEventListener('pointerleave', handleLeave);
    return () => {
      parent.removeEventListener('pointermove', handleMove);
      parent.removeEventListener('pointerleave', handleLeave);
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden',
        className,
      )}
    >
      {/* Layer 1: follows the pointer */}
      <motion.div style={{ x, y }}>
        {/* Layer 2: idle drift + breathing */}
        <motion.div
          className="size-[28rem] rounded-full bg-radial-[closest-side] from-primary/30 via-primary/10 to-transparent sm:size-[40rem] lg:size-[56rem]"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ['-12%', '10%', '-4%', '-12%'],
                  y: ['-8%', '6%', '10%', '-8%'],
                  scale: [1, 1.15, 0.95, 1],
                }
          }
          transition={{
            duration: 16,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
}
