const API_URL = import.meta.env.VITE_API_URL;

// The API runs on Render's free tier, which needs up to a minute to wake up after idling.
const REQUEST_TIMEOUT_MS = 60_000;

export type SendEmailErrorCode = 'network' | 'timeout' | 'rateLimit' | 'validation' | 'server';

export class SendEmailError extends Error {
  readonly code: SendEmailErrorCode;

  constructor(code: SendEmailErrorCode, options?: { cause?: unknown }) {
    super(`Failed to send the contact request: ${code}`, options);
    this.name = 'SendEmailError';
    this.code = code;
  }
}

const errorCodeFromStatus = (status: number): SendEmailErrorCode => {
  if (status === 429) return 'rateLimit';
  if (status === 400) return 'validation';
  return 'server';
};

export const sendEmail = async (email: string): Promise<void> => {
  if (!API_URL) {
    console.error('VITE_API_URL is not configured, the contact form cannot reach the API.');
    throw new SendEmailError('server');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(`${API_URL}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      signal: controller.signal,
    });
  } catch (error) {
    throw new SendEmailError(controller.signal.aborted ? 'timeout' : 'network', { cause: error });
  } finally {
    clearTimeout(timeoutId);
  }

  // The body is not needed on success, and error bodies are not guaranteed to be JSON
  // (rate limiter, proxies, cold-start pages), so the status code is the source of truth.
  if (!response.ok) {
    throw new SendEmailError(errorCodeFromStatus(response.status));
  }
};

/**
 * Starts the API instance in the background (Render's free tier sleeps after inactivity), so the
 * form answers quickly when the visitor submits it. Failures do not matter here.
 */
export const wakeUpApi = () => {
  if (!API_URL) return;

  fetch(`${API_URL}/health`, { cache: 'no-store' }).catch(() => {});
};
