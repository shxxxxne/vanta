import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-lime-hover',

  secondary:
    'border border-border bg-transparent text-foreground hover:bg-accent',

  ghost: 'bg-transparent text-foreground hover:text-primary',
};

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center',
        'rounded-md px-5 py-2.5',
        'font-sans text-sm font-semibold',
        'transition-colors duration-200',
        'focus-visible:outline-2 focus-visible:outline-primary',
        'focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      ].join(' ')}
      {...props}
    />
  );
}
