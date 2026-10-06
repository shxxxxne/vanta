import Link from 'next/link';

import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import HoverLift from '@/components/animations/HoverLift';
import ButtonPress from '@/components/animations/ButtonPress';
import { getMembershipsByIds } from '@/data/Memberships';
import { cn } from '@/lib/utils';
import type { Membership, MembershipOrder } from '@/types/membership';

interface FeaturedMembershipsProps {
  /** Exactly 3 plan ids in display order: 1st, 2nd (most popular), 3rd */
  planIds?: MembershipOrder;
}

const DEFAULT_ORDER: MembershipOrder = ['starter', 'performance', 'elite'];

/** The middle card (index 1) is always the most popular one. */
const POPULAR_INDEX = 1;

export default function FeaturedMemberships({
  planIds = DEFAULT_ORDER,
}: FeaturedMembershipsProps) {
  const plans = getMembershipsByIds(planIds);

  return (
    <section id="memberships" className=" section-y section-alt">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Memberships"
            title={
              <>
                Plans built around how
                <br />
                often you train
              </>
            }
            description="Every plan includes full gym floor access. Upgrade for coaching and priority booking."
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.id} delay={index * 0.12} className="h-full">
              <HoverLift className="h-full">
                <PlanCard plan={plan} popular={index === POPULAR_INDEX} />
              </HoverLift>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

interface PlanCardProps {
  plan: Membership;
  popular: boolean;
}

function PlanCard({ plan, popular }: PlanCardProps) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-2xl border bg-surface-raised p-6 sm:p-8',
        popular
          ? 'border-primary shadow-[0_0_40px_-12px_var(--vanta-lime)]'
          : 'border-line',
      )}
    >
      {popular && (
        <Badge className="absolute -top-3 left-6 sm:left-8">Most Popular</Badge>
      )}

      <header>
        <h3 className="font-display text-xl font-bold text-foreground">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.duration}</p>
      </header>

      {/* Price (highlighted) */}
      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-sm font-medium text-muted-foreground">LKR</span>
        <span className="font-display text-4xl font-bold leading-none tracking-tight text-lime sm:text-5xl">
          {plan.price.toLocaleString('en-US')}
        </span>
        <span className="text-sm text-muted-foreground">/mo</span>
      </p>

      <ul className="mt-8 flex flex-1 flex-col gap-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <CheckIcon />
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <ButtonPress className="mt-8">
        <Button
          asChild
          size="lg"
          variant={popular ? 'primary' : 'outline'}
          className="w-full"
        >
          <Link href="#trial">{plan.ctaLabel}</Link>
        </Button>
      </ButtonPress>
    </article>
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
      className="mt-0.5 size-4 shrink-0 text-lime"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
