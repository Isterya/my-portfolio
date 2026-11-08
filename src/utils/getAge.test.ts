import { afterEach, describe, expect, it, vi } from 'vitest';

import { getAge } from './getAge';

describe('getAge', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const birthDate = new Date(2007, 8, 6);

  it('does not count the current year before the birthday', () => {
    vi.useFakeTimers({ now: new Date(2026, 8, 5) });
    expect(getAge(birthDate)).toBe(18);
  });

  it('counts the current year from the birthday on', () => {
    vi.useFakeTimers({ now: new Date(2026, 8, 6) });
    expect(getAge(birthDate)).toBe(19);
  });
});
