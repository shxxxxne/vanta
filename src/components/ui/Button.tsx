
import type { ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',

  secondary:
    'border border-border bg-transparent text-foreground hover:bg-accent',

  outline:
    'border border-line-strong bg-transparent text-foreground hover:bg-surface',

  ghost:
    'bg-transparent text-foreground hover:text-primary',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-8 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...(!asChild ? { type } : {})}
      className={[
        'inline-flex items-center justify-center',
        'rounded-md',
        'font-sans font-semibold',
        'transition-colors duration-200',
        'focus-visible:outline-2 focus-visible:outline-primary',
        'focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    />
  );
}

