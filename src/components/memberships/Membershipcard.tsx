import Link from 'next/link';
import { Check } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import HoverLift from '@/components/animations/HoverLift';
import ButtonPress from '@/components/animations/ButtonPress';
import { cn } from '@/lib/utils';
import type { Membership } from '@/types/membership';

interface MembershipCardProps {
  plan: Membership;
  /** Highlights the card with the lime border, glow and "Most Popular" badge. */
  popular?: boolean;
  /** Where the CTA goes. "/#trial" works from the home page and /memberships. */
  ctaHref?: string;
  className?: string;
}

export default function MembershipCard({
  plan,
  popular = false,
  ctaHref = '/#trial',
  className,
}: MembershipCardProps) {
  const titleId = `plan-${plan.id}-title`;

  return (
    <HoverLift className={cn('h-full', className)}>
      <article
        aria-labelledby={titleId}
        className={cn(
          'relative flex h-full flex-col rounded-2xl border bg-surface-alt p-8 sm:p-8',
          popular
            ? 'border-primary shadow-[0_0_40px_-12px_var(--vanta-lime)]'
            : 'border-line',
        )}
      >
        {popular && (
          <Badge className="absolute -top-3 left-6 sm:left-8">
            Most Popular
          </Badge>
        )}

        {/* Name + duration */}
        <header>
          <h3
            id={titleId}
            className="font-display text-xl font-bold text-foreground"
          >
            {plan.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{plan.duration}</p>
        </header>

        {/* Price */}
        <p className="mt-6 flex flex-wrap items-baseline gap-1.5">
          <span className="text-sm font-medium text-muted-foreground">LKR</span>
          <span className="font-display text-4xl font-bold leading-none tracking-tight text-lime sm:text-5xl">
            {plan.price.toLocaleString('en-US')}
          </span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </p>

        {/* Features */}
        <ul className="mt-8 flex flex-1 flex-col gap-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <Check
                className="mt-0.5 size-4 shrink-0 text-lime"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <ButtonPress className="mt-8">
          <Button
            asChild
            size="lg"
            variant={popular ? 'primary' : 'outline'}
            className="w-full"
          >
            <Link href={ctaHref}>{plan.ctaLabel}</Link>
          </Button>
        </ButtonPress>
      </article>
    </HoverLift>
  );
}
