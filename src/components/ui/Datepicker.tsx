'use client';

import { useId, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { inputStyles } from '@/components/ui/Input';

/** 'YYYY-MM-DD' -> local Date (avoids the UTC off-by-one bug). */
export function parseISODate(value: string): Date | undefined {
  if (!value) return undefined;
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toISODate(date: Date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
}

export function formatDisplayDate(value: string) {
  const date = parseISODate(value);
  return date
    ? date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
}

interface DatePickerProps {
  label: string;
  value: string; // YYYY-MM-DD or ''
  onValueChange: (value: string) => void;
  /** Earliest selectable date, YYYY-MM-DD. */
  min?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  id?: string;
  required?: boolean;
  className?: string;
}

export default function DatePicker({
  label,
  value,
  onValueChange,
  min,
  placeholder = 'Select a date',
  hint,
  error,
  id,
  required,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const messageId = `${triggerId}-message`;
  const message = error ?? hint;
  const selected = parseISODate(value);
  const minDate = parseISODate(min ?? '');

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={triggerId} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-muted-foreground" aria-hidden>
            *
          </span>
        )}
      </label>

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            id={triggerId}
            type="button"
            aria-invalid={error ? true : undefined}
            aria-describedby={message ? messageId : undefined}
            className={cn(
              inputStyles,
              'flex cursor-pointer items-center justify-between gap-2 text-left data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-ring/40',
              !value && 'text-muted-foreground',
              className,
            )}
          >
            <span className="truncate">
              {value ? formatDisplayDate(value) : placeholder}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={6}
            collisionPadding={16}
            className="z-[var(--z-modal)] rounded-xl border border-line-strong bg-card p-3 text-foreground shadow-xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0"
          >
            <DayPicker
              mode="single"
              selected={selected}
              defaultMonth={selected ?? minDate}
              disabled={minDate ? { before: minDate } : undefined}
              onSelect={(date) => {
                if (!date) return;
                onValueChange(toISODate(date));
                setOpen(false);
              }}
              classNames={{
                root: 'w-fit',
                months: 'relative flex flex-col',
                month: 'flex flex-col gap-2',
                month_caption: 'flex h-9 items-center justify-center',
                caption_label: 'font-display text-sm font-semibold',
                nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
                button_previous:
                  'inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30',
                button_next:
                  'inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30',
                chevron: 'size-4 fill-current',
                month_grid: 'border-collapse',
                weekdays: 'flex',
                weekday:
                  'w-10 py-2 text-center text-xs font-medium text-muted-foreground',
                week: 'flex',
                day: 'size-10 p-0 text-center text-sm',
                day_button:
                  'size-10 cursor-pointer rounded-md transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary',
                today: '[&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-primary',
                selected:
                  '[&>button]:bg-primary [&>button]:font-semibold [&>button]:text-primary-foreground [&>button:hover]:bg-lime-hover',
                outside: 'opacity-40',
                disabled:
                  'opacity-30 [&>button]:cursor-not-allowed [&>button:hover]:bg-transparent',
                hidden: 'invisible',
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={cn(
            'text-sm',
            error ? 'text-destructive' : 'text-muted-foreground',
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}

/**
 * DatePicker: branded calendar popover (react-day-picker + Radix Popover).
 * Selected day = lime, today = lime ring, hover = graphite. No native blue.
 * Value is a 'YYYY-MM-DD' string, same as <input type="date">.
 */