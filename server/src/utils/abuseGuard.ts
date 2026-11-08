const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const CONFIRMATIONS_PER_HOUR = 20;
const HOUR_MS = 60 * 60 * 1000;

const normalize = (email: string) => email.trim().toLowerCase();

export const createAbuseGuard = () => {
  const deliveredAt = new Map<string, number>();
  let confirmationTimes: number[] = [];

  const wasRecentlyDelivered = (email: string, now = Date.now()) => {
    for (const [key, time] of deliveredAt) {
      if (now - time > DUPLICATE_WINDOW_MS) deliveredAt.delete(key);
    }

    return deliveredAt.has(normalize(email));
  };

  const rememberDelivery = (email: string, now = Date.now()) => {
    deliveredAt.set(normalize(email), now);
  };

  const takeConfirmationQuota = (now = Date.now()) => {
    confirmationTimes = confirmationTimes.filter((time) => now - time < HOUR_MS);

    if (confirmationTimes.length >= CONFIRMATIONS_PER_HOUR) return false;

    confirmationTimes.push(now);
    return true;
  };

  return { wasRecentlyDelivered, rememberDelivery, takeConfirmationQuota };
};

export type AbuseGuard = ReturnType<typeof createAbuseGuard>;
