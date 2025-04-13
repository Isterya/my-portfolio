import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendToTelegram } from './utils/sendToTelegram';
import { sendEmailToUser } from './utils/sendEmailToUser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req: Request, res: Response) => {
  const { email } = req.body as { email: string };

  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  if (!email || !isValidEmail) {
    return res.status(400).json({ success: false, error: 'Invalid email' });
  }

  try {
    await sendToTelegram(email);
    await sendEmailToUser(email);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Error sending:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
