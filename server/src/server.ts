import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

import { sendToTelegram } from './utils/sendToTelegram';
import sendEmailToUser from './utils/sendEmailToUser';
import { rememberDelivery, takeConfirmationQuota, wasRecentlyDelivered } from './utils/abuseGuard';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  console.warn('⚠️ ALLOWED_ORIGINS is not set: any website can call this API from a browser.');
}

app.use(cors(allowedOrigins.length > 0 ? { origin: allowedOrigins } : undefined));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' },
});
app.use('/send-email', limiter);

const emailSchema = z.object({
  email: z.string().email(),
  company: z.string().max(200).optional(),
});

const RECEIVED = { success: true, message: 'Request received' } as const;

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

app.post(
  '/send-email',
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = emailSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const { email, company } = parsed.data;

    if (company) {
      return res.status(200).json(RECEIVED);
    }

    if (wasRecentlyDelivered(email)) {
      return res.status(200).json(RECEIVED);
    }

    try {
      await sendToTelegram(email);
    } catch (err) {
      console.error('❌ Lead was not delivered to Telegram', err);
      return res.status(502).json({ success: false, error: 'Failed to deliver the request' });
    }

    rememberDelivery(email);

    if (!takeConfirmationQuota()) {
      console.warn('⚠️ Hourly confirmation email quota reached, skipping the confirmation');
    } else {
      try {
        await sendEmailToUser(email);
      } catch (err) {
        console.error('⚠️ Lead delivered, but the confirmation email failed', err);
      }
    }

    return res.status(200).json(RECEIVED);
  }),
);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log('❌ Unexpected error', err);
  res.status(500).json({ success: false, error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
