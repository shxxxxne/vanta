'use client';

import { useId } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/utils';
import { inputStyles } from '@/components/ui/Input';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: readonly SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
}

export default function Select({
  label,
  options,
  value,
  onValueChange,
  placeholder,
  hint,
  error,
  id,
  name,
  required,
  className,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;
  const message = error ?? hint;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-muted-foreground" aria-hidden>
            *
          </span>
        )}
      </label>

      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        name={name}
      >
        <SelectPrimitive.Trigger
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            inputStyles,
            'flex cursor-pointer items-center justify-between gap-2 text-left data-[placeholder]:text-muted-foreground data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-ring/40',
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            collisionPadding={16}
            className="z-[var(--z-modal)] max-h-[min(20rem,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-line-strong bg-card text-foreground shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in-0"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex h-10 cursor-pointer select-none items-center rounded-md pr-9 pl-3 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[state=checked]:font-semibold data-[state=checked]:text-primary"
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-3 text-primary">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                      aria-hidden="true"
                    >
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

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
 * Select: branded dropdown (Radix Select) that matches Input.
 * Highlight = graphite (`accent`), chosen option = lime (`primary`),
 * so no browser-default blue ever shows.
 *
 * @example
 * <Select
 *   label="Training goal"
 *   placeholder="Select your goal"
 *   options={TRAINING_GOALS}
 *   value={goal}
 *   onValueChange={setGoal}
 * />
 */
