import { AddressInfo } from 'node:net';
import { Server } from 'node:http';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createApp } from './app';

let server: Server | undefined;

const start = (options: Parameters<typeof createApp>[0] = {}) => {
  const deliverLead = vi.fn<(email: string) => Promise<void>>().mockResolvedValue(undefined);
  const sendConfirmation = vi.fn<(email: string) => Promise<void>>().mockResolvedValue(undefined);
  const app = createApp({ deliverLead, sendConfirmation, logRequests: false, ...options });

  server = app.listen(0);
  const { port } = server.address() as AddressInfo;
  const url = `http://127.0.0.1:${port}`;

  const send = (body: unknown, headers: Record<string, string> = {}) =>
    fetch(`${url}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });

  return { url, send, deliverLead, sendConfirmation };
};

afterEach(() => {
  server?.close();
  server = undefined;
  vi.restoreAllMocks();
});

describe('GET /health', () => {
  it('answers ok', async () => {
    const { url } = start();
    const response = await fetch(`${url}/health`);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok' });
  });
});

describe('POST /send-email', () => {
  it('rejects an invalid email without delivering anything', async () => {
    const { send, deliverLead } = start();
    const response = await send({ email: 'not-an-email' });

    expect(response.status).toBe(400);
    expect(deliverLead).not.toHaveBeenCalled();
  });

  it('delivers the lead and sends the confirmation', async () => {
    const { send, deliverLead, sendConfirmation } = start();
    const response = await send({ email: 'client@example.com' });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true, message: 'Request received' });
    expect(deliverLead).toHaveBeenCalledWith('client@example.com');
    expect(sendConfirmation).toHaveBeenCalledWith('client@example.com');
  });

  it('answers a filled honeypot as success without delivering it', async () => {
    const { send, deliverLead } = start();
    const response = await send({ email: 'bot@example.com', company: 'Spam Inc' });

    expect(response.status).toBe(200);
    expect(deliverLead).not.toHaveBeenCalled();
  });

  it('delivers the same address only once within the duplicate window', async () => {
    const { send, deliverLead } = start();

    await send({ email: 'client@example.com' });
    const repeated = await send({ email: 'Client@Example.com' });

    expect(repeated.status).toBe(200);
    expect(deliverLead).toHaveBeenCalledTimes(1);
  });

  it('reports a failed Telegram delivery and lets the visitor retry', async () => {
    const { send, deliverLead, sendConfirmation } = start();
    deliverLead.mockRejectedValueOnce(new Error('Telegram is down'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const failed = await send({ email: 'client@example.com' });
    const retried = await send({ email: 'client@example.com' });

    expect(failed.status).toBe(502);
    expect(retried.status).toBe(200);
    expect(deliverLead).toHaveBeenCalledTimes(2);
    expect(sendConfirmation).toHaveBeenCalledTimes(1);
  });

  it('still succeeds when only the confirmation email fails', async () => {
    const { send, sendConfirmation } = start();
    sendConfirmation.mockRejectedValueOnce(new Error('Brevo is down'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const response = await send({ email: 'client@example.com' });

    expect(response.status).toBe(200);
  });

  it('limits a visitor to five requests a minute and answers with JSON', async () => {
    const { send } = start();

    for (let i = 0; i < 5; i += 1) {
      await send({ email: `client${i}@example.com` });
    }
    const limited = await send({ email: 'client5@example.com' });

    expect(limited.status).toBe(429);
    expect(await limited.json()).toMatchObject({ success: false });
  });
});

describe('CORS', () => {
  it('allows only the configured origins when a list is set', async () => {
    const { url } = start({ allowedOrigins: ['https://isterya.vercel.app'] });

    const allowed = await fetch(`${url}/health`, {
      headers: { Origin: 'https://isterya.vercel.app' },
    });
    const foreign = await fetch(`${url}/health`, { headers: { Origin: 'https://evil.example' } });

    expect(allowed.headers.get('access-control-allow-origin')).toBe('https://isterya.vercel.app');
    expect(foreign.headers.get('access-control-allow-origin')).toBeNull();
  });
});
