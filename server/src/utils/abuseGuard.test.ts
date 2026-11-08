import { describe, expect, it } from 'vitest';

import { createAbuseGuard } from './abuseGuard';

const MINUTE = 60 * 1000;

describe('createAbuseGuard', () => {
  it('treats an address as a duplicate for ten minutes, ignoring case and spaces', () => {
    const guard = createAbuseGuard();
    guard.rememberDelivery('client@example.com', 0);

    expect(guard.wasRecentlyDelivered(' CLIENT@example.com', 9 * MINUTE)).toBe(true);
    expect(guard.wasRecentlyDelivered('client@example.com', 11 * MINUTE)).toBe(false);
  });

  it('allows twenty confirmation emails per hour', () => {
    const guard = createAbuseGuard();
    const granted = Array.from({ length: 21 }, (_, i) => guard.takeConfirmationQuota(i));

    expect(granted.filter(Boolean)).toHaveLength(20);
    expect(granted[20]).toBe(false);
    expect(guard.takeConfirmationQuota(61 * MINUTE)).toBe(true);
  });

  it('keeps separate state per guard', () => {
    const first = createAbuseGuard();
    const second = createAbuseGuard();
    first.rememberDelivery('client@example.com', 0);

    expect(second.wasRecentlyDelivered('client@example.com', 0)).toBe(false);
  });
});
