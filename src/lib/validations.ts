export const isNotEmpty = (value: string) => value.trim().length > 0;

export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Accepts +94 77 123 4567, 077-123-4567, (077) 1234567 ... (9 to 15 digits). */
export const isPhone = (value: string) => {
  const cleaned = value.replace(/[\s\-().]/g, '');
  return /^\+?\d{9,15}$/.test(cleaned);
};

/** Today's date as YYYY-MM-DD in the visitor's local timezone. */
export function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

/** ISO date strings (YYYY-MM-DD) compare correctly as plain strings. */
export const isTodayOrFuture = (date: string, today: string) => date >= today;
