const sendEmailToUser = async (email: string): Promise<void> => {
  const EMAIL_USER = process.env.EMAIL_USER;
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!EMAIL_USER || !BREVO_API_KEY) {
    throw new Error('Email credentials or API key are missing in .env');
  }

  const html = `
  <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="background: #0e76a8; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">Thanks for reaching out!</h2>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 16px;">Hey 👋</p>
        <p style="font-size: 16px;">
          I really appreciate your interest in working together! I'll check your request and get back to you very soon.
        </p>
        <p style="font-size: 16px;">If it's urgent, feel free to reply to this email.</p>
        <br />
        <p style="font-size: 16px;">Best regards,<br /><strong>Bohdan Yevsieiev</strong></p>
      </div>
      <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        You received this email because you submitted a request on my portfolio site.
      </div>
    </div>
  </div>
`;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Bohdan Yevsieiev',
          email: EMAIL_USER,
        },
        to: [{ email }],
        subject: 'Thank you for reaching out!',
        textContent: 'Thank you for your message! I’ll contact you soon.',
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Brevo API error: ${errorData}`);
    }
  } catch (err) {
    console.error('❌ Email error:', err);
    throw err;
  }
};
export default sendEmailToUser;
