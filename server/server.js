const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Env vars
const { TELEGRAM_TOKEN, CHAT_ID, EMAIL_USER, EMAIL_PASS } = process.env;

// Utils
const sendToTelegram = async (email) => {
  const message = `📨 A new request for cooperation!\n\n📧 Email: ${email}`;
  const telegramAPI = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    await fetch(telegramAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });
  } catch (err) {
    console.error('❌ Telegram sending error:', err);
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmailToUser = async (email) => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: 'Thanks for your contact!',
      text: 'We received your email and will contact you soon.',
    });
  } catch (err) {
    console.error('❌ Email error:', err);
  }
};

// Routes
app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  try {
    await sendToTelegram(email);
    await sendEmailToUser(email);
    res.status(200).json({ success: true });
  } catch (err) {
    console.log('❌ Sending error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ The server is up running at http://localhost:${PORT}`);
});
