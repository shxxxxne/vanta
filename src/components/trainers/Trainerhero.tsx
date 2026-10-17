import Link from 'next/link';

import HeroReveal from '@/components/animations/HeroReveal';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/Sectionheading';
import { SITE } from '@/data/Site';
import { TRAINERS } from '@/data/Trainers';

interface TrainerHeroStat {
  value: string;
  label: string;
}

interface TrainerHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Defaults to stats calculated from data/Trainers.ts */
  stats?: TrainerHeroStat[];
}

const totalYears = TRAINERS.reduce(
  (sum, trainer) => sum + trainer.yearsOfExperience,
  0,
);

const DEFAULT_STATS: TrainerHeroStat[] = [
  { value: String(TRAINERS.length), label: 'Featured coaches' },
  { value: `${totalYears}+`, label: 'Combined years coaching' },
  { value: '1:1', label: 'Coaching on the floor' },
];

export default function TrainerHero({
  eyebrow = 'Coaching staff',
  title = 'Coaches who train the way they teach',
  description = 'Every VANTA coach is certified, competes or trains seriously themselves, and is on the floor with you, correcting form and adjusting your plan week to week.',
  stats = DEFAULT_STATS,
}: TrainerHeroProps) {
  return (
    <section
      aria-labelledby="trainers-hero-title"
      className="section-y relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--vanta-lime)_14%,transparent),transparent_60%)] pt-[calc(var(--nav-height)+3rem)] md:pt-[calc(var(--nav-height)+4rem)]"
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <HeroReveal>
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={<span id="trainers-hero-title">{title}</span>}
            description={description}
          />
        </HeroReveal>

        <HeroReveal
          delay={0.15}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/#trial">Book a Free Trial</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <a href={SITE.contact.phoneHref}>Call {SITE.contact.phone}</a>
          </Button>
        </HeroReveal>

        <HeroReveal delay={0.3}>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 bg-surface p-5 md:p-6"
              >
                <dt className="order-2 text-sm text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="stat-number order-1">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </HeroReveal>
      </Container>
    </section>
  );
}