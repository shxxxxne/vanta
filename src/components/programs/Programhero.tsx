import Link from 'next/link';

import HeroReveal from '@/components/animations/HeroReveal';
import Container from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PROGRAMS } from '@/data/Programs';

interface ProgramHeroProps {
  eyebrow?: string;
  /** Where the primary button goes. Defaults to the home page trial section. */
  trialHref?: string;
}

export default function ProgramHero({
  eyebrow = 'Training programs',
  trialHref = '/#trial',
}: ProgramHeroProps) {
  return (
    <section
      aria-labelledby="programs-hero-title"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--vanta-lime)_14%,transparent),transparent_60%)] pt-[calc(var(--nav-height)+3rem)] pb-12 md:pt-[calc(var(--nav-height)+5rem)] md:pb-20"
    >
      <Container className="flex flex-col gap-6 md:gap-8">
        <HeroReveal>
          <Badge variant="outline" size="md" className="text-muted-foreground">
            {eyebrow}
          </Badge>
        </HeroReveal>

        <HeroReveal delay={0.1}>
          <h2
            id="programs-hero-title"
            className="font-display text-4xl font-bold tracking-(--tracking-display) text-foreground md:text-[length:var(--text-hero)] md:leading-[var(--leading-tight)]"
          >
            Pick a program
          </h2>
        </HeroReveal>

        <HeroReveal delay={0.2}>
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            {PROGRAMS.length} structured programs for strength, size,
            conditioning and beginners. Every one is coached on the floor and
            adjusted to your progress.
          </p>
        </HeroReveal>

        <HeroReveal
          delay={0.3}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <Button
            asChild
            size="lg"
            className="press w-full px-8 text-base sm:w-auto"
          >
            <Link href={trialHref}>Book a Free Trial</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="press w-full px-8 text-base sm:w-auto"
          >
            <Link href="#program-list">Browse programs</Link>
          </Button>
        </HeroReveal>
      </Container>
    </section>
  );
}
