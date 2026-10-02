'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
}

export default function HoverLift({ children, className }: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
