'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface HeroRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  fade?: boolean;
}

export default function HeroReveal({
  children,
  delay = 0,
  className,
  fade = true,
}: HeroRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: fade ? 0 : 1,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
