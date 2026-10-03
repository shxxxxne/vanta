import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors duration-(--duration-fast) [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        lime: 'bg-primary text-primary-foreground',
        outline: 'border border-line-strong text-foreground',
        muted: 'bg-surface-raised text-muted-foreground',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'lime',
      size: 'sm',
    },
  },
);

type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { badgeVariants };

/**
 * Badge: a small label such as "Most Popular" or "New".

 * Variants
 * - `lime`    solid accent. Use sparingly: one per section at most
 *             (the recommended membership plan, a new program).
 * - `outline` bordered, for neutral tags (program level, zone name).
 * - `muted`   quiet filled chip for secondary info (duration, "6 weeks").

 * Sizes: `sm` (default) and `md`.

 * @example
 * // Recommended plan on a pricing card
 * <Badge>Most Popular</Badge>

 * @example
 * // Neutral tag on a program card
 * <Badge variant="outline">Beginner friendly</Badge>

 * @example
 * // With an icon and a custom class
 * <Badge variant="muted" size="md" className="absolute right-4 top-4">
 *   <Icon name="clock" size="sm" /> 45 min
 * </Badge>
 */
