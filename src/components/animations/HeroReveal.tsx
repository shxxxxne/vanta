'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface HeroRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function HeroReveal({
  children,
  delay = 0,
  className,
}: HeroRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
