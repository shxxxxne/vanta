import Link from 'next/link';

import { PROGRAMS } from '@/data/Programs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/Sectionheading';
import ScrollReveal from '@/components/animations/ScrollReveal';
import HoverLift from '@/components/animations/HoverLift';
import ButtonPress from '@/components/animations/ButtonPress';
import Container from '@/components/layout/Container';

const FEATURED_PROGRAM_IDS = [
  'strength-foundations',
  'hypertrophy-lab',
  'beginner-rebuild',
];

const featuredPrograms = FEATURED_PROGRAM_IDS.map((id) =>
  PROGRAMS.find((program) => program.id === id)
).filter((program) => program !== undefined);

export default function FeaturedPrograms() {
  return (
    <section id="programs" className="section-y" aria-labelledby="programs-title">
      <Container>
        {/* One reveal for the whole section (blueprint: per section, not per card) */}
        <ScrollReveal className="flex flex-col gap-10 md:gap-14">
          <SectionHeading
            eyebrow="Programs"
            title={<span id="programs-title">Our most popular training</span>}
            description="Three programs members start with. Pick one and your coach handles the programming."
          />

          {/* Mobile: 1 column, desktop: 3 columns */}
          <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            {featuredPrograms.map((program) => (
              <li key={program.id} className="flex">
                <HoverLift className="flex w-full">
                  <article className="group flex w-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-(--duration-base) hover:border-primary/60 md:p-8">
                    <Badge variant="outline" className="self-start">
                      {program.tag}
                    </Badge>

                    <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
                      {program.title}
                    </h3>

                    <p className="mt-3 flex-1 text-base text-muted-foreground">
                      {program.description}
                    </p>

                    <Link
                      href={program.ctaHref}
                      className="mt-8 inline-flex items-center gap-2 self-start font-sans text-sm font-semibold text-primary transition-[gap] duration-(--duration-base) group-hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      {program.ctaLabel}
                      <ArrowIcon />
                    </Link>
                  </article>
                </HoverLift>
              </li>
            ))}
          </ul>

          {/* Explore all */}
          <div className="flex justify-center">
            <ButtonPress className="w-full sm:w-auto">
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="/programs">Explore all programs</Link>
              </Button>
            </ButtonPress>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}