'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface ButtonPressProps {
  children: ReactNode;
  className?: string;
}

export default function ButtonPress({ children, className }: ButtonPressProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.15,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
