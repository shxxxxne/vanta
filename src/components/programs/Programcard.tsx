import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import HoverLift from '@/components/animations/HoverLift';
import { Badge } from '@/components/ui/Badge';
import type { Program } from '@/types/program';

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const { id, title, description, tag, ctaLabel, ctaHref } = program;

  return (
    <HoverLift className="flex h-full w-full">
      <article
        aria-labelledby={`program-${id}-title`}
        className="group flex w-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-(--duration-base) hover:border-primary/60 md:p-8"
      >
        <Badge variant="outline" className="self-start">
          {tag}
        </Badge>

        <h3
          id={`program-${id}-title`}
          className="mt-6 font-display text-2xl font-bold text-foreground"
        >
          {title}
        </h3>

        <p className="mt-3 flex-1 text-base text-muted-foreground">
          {description}
        </p>

        <Link
          href={ctaHref}
          className="mt-8 inline-flex items-center gap-2 self-start font-sans text-sm font-semibold text-primary transition-[gap] duration-(--duration-base) group-hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </article>
    </HoverLift>
  );
}

/**
 * ProgramCard: one program (tag, title, description, CTA).
 * Matches the card style used in home/FeaturedPrograms.
 * Data comes from `data/Programs.ts` (see `types/program.ts`).
 *
 * @example
 * <ProgramCard program={PROGRAMS[0]} />
 */
