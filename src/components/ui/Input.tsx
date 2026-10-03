import { useId, type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export const inputStyles =
  'h-11 w-full rounded-lg border border-input bg-card px-3.5 text-base text-foreground placeholder:text-muted-foreground transition-colors duration-(--duration-fast) hover:border-line-strong focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/40';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  hint?: string;
  error?: string;
}

export default function Input({
  label,
  hint,
  error,
  id,
  className,
  required,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-muted-foreground" aria-hidden>
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(inputStyles, className)}
        {...props}
      />

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
 * Input: reusable text field with label, hint and error message built in.

 * Props
 * - `label`  visible label. Always provide one (accessibility + clarity).
 * - `hint`   short helper text under the field.
 * - `error`  error message. Turns the border red, sets `aria-invalid`, and
 *            replaces the hint. Say what went wrong and how to fix it.
 * - Any native input prop works: type, name, placeholder, required,
 *   value / onChange, autoComplete, inputMode, ref (React 19 passes it as a prop).

 * @example
 * // Basic field
 * <Input label="Full name" name="name" autoComplete="name" required />

 * @example
 * // Phone with hint
 * <Input
 *   label="Phone"
 *   name="phone"
 *   type="tel"
 *   inputMode="tel"
 *   hint="We'll call to confirm your session."
 * />

 * @example
 * // Controlled, with validation error (see lib/validations.ts)
 * const [email, setEmail] = useState('');
 * const [error, setError] = useState('');
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   onBlur={() => setError(isEmail(email) ? '' : 'Enter a valid email, like name@mail.com')}
 *   error={error}
 * />

 * Tip: if you need a bare field without the label wrapper (for example inside
 * a custom layout), render a plain `<input className={inputStyles} />` using
 * the `inputStyles` export below and add your own label.
 */
