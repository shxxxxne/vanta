'use client';

import { useSyncExternalStore } from 'react';
import { Clock } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { OPENING_HOURS } from '@/data/Site';
import { cn } from '@/lib/utils';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function toMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** "06:00" -> "6:00 AM" */
function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`;
}

function getHoursForDay(day: number) {
  return OPENING_HOURS.find((entry) => entry.days.includes(day));
}

/** Current day and minutes in VANTA's timezone, whatever the visitor's device says. */
function getColomboNow(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';

  return {
    day: WEEKDAY_INDEX[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

function getStatus({ day, minutes }: { day: number; minutes: number }) {
  const today = getHoursForDay(day);

  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) {
      return { isOpen: true, text: `Closes at ${formatTime(today.close)}` };
    }
    if (minutes < open) {
      return { isOpen: false, text: `Opens today at ${formatTime(today.open)}` };
    }
  }

  const tomorrow = getHoursForDay((day + 1) % 7);
  return {
    isOpen: false,
    text: tomorrow ? `Opens tomorrow at ${formatTime(tomorrow.open)}` : '',
  };
}

/* Re-render once a minute. The server snapshot is null, so server and first
   client render match and the live status appears right after hydration. */
function subscribe(callback: () => void) {
  const id = setInterval(callback, 30_000);
  return () => clearInterval(id);
}
const getSnapshot = (): number | null => Math.floor(Date.now() / 60_000);
const getServerSnapshot = (): number | null => null;

interface OpeningHoursProps {
  className?: string;
}

export default function OpeningHours({ className }: OpeningHoursProps) {
  const minuteKey = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const now = minuteKey === null ? null : getColomboNow(new Date(minuteKey * 60_000));
  const status = now ? getStatus(now) : null;

  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-surface-raised p-5 sm:p-6',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 font-display text-xl font-bold text-foreground">
          <Clock className="size-5 text-lime" aria-hidden="true" />
          Opening hours
        </h2>

        {status && (
          <Badge variant={status.isOpen ? 'lime' : 'muted'} size="md">
            {status.isOpen ? 'Open now' : 'Closed now'}
          </Badge>
        )}
      </div>

      <p
        role="status"
        className="mt-2 min-h-5 text-sm text-muted-foreground"
      >
        {status?.text}
      </p>

      <dl className="mt-4 flex flex-col divide-y divide-line">
        {OPENING_HOURS.map((entry) => {
          const isToday = now ? entry.days.includes(now.day) : false;
          return (
            <div
              key={entry.label}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <dt
                className={cn(
                  'flex items-center gap-2 text-sm',
                  isToday
                    ? 'font-semibold text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {entry.label}
                {isToday && (
                  <Badge variant="outline">
                    Today
                    <span className="sr-only">
                      , {DAY_NAMES[now!.day]}
                    </span>
                  </Badge>
                )}
              </dt>
              <dd
                className={cn(
                  'text-base tabular-nums',
                  isToday
                    ? 'font-semibold text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {formatTime(entry.open)} to {formatTime(entry.close)}
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="mt-2 text-sm text-muted-foreground">
        Holiday hours may differ. Message us on WhatsApp to confirm.
      </p>
    </div>
  );
}