import { createApp } from './app';

const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  console.warn('⚠️ ALLOWED_ORIGINS is not set: any website can call this API from a browser.');
}

createApp({ allowedOrigins }).listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
