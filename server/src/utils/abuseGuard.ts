// In-memory guards for the contact endpoint. One small instance serves the site, so process
// memory is enough; entries expire on their own and the maps stay small.

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const CONFIRMATIONS_PER_HOUR = 20;
const HOUR_MS = 60 * 60 * 1000;

const deliveredAt = new Map<string, number>();
let confirmationTimes: number[] = [];

const normalize = (email: string) => email.trim().toLowerCase();

/**
 * True when this address was already delivered recently (double click, retry after a slow
 * response): the lead exists, so neither the owner nor the visitor should get it twice.
 */
export const wasRecentlyDelivered = (email: string, now = Date.now()) => {
  for (const [key, time] of deliveredAt) {
    if (now - time > DUPLICATE_WINDOW_MS) deliveredAt.delete(key);
  }

  return deliveredAt.has(normalize(email));
};

/** Call only after the lead reached the owner, so a failed attempt can still be retried. */
export const rememberDelivery = (email: string, now = Date.now()) => {
  deliveredAt.set(normalize(email), now);
};

/**
 * Caps confirmation emails per hour. The endpoint mails an arbitrary address on behalf of the
 * owner; the cap keeps it from being used to flood third parties and burn the sender reputation.
 */
export const takeConfirmationQuota = (now = Date.now()) => {
  confirmationTimes = confirmationTimes.filter((time) => now - time < HOUR_MS);

  if (confirmationTimes.length >= CONFIRMATIONS_PER_HOUR) return false;

  confirmationTimes.push(now);
  return true;
};
