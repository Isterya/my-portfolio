import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

import { sendToTelegram } from './utils/sendToTelegram';
import sendEmailToUser from './utils/sendEmailToUser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// Clients parse every answer as JSON, including 429; also expose the standard RateLimit headers.
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

    const { email } = parsed.data;

    const results = await Promise.allSettled([sendToTelegram(email), sendEmailToUser(email)]);

    const allOk = results.every((r) => r.status === 'fulfilled');

    if (!allOk) {
      const failed = results
        .map((r, i) => (r.status === 'rejected' ? (i === 0 ? 'Telegram' : 'Email') : null))
        .filter(Boolean);

      console.log(`❌ Failed: ${failed.join(', ')}`, results);
      return res.status(500).json({
        success: false,
        error: `Error sending to: ${failed.join(', ')}`,
      });
    }

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  }),
);

// Express recognises error handlers by their four parameters, so `_next` must stay.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log('❌ Unexpected error', err);
  res.status(500).json({ success: false, error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
