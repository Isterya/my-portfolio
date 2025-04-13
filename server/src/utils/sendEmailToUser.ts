import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error('Email credentials are missing in .env');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendEmailToUser = async (email: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: 'Thanks for your contact!',
      text: 'We received your email and will contact you soon.',
    });
  } catch (err) {
    console.error('❌ Email error:', err);
    throw err;
  }
};
