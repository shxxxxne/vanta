import { MapPin, Navigation } from 'lucide-react';

import ButtonPress from '@/components/animations/ButtonPress';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/data/Site';
import { cn } from '@/lib/utils';

interface LocationMapProps {
  className?: string;
}

export default function LocationMap({ className }: LocationMapProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface-raised',
        className,
      )}
    >
      {/* Map. The filter darkens Google's light tiles to match the brand;
          delete the `[filter:...]` class to show the default colours. */}
      <div className="relative aspect-[4/3] w-full flex-1 bg-card sm:aspect-[16/9] lg:aspect-auto lg:min-h-[26rem]">
        <iframe
          title={`Map showing VANTA at ${SITE.address.full}`}
          src={SITE.map.embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.9)_contrast(0.9)]"
        />
      </div>

      {/* Address + directions */}
      <div className="flex flex-col gap-4 border-t border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <MapPin
            className="mt-0.5 size-5 shrink-0 text-lime"
            aria-hidden="true"
          />
          <address className="not-italic">
            <p className="font-display text-base font-semibold text-foreground">
              {SITE.name}, {SITE.address.area}
            </p>
            <p className="text-sm text-muted-foreground">
              {SITE.address.line1}, {SITE.address.country}
            </p>
          </address>
        </div>

        <ButtonPress className="w-full sm:w-auto">
          <Button asChild size="lg" className="w-full gap-2 sm:w-auto">
            <a
              href={SITE.map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="size-4" aria-hidden="true" />
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </ButtonPress>
      </div>
    </div>
  );
}
