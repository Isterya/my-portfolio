import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { SendEmailErrorCode } from './sendEmail';

// API_URL is read when the module loads, so every test imports a fresh copy after stubbing env.
const loadSendEmail = async (apiUrl = 'https://api.test') => {
  vi.stubEnv('VITE_API_URL', apiUrl);
  vi.resetModules();
  return import('./sendEmail');
};

const expectErrorCode = async (promise: Promise<unknown>, code: SendEmailErrorCode) => {
  await expect(promise).rejects.toMatchObject({ name: 'SendEmailError', code });
};

describe('sendEmail', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('posts the email as JSON and resolves on 2xx', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"success":true}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const { sendEmail } = await loadSendEmail();

    await expect(sendEmail('client@example.com')).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.test/send-email',
      expect.objectContaining({ method: 'POST', body: '{"email":"client@example.com"}' }),
    );
  });

  it.each([
    [429, 'rateLimit'],
    [400, 'validation'],
    [500, 'server'],
    [502, 'server'],
  ] as const)('maps HTTP %i to the "%s" error without parsing the body', async (status, code) => {
    // Plain-text bodies (rate limiter, gateways) used to crash JSON parsing.
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('Too many requests', { status })),
    );
    const { sendEmail } = await loadSendEmail();

    await expectErrorCode(sendEmail('client@example.com'), code);
  });

  it('reports a network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    const { sendEmail } = await loadSendEmail();

    await expectErrorCode(sendEmail('client@example.com'), 'network');
  });

  it('aborts and reports a timeout when the API does not answer within a minute', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_resolve, reject) => {
            init.signal?.addEventListener('abort', () =>
              reject(new DOMException('', 'AbortError')),
            );
          }),
      ),
    );
    const { sendEmail } = await loadSendEmail();

    const request = sendEmail('client@example.com');
    const assertion = expectErrorCode(request, 'timeout');
    await vi.advanceTimersByTimeAsync(60_000);
    await assertion;
  });

  it('fails without calling the network when the API URL is not configured', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { sendEmail } = await loadSendEmail('');

    await expectErrorCode(sendEmail('client@example.com'), 'server');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('wakes the API through the health endpoint and ignores failures', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);
    const { wakeUpApi } = await loadSendEmail();

    expect(() => wakeUpApi()).not.toThrow();
    expect(fetchMock).toHaveBeenCalledWith('https://api.test/health', { cache: 'no-store' });
  });
});
