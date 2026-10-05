import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export default function Container({
  className,
  ...props
}: ComponentProps<'div'>) {
  return <div className={cn('container-vanta', className)} {...props} />;
}
