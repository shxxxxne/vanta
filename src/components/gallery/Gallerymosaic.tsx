import { GALLERY } from '@/data/Gallery';
import { cn } from '@/lib/utils';
import type { GalleryImage } from '@/types/gallery';

import GalleryItem from '@/components/gallery/Galleryitem';

/**
 * Mosaic slots, one per gallery item (same order).
 * Grid: 2 cols on mobile, 4 cols from md.
 *
 * Mobile (2 cols)        md+ (4 cols)
 * [ 1 1 ]                [ 1 1 ][ 2 ][ 3 ]
 * [ 1 1 ]                [ 1 1 ][ 4 ][ 3 ]
 * [ 2 ][ 3 ]             [  5  5 ][  6  6 ]
 * [   4   ]
 * [ 5 ][ 6 ]
 */
const SLOTS = [
  'col-span-2 row-span-2',
  '',
  'md:row-span-2',
  'col-span-2 md:col-span-1',
  'md:col-span-2',
  'md:col-span-2',
] as const;

/** Matching next/image `sizes` hint for each slot. */
const SIZES = [
  '(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw',
  '(min-width: 1280px) 320px, (min-width: 768px) 25vw, 50vw',
  '(min-width: 1280px) 320px, (min-width: 768px) 25vw, 50vw',
  '(min-width: 1280px) 320px, (min-width: 768px) 25vw, 100vw',
  '(min-width: 1280px) 640px, (min-width: 768px) 50vw, 50vw',
  '(min-width: 1280px) 640px, (min-width: 768px) 50vw, 50vw',
] as const;

interface GalleryMosaicProps {
  /** Defaults to the project GALLERY data. Only the first 6 are shown. */
  items?: readonly GalleryImage[];
  className?: string;
}

export default function GalleryMosaic({
  items = GALLERY,
  className,
}: GalleryMosaicProps) {
  return (
    <ul
      className={cn(
        'grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[16rem]',
        className,
      )}
    >
      {items.slice(0, SLOTS.length).map((item, i) => (
        <GalleryItem
          key={item.id}
          item={item}
          className={SLOTS[i]}
          sizes={SIZES[i]}
        />
      ))}
    </ul>
  );
}

/**
 * GalleryMosaic: controls the overall gallery layout.
 * Owns the grid, the slot spans and the image size hints. Each tile is a
 * GalleryItem. Item order matters: the first item gets the largest tile.
 *
 * Props
 * - `items`      optional. Defaults to GALLERY from data/Gallery.ts.
 * - `className`  extra classes for the grid (e.g. top margin).
 *
 * @example
 * // Uses project data
 * <GalleryMosaic className="mt-10 md:mt-14" />
 *
 * @example
 * // Custom set of items
 * <GalleryMosaic items={GALLERY.slice(0, 4)} />
 *
 * Note: no reveal animation here. Wrap it in <ScrollReveal> at the section
 * level (one reveal per section, per the motion rules).
 */