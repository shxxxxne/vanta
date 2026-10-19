'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

import ButtonPress from '@/components/animations/ButtonPress';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DatePicker, { formatDisplayDate } from '@/components/ui/Datepicker';
import { Button } from '@/components/ui/Button';
import { TIME_SLOTS, TRAINING_GOALS } from '@/data/Trial';
import { SITE } from '@/data/Site';
import { cn } from '@/lib/utils';
import {
  isEmail,
  isNotEmpty,
  isPhone,
  isTodayOrFuture,
  todayISO,
} from '@/lib/validations';

type Values = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  goal: string;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const FIELD_ORDER: Field[] = ['name', 'phone', 'email', 'date', 'time', 'goal'];

const INITIAL: Values = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  goal: '',
};

const CARD = 'rounded-2xl border border-line bg-surface-raised p-6 sm:p-8';

function validateField(
  field: Field,
  value: string,
  today: string,
): string | undefined {
  switch (field) {
    case 'name':
      return isNotEmpty(value) ? undefined : 'Enter your full name.';

    case 'phone':
      if (!isNotEmpty(value)) return 'Enter your phone number.';
      return isPhone(value)
        ? undefined
        : 'Enter a valid number, like 077 123 4567.';

    case 'email':
      if (!isNotEmpty(value)) return 'Enter your email address.';
      return isEmail(value)
        ? undefined
        : 'Enter a valid email, like name@mail.com.';

    case 'date':
      if (!value) return 'Pick a date for your trial.';
      return !today || isTodayOrFuture(value, today)
        ? undefined
        : 'Pick today or a future date.';

    case 'time':
      return value ? undefined : 'Pick a time slot.';

    case 'goal':
      return value ? undefined : 'Choose a training goal.';
  }
}

function validateAll(values: Values, today: string): Errors {
  const errors: Errors = {};

  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field], today);

    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/**
 * TODO: Replace with your real booking endpoint.
 * The current implementation simulates a successful request.
 */
async function submitTrial(values: Values): Promise<void> {
  // const response = await fetch('/api/trial', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(values),
  // });
  //
  // if (!response.ok) {
  //   throw new Error('Failed to book trial');
  // }

  void values;

  await new Promise((resolve) => setTimeout(resolve, 800));
}

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(todayISO());
  }, []);

  const setField = (field: Field, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Revalidate fields that already display an error.
    setErrors((prev) => {
      if (!prev[field]) return prev;

      return {
        ...prev,
        [field]: validateField(field, value, today),
      };
    });

    // Allow the user to correct and resubmit after a failed request.
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setField(e.target.name as Field, e.target.value);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as Field;

    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, e.target.value, today),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'submitting') return;

    const nextErrors = validateAll(values, today);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);

    if (firstInvalid) {
      document.getElementById(`trial-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      await submitTrial(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setStatus('idle');
  };

  const selectedSlot = TIME_SLOTS.find((slot) => slot.value === values.time);

  if (status === 'success') {
    return (
      <div
        role="status"
        className={cn(CARD, 'flex flex-col items-start gap-5', className)}
      >
        <span
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-lg border border-line-strong bg-card text-lime"
        >
          <CheckCircle2 className="size-6" strokeWidth={1.75} />
        </span>

        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            You're booked in, {values.name.trim().split(' ')[0]}.
          </h2>

          <p className="mt-2 text-base text-muted-foreground">
            We'll call {values.phone} to confirm your free trial on{' '}
            {formatDisplayDate(values.date)}
            {selectedSlot ? ` at ${selectedSlot.label}` : ''}.
          </p>
        </div>

        <Button variant="outline" onClick={reset}>
          Book another trial
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="trial-form-title"
      className={cn(CARD, className)}
    >
      <h2
        id="trial-form-title"
        className="font-display text-2xl font-bold text-foreground"
      >
        Book your free trial
      </h2>

      <p className="mt-2 text-base text-muted-foreground">
        Ready to train with VANTA? Choose a convenient time and tell us what you
        want to achieve.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            id="trial-name"
            name="name"
            label="Full name"
            placeholder="Your full name"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
          />
        </div>

        <Input
          id="trial-phone"
          name="phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          placeholder="077 123 4567"
          autoComplete="tel"
          required
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
        />

        <Input
          id="trial-email"
          name="email"
          label="Email address"
          type="email"
          inputMode="email"
          placeholder="name@mail.com"
          autoComplete="email"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />

        <DatePicker
          id="trial-date"
          label="Preferred date"
          placeholder="Select a date"
          min={today || undefined}
          required
          value={values.date}
          onValueChange={(value) => setField('date', value)}
          error={errors.date}
        />

        <Select
          id="trial-time"
          label="Preferred time"
          placeholder="Select a time"
          options={TIME_SLOTS}
          required
          value={values.time}
          onValueChange={(value) => setField('time', value)}
          error={errors.time}
        />

        <div className="sm:col-span-2">
          <Select
            id="trial-goal"
            label="Training goal"
            placeholder="Select your goal"
            options={TRAINING_GOALS}
            required
            value={values.goal}
            onValueChange={(value) => setField('goal', value)}
            error={errors.goal}
          />
        </div>
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          We couldn't submit your booking. Please try again or call{' '}
          {SITE.contact.phone}.
        </p>
      )}

      <ButtonPress className="mt-6">
        <Button
          type="submit"
          size="lg"
          className="w-full gap-2"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Booking...
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Book my free trial
            </>
          )}
        </Button>
      </ButtonPress>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        No commitment required. Our team will contact you to confirm your
        session.
      </p>
    </form>
  );
}
