import { describe, it, expect } from 'vitest';
import { parseISODate, year, dayMonth } from './date.js';

describe('parseISODate', () => {
  it('splits an ISO date into numeric parts', () => {
    expect(parseISODate('2026-04-16')).toEqual({ y: 2026, m: 4, d: 16 });
  });
});

describe('year', () => {
  it('returns the numeric year', () => {
    expect(year('2026-04-16')).toBe(2026);
    expect(year('2016-12-30')).toBe(2016);
  });
});

describe('dayMonth', () => {
  it('formats as "DD Mon" with a zero-padded day', () => {
    expect(dayMonth('2026-04-16')).toBe('16 Apr');
    expect(dayMonth('2024-04-06')).toBe('06 Apr');
    expect(dayMonth('2025-11-29')).toBe('29 Nov');
  });

  it('handles month boundaries', () => {
    expect(dayMonth('2020-01-01')).toBe('01 Jan');
    expect(dayMonth('2016-12-30')).toBe('30 Dec');
  });

  it('is timezone-safe so the day never shifts', () => {
    // `new Date('2026-01-01')` is UTC midnight and renders as Dec 31 in
    // negative-offset zones. The manual parser must always yield Jan 01.
    expect(dayMonth('2026-01-01')).toBe('01 Jan');
    expect(dayMonth('2026-12-31')).toBe('31 Dec');
  });
});
