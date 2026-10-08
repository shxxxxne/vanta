'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DatePicker, { formatDisplayDate } from '@/components/ui/Datepicker';
import { Button } from '@/components/ui/Button';
import { TIME_SLOTS, TRAINING_GOALS } from '@/data/Trial';
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

const FIELD_ORDER: Field[] = ['name', 'phone', 'email', 'date', 'time', 'goal'];

const INITIAL: Values = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  goal: '',
};

function validateField(field: Field, value: string, today: string): string {
  switch (field) {
    case 'name':
      return isNotEmpty(value) ? '' : 'Enter your full name.';
    case 'phone':
      if (!isNotEmpty(value)) return 'Enter your phone number.';
      return isPhone(value) ? '' : 'Enter a valid number, like 077 123 4567.';
    case 'email':
      if (!isNotEmpty(value)) return 'Enter your email address.';
      return isEmail(value) ? '' : 'Enter a valid email, like name@mail.com.';
    case 'date':
      if (!value) return 'Pick a date for your trial.';
      return !today || isTodayOrFuture(value, today)
        ? ''
        : 'Pick today or a future date.';
    case 'time':
      return value ? '' : 'Pick a time slot.';
    case 'goal':
      return value ? '' : 'Choose a training goal.';
  }
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Set after mount so server and client markup match (no hydration warning).
  const [today, setToday] = useState('');

  useEffect(() => setToday(todayISO()), []);

  const setField = (field: Field, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Once a field shows an error, re-check it live so it clears as they fix it.
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value, today),
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setField(e.target.name as Field, e.target.value);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as Field;
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, e.target.value, today),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: Errors = {};
    for (const field of FIELD_ORDER) {
      const message = validateField(field, values[field], today);
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`trial-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      // TODO: replace with your real endpoint, e.g.
      // await fetch('/api/trial', { method: 'POST', body: JSON.stringify(values) });
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
  };

  const selectedSlot = TIME_SLOTS.find((slot) => slot.value === values.time);

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-line bg-surface-raised p-5 sm:p-8">
      {submitted ? (
        <div
          role="status"
          className="flex flex-col items-center gap-4 py-6 text-center sm:py-10"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-7"
              aria-hidden="true"
            >
              <path d="m5 12 5 5L20 7" />
            </svg>
          </span>
          <h3 className="font-display text-2xl font-bold text-foreground">
            You&apos;re booked in, {values.name.trim().split(' ')[0]}.
          </h3>
          <p className="max-w-[40ch] text-muted-foreground">
            We&apos;ll call {values.phone} to confirm your free trial on{' '}
            {formatDisplayDate(values.date)}
            {selectedSlot ? ` at ${selectedSlot.label}` : ''}.
          </p>
          <Button variant="outline" onClick={reset} className="mt-2">
            Book another trial
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Book a free trial"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
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
            label="Email"
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
            onValueChange={(v) => setField('date', v)}
            error={errors.date}
          />

          <Select
            id="trial-time"
            label="Preferred time"
            placeholder="Select a time"
            options={TIME_SLOTS}
            required
            value={values.time}
            onValueChange={(v) => setField('time', v)}
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
              onValueChange={(v) => setField('goal', v)}
              error={errors.goal}
            />
          </div>

          <div className="flex justify-center sm:col-span-2">
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? 'Booking...' : 'Book my free trial'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * ContactForm: free-trial booking form (blueprint section 9).
 *
 * Layout (mobile first): every field stacks in one column; from `sm` up,
 * phone/email and date/time sit side by side, while name, goal and the
 * button span the full row.
 *
 * Usage (in app/page.tsx, inside your trial section):
 *   <section id="trial" className="section-y section-alt">
 *     <Container><ContactForm /></Container>
 *   </section>
 *
 * Hook up submission by replacing the TODO in handleSubmit.
 */
