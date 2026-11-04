export const sendToTelegram = async (email: string): Promise<void> => {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    throw new Error('Telegram credentials not set');
  }

  const message = `📨 A new request for cooperation!\n\n📧 Email: ${email}`;
  const telegramAPI = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    // fetch only rejects on network errors; a revoked token or a wrong chat id is a 4xx response.
    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Telegram API error ${response.status}: ${details}`);
    }
  } catch (err) {
    console.error('❌ Telegram error:', err);
    throw err;
  }
};
