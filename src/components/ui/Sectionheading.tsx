import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string | ReactNode;
  description?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  action?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  title,
  description,
  eyebrow,
  align = 'left',
  as: Heading = 'h2',
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        centered
          ? 'items-center text-center'
          : 'sm:flex-row sm:items-end sm:justify-between sm:gap-8',
        className,
      )}
    >
      <div className={cn('max-w-4xl', centered && 'mx-auto')}>
        {eyebrow && (
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <Heading className="font-display text-3xl font-bold text-foreground md:text-4xl">
          {title}
        </Heading>
        {description && (
          <p className="mt-4 max-w-[60ch] text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/**
 * SectionHeading: reusable title + description block for every section.

 * Props
 * - `title`       required. Rendered with the display font and fluid type scale.
 * - `description` optional supporting line (kept under ~60ch for readability).
 * - `eyebrow`     optional small label above the title. Use only when it adds
 *                 information (e.g. a location), not on every section.
 * - `align`       "left" (default) or "center".
 * - `as`          heading level, "h2" (default). Use "h1" once per page.
 * - `action`      optional node on the right (e.g. a "View all" button).
 *                 Only shown when `align="left"`.

 * @example
 * // Basic section
 * <SectionHeading
 *   title="Training programs"
 *   description="Six structured programs. Pick one and we handle the programming."
 * />

 * @example
 * // Centered, for pricing
 * <SectionHeading align="center" title="Pick your plan" description="No joining fee." />

 * @example
 * // Page title with an action
 * <SectionHeading
 *   as="h1"
 *   title="Meet the coaches"
 *   action={<Button asChild variant="outline"><Link href="/contact">Talk to us</Link></Button>}
 * />

 * Tip: put it inside `<ScrollReveal>` so the heading uses the one-per-section
 * reveal from your motion rules:
 *   <ScrollReveal><SectionHeading title="..." /></ScrollReveal>
 */
