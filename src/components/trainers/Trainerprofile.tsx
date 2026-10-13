import Link from 'next/link';

import ButtonPress from '@/components/animations/ButtonPress';
import ImageZoom from '@/components/animations/ImageZoom';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Container from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/data/Site';
import { cn } from '@/lib/utils';
import type { Trainer } from '@/types/trainer';

interface TrainerProfileProps {
  trainer: Trainer;
  /**
   * Optional extras that aren't in the Trainer type yet (certifications,
   * achievements, who they coach best). Add them to types/trainer.ts and
   * data/Trainers.ts later and pass them straight through.
   */
  highlights?: string[];
  /** Use "h1" when this is the main heading of a /trainers/[id] page. */
  as?: 'h1' | 'h2';
  /** Flip image and text on desktop, useful when stacking several profiles. */
  reverse?: boolean;
  ctaHref?: string;
  className?: string;
}

/**
 * Detailed trainer view (for a future /trainers/[id] page or a modal).
 * Mobile: photo on top, details below. lg: two columns with a sticky photo.
 */
export default function TrainerProfile({
  trainer,
  highlights,
  as: Heading = 'h2',
  reverse = false,
  ctaHref = '/#trial',
  className,
}: TrainerProfileProps) {
  const firstName = trainer.name.split(' ')[0];
  const headingId = `trainer-${trainer.id}-name`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn('section-y', className)}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Photo */}
          <ScrollReveal
            className={cn(
              'lg:sticky lg:top-[calc(var(--nav-height)+2rem)]',
              reverse && 'lg:order-2',
            )}
          >
            <ImageZoom
              src={trainer.image}
              alt={trainer.imageAlt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="relative aspect-[4/5] w-full rounded-xl border border-line bg-surface-raised sm:aspect-[4/3] lg:aspect-[4/5]"
            />
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal delay={0.1} className="flex flex-col gap-8">
            <div>
              <Badge variant="outline" size="md">
                {trainer.title}
              </Badge>

              <Heading
                id={headingId}
                className="mt-5 font-display text-4xl font-bold text-foreground md:text-5xl"
              >
                {trainer.name}
              </Heading>

              <p className="mt-5 max-w-[60ch] text-base text-muted-foreground md:text-lg">
                {trainer.description}
              </p>
            </div>

            {/* Quick facts */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              <div className="flex flex-col gap-2 bg-surface p-5">
                <dt className="order-2 text-sm text-muted-foreground">
                  Years coaching
                </dt>
                <dd className="stat-number order-1">
                  {trainer.yearsOfExperience}
                </dd>
              </div>
              <div className="flex flex-col gap-2 bg-surface p-5">
                <dt className="order-2 text-sm text-muted-foreground">
                  Specialty
                </dt>
                <dd className="order-1 font-display text-lg font-semibold leading-tight text-foreground">
                  {trainer.title}
                </dd>
              </div>
            </dl>

            {/* Optional highlights */}
            {highlights && highlights.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Good to know
                </h3>
                <ul className="mt-4 flex flex-col gap-3.5">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                      <CheckIcon />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <ButtonPress className="w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={ctaHref}>Train with {firstName}</Link>
                </Button>
              </ButtonPress>
              <ButtonPress className="w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <a href={SITE.contact.phoneHref}>Call {SITE.contact.phone}</a>
                </Button>
              </ButtonPress>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 size-4 shrink-0 text-lime"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}