import fetch from 'node-fetch';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

export const sendToTelegram = async (email: string): Promise<void> => {
  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    throw new Error('Telegram credentials not set');
  }

  const message = `📨 A new request for cooperation!\n\n📧 Email: ${email}`;
  const telegramAPI = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    await fetch(telegramAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });
  } catch (err) {
    console.error('❌ Telegram error:', err);
    throw err;
  }
};
