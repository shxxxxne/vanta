import { GALLERY } from '@/data/Gallery';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ImageZoom from '@/components/animations/ImageZoom';
import { cn } from '@/lib/utils';

/**
 * Mosaic slots, one per GALLERY item (same order).
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

const SIZES = [
  '(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw',
  '(min-width: 1280px) 320px, (min-width: 768px) 25vw, 50vw',
  '(min-width: 1280px) 320px, (min-width: 768px) 25vw, 50vw',
  '(min-width: 1280px) 320px, (min-width: 768px) 25vw, 100vw',
  '(min-width: 1280px) 640px, (min-width: 768px) 50vw, 50vw',
  '(min-width: 1280px) 640px, (min-width: 768px) 50vw, 50vw',
] as const;

export default function GalleryPreview() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="section-y section-alt relative overflow-hidden"
    >
      {/* Ambient radial glow so the section never reads as a flat block */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[min(60rem,140%)] -translate-x-1/2 bg-radial-[closest-side] from-lime/10 to-transparent"
      />

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Inside VANTA"
            title={
              <span id="gallery-heading">
                The floor, the equipment, the people.
              </span>
            }
            description="A look at the space before you walk in."
          />

          <ul className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:mt-14 md:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[16rem]">
            {GALLERY.slice(0, SLOTS.length).map((item, i) => (
              <li
                key={item.id}
                className={cn(
                  'group relative isolate overflow-hidden rounded-xl border border-line bg-surface-raised',
                  SLOTS[i],
                )}
              >
                <ImageZoom
                  src={item.image}
                  alt={item.alt}
                  sizes={SIZES[i]}
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
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
