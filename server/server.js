const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const sendToTelegram = async (email) => {
  const text = `📨 A new request for cooperation!\n\n📧 Email: ${email}`;
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });
  } catch (err) {
    console.error('Telegram sending error:', err);
  }
};

app.post('/send-email', async (req, res) => {
  const { email } = req.body;
  try {
    await sendToTelegram(email);
    await sendEmailToUser(email);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log('❌ Sending error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(5000, () => {
  console.log('✅ The server is up and running at http://localhost:5000');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailToUser = async (email) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for your contact!',
      text: 'We received your email and will contact you soon.',
    });
  } catch (err) {
    console.error('❌ Sending email error:', err);
  }
};
