import ImageZoom from '@/components/animations/ImageZoom';
import { cn } from '@/lib/utils';
import type { GalleryImage } from '@/types/gallery';

interface GalleryItemProps {
  item: GalleryImage;
  /** Grid placement classes (col/row spans) supplied by GalleryMosaic */
  className?: string;
  /** next/image `sizes` hint for this tile */
  sizes?: string;
  /** Set true for tiles that render above the fold */
  priority?: boolean;
}

export default function GalleryItem({
  item,
  className,
  sizes,
}: GalleryItemProps) {
  return (
    <li
      className={cn(
        'group relative isolate overflow-hidden rounded-xl border border-line bg-surface-raised',
        className,
      )}
    >
      <ImageZoom
        src={item.image}
        alt={item.alt}
        sizes={sizes}
        className="absolute inset-0 h-full w-full"
      />

      {/* Legibility: dark radial pooled in the bottom-left corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-[120%_90%_at_0%_100%] from-surface/90 from-0% via-surface/55 via-35% to-transparent to-70%"
      />

      {/* Accent: faint lime bloom top-right, brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-[70%_60%_at_100%_0%] from-lime/15 to-transparent to-65% opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      <p className="absolute bottom-0 left-0 p-3 font-display text-sm font-semibold text-foreground sm:p-4 sm:text-base lg:p-5 lg:text-lg">
        {item.title}
      </p>
    </li>
  );
}

/**
 * GalleryItem: one tile in the gallery mosaic (a <li>, so render it inside
 * a <ul>). It owns the image, the overlays and the zone label. It does NOT
 * decide its own size; GalleryMosaic passes the grid span via `className`.
 *
 * @example
 * <ul className="grid grid-cols-2 gap-3">
 *   <GalleryItem item={GALLERY[0]} className="col-span-2 row-span-2" />
 * </ul>
 */
