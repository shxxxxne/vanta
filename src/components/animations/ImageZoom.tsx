'use client';

import Image, { type StaticImageData } from 'next/image';
import { motion } from 'motion/react';

interface ImageZoomProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  sizes?: string;
}

export default function ImageZoom({
  src,
  alt,
  className,
  sizes,
}: ImageZoomProps) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="relative h-full w-full"
        whileHover={{ scale: 1.06 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}