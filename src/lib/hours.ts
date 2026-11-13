/** Sandpiper keeps Philadelphia hours wherever the visitor (or the server) happens to be. */
export const CAFE_TIME_ZONE = 'America/New_York';

const minutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

/** Whether `now` falls inside today's `opens`–`closes` window (24h `HH:MM`, café time zone). */
export function isOpenAt(opens: string, closes: string, now: Date, timeZone = CAFE_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const current = part('hour') * 60 + part('minute');
  const start = minutes(opens);
  const end = minutes(closes);
  // A window like 18:00–02:00 runs past midnight.
  return start <= end ? current >= start && current < end : current >= start || current < end;
}
