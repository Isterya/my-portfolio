import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

import { sendToTelegram } from './utils/sendToTelegram';
import sendEmailToUser from './utils/sendEmailToUser';
import { AbuseGuard, createAbuseGuard } from './utils/abuseGuard';

type AppOptions = {
  allowedOrigins?: string[];
  deliverLead?: (email: string) => Promise<void>;
  sendConfirmation?: (email: string) => Promise<void>;
  guard?: AbuseGuard;
  logRequests?: boolean;
};

const emailSchema = z.object({
  email: z.email(),
  company: z.string().max(200).optional(),
});

const RECEIVED = { success: true, message: 'Request received' } as const;

export const createApp = ({
  allowedOrigins = [],
  deliverLead = sendToTelegram,
  sendConfirmation = sendEmailToUser,
  guard = createAbuseGuard(),
  logRequests = true,
}: AppOptions = {}) => {
  const app = express();

  app.set('trust proxy', 1);

  app.use(cors(allowedOrigins.length > 0 ? { origin: allowedOrigins } : undefined));
  app.use(helmet());
  if (logRequests) app.use(morgan('dev'));
  app.use(express.json({ limit: '10kb' }));

  app.use(
    '/send-email',
    rateLimit({
      windowMs: 60 * 1000,
      limit: 5,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: { success: false, error: 'Too many requests, please try again later.' },
    }),
  );

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.post('/send-email', async (req: Request, res: Response) => {
    const parsed = emailSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ success: false, error: 'Invalid email format' });
      return;
    }

    const { email, company } = parsed.data;

    if (company || guard.wasRecentlyDelivered(email)) {
      res.status(200).json(RECEIVED);
      return;
    }

    try {
      await deliverLead(email);
    } catch (err) {
      console.error('❌ Lead was not delivered to Telegram', err);
      res.status(502).json({ success: false, error: 'Failed to deliver the request' });
      return;
    }

    guard.rememberDelivery(email);

    if (!guard.takeConfirmationQuota()) {
      console.warn('⚠️ Hourly confirmation email quota reached, skipping the confirmation');
    } else {
      try {
        await sendConfirmation(email);
      } catch (err) {
        console.error('⚠️ Lead delivered, but the confirmation email failed', err);
      }
    }

    res.status(200).json(RECEIVED);
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('❌ Unexpected error', err);
    res.status(500).json({ success: false, error: 'Server error' });
  });

  return app;
};
