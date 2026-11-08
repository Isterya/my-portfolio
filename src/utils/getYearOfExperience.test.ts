import { afterEach, describe, expect, it, vi } from 'vitest';

import { getYearsOfExperience } from './getYearOfExperience';

describe('getYearsOfExperience', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('counts calendar years since the start year', () => {
    vi.useFakeTimers({ now: new Date(2026, 10, 4) });
    expect(getYearsOfExperience()).toBe(3);
    expect(getYearsOfExperience(2020)).toBe(6);
  });
});
