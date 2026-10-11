import Link from 'next/link';
import { Check } from 'lucide-react';

import HeroReveal from '@/components/animations/HeroReveal';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/data/Site';

interface MembershipHeroProps {
  eyebrow?: string;
  highlights?: string[];
}

const DEFAULT_HIGHLIGHTS = [
  'Full gym floor access on every plan',
  'Free onboarding session to start',
  'Free trial before you commit',
];

export default function MembershipHero({
  eyebrow = 'Memberships',
  highlights = DEFAULT_HIGHLIGHTS,
}: MembershipHeroProps) {
  return (
    <section
      aria-labelledby="memberships-hero-title"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--vanta-lime)_14%,transparent),transparent_60%)] pb-6 pt-[calc(var(--nav-height)+3rem)] md:pb-10 md:pt-[calc(var(--nav-height)+5rem)]"
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <HeroReveal>
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={
              <span id="memberships-hero-title">
                Plans built around how
                <br />
                often you train
              </span>
            }
            description="Pick the level of coaching that fits your week. Every plan gives you the full gym floor. Upgrade for classes, personal training and priority booking."
          />
        </HeroReveal>

        <HeroReveal delay={0.15}>
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-foreground sm:text-base"
              >
                <Check
                  className="size-4 shrink-0 text-lime"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </HeroReveal>

        <HeroReveal
          delay={0.3}
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
      </Container>
    </section>
  );
}
