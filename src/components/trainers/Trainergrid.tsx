import ScrollReveal from '@/components/animations/ScrollReveal';
import TrainerCard from '@/components/trainers/Trainercard';
import { TRAINERS } from '@/data/Trainers';
import { cn } from '@/lib/utils';
import type { Trainer } from '@/types/trainer';

interface TrainerGridProps {
  /** Defaults to every trainer in data/Trainers.ts */
  trainers?: readonly Trainer[];
  /** Pass a function to link each card to a profile page, e.g. (t) => `/trainers/${t.id}` */
  getProfileHref?: (trainer: Trainer) => string;
  /** Passed to every card's CTA */
  ctaHref?: string;
  className?: string;
}

/** Cards per row on desktop, used to stagger the reveal by column. */
const COLUMNS = 3;

/**
 * Layout for trainer cards.
 * Mobile: 1 column, md: 2 columns, lg: 3 columns.
 */
export default function TrainerGrid({
  trainers = TRAINERS,
  getProfileHref,
  ctaHref,
  className,
}: TrainerGridProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8',
        className,
      )}
    >
      {trainers.map((trainer, index) => (
        <li key={trainer.id} className="flex">
          <ScrollReveal
            delay={(index % COLUMNS) * 0.12}
            className="flex w-full"
          >
            <TrainerCard
              trainer={trainer}
              ctaHref={ctaHref}
              profileHref={getProfileHref?.(trainer)}
              className="w-full"
            />
          </ScrollReveal>
        </li>
      ))}
    </ul>
  );
}
