import Link from 'next/link';

import HeroReveal from '@/components/animations/HeroReveal';
import Container from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  eyebrow?: string;
  stats?: HeroStat[];
}

const DEFAULT_STATS: HeroStat[] = [
  { value: '500+', label: 'Active members' },
  { value: '12', label: 'Certified coaches' },
  { value: '3,200', label: 'Sq ft training floor' },
  { value: '6', label: 'Core programs' },
];

export default function Hero({
  eyebrow = 'Colombo 03 · Now training new members',
  stats = DEFAULT_STATS,
}: HeroProps) {
  return (
    <section
      id="home"
      className="hero-glow relative flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--vanta-lime)_18%,transparent),transparent_60%)] pt-12 md:pt-16"
    >
      <Container className="section-y flex flex-col gap-8 md:gap-10">
        <HeroReveal>
          <Badge
            variant="outline"
            className="border-line-strong px-3 py-1.5 text-xs tracking-widest text-muted-foreground uppercase"
          >
            {eyebrow}
          </Badge>
        </HeroReveal>

        <HeroReveal delay={0.1}>
          <h1 className="display">
            Built
            <br />
            Different
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.2}>
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            A private training ground for people serious about getting
            stronger. Structured programming, real coaching, and a floor built
            for output not a place to just show up.
          </p>
        </HeroReveal>

        <HeroReveal
          delay={0.3}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <Button
            asChild
            size="lg"
            className="press h-12 w-full px-8 text-base font-semibold sm:w-auto"
          >
            <Link href="#trial">Book a Free Trial</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="press h-12 w-full border-line-strong bg-transparent px-8 text-base font-semibold sm:w-auto"
          >
            <Link href="#programs">View Programs</Link>
          </Button>
        </HeroReveal>

        <HeroReveal delay={0.45}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
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