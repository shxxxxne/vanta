import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import HoverLift from '@/components/animations/HoverLift';
import ImageZoom from '@/components/animations/ImageZoom';
import ButtonPress from '@/components/animations/ButtonPress';
import { cn } from '@/lib/utils';
import type { Trainer } from '@/types/trainer';

interface TrainerCardProps {
  trainer: Trainer;
  /** Where "Train with [name]" goes. Defaults to the trial form on the home page. */
  ctaHref?: string;
  /** When set, the name becomes a link to the detailed profile (e.g. /trainers/kavindu-perera). */
  profileHref?: string;
  className?: string;
}

export default function TrainerCard({
  trainer,
  ctaHref = '/#trial',
  profileHref,
  className,
}: TrainerCardProps) {
  const firstName = trainer.name.split(' ')[0];

  return (
    <HoverLift className={cn('h-full', className)}>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-(--duration-base) hover:border-line-strong">
        {/* Photo */}
        <ImageZoom
          src={trainer.image}
          alt={trainer.imageAlt}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="relative aspect-[4/5] w-full"
        />

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-sm font-medium text-primary">
            {trainer.yearsOfExperience} years experience
          </p>

          <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
            {profileHref ? (
              <Link
                href={profileHref}
                className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {trainer.name}
              </Link>
            ) : (
              trainer.name
            )}
          </h3>

          <p className="mt-1 text-base font-medium text-foreground/80">
            {trainer.title}
          </p>

          <p className="mt-3 max-w-[60ch] flex-1 text-sm text-muted-foreground sm:text-base">
            {trainer.description}
          </p>

          <ButtonPress className="mt-6">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href={ctaHref}>Train with {firstName}</Link>
            </Button>
          </ButtonPress>
        </div>
      </article>
    </HoverLift>
  );
}
