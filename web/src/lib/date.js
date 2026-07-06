// Timezone-safe ISO date helpers for the Live list.
// We parse "YYYY-MM-DD" by hand rather than via `new Date(str)`, which would
// interpret the string as UTC midnight and shift the day in negative-offset
// timezones (e.g. an April 16 gig showing as April 15 in the Americas).

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function parseISODate(dateStr) {
  const [y, m, d] = String(dateStr).split('-').map(Number);
  return { y, m, d };
}

export function year(dateStr) {
  return parseISODate(dateStr).y;
}

export function dayMonth(dateStr) {
  const { m, d } = parseISODate(dateStr);
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]}`;
}
