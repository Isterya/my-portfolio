# Isterya | Production-Ready Personal Portfolio

> A high-performance, fully responsive, and multilingual portfolio ecosystem built with React 19,
> TypeScript, and Vite. Engineered from scratch with production-level standards, clean architecture,
> and strict quality control.

---

## Live Application

> **[Explore Live Demo](https://isterya.vercel.app/)**

---

## Engineering Highlights

- **Performance.** Raster images are WebP sized for display (3.4 MB → 472 KB), offscreen images load
  lazily with reserved space, hashed assets are cached as immutable, and fonts are preconnected and
  trimmed to the weights in use.
- **Accessibility.** Keyboard-operable menu, sliders and language switcher with focus management;
  labelled landmarks and controls in the active language; visible focus rings;
  `prefers-reduced-motion` support; carousels pause off screen, on focus and in background tabs.
- **Internationalisation.** i18next with browser locales normalised to the supported languages
  (`ru-RU` → `ru`), `<html lang>` kept in sync, translated ARIA labels and error messages.
- **SEO & sharing.** Static Open Graph / Twitter tags for crawlers that do not run JavaScript,
  per-route meta through react-helmet-async, `robots.txt`, `sitemap.xml`, `noindex` on the 404 page.
- **Reliable contact flow.** Typed request errors with localized messages, timeouts, an API warm-up
  before the visitor reaches the form and a honeypot field. The API treats the Telegram notification
  as the critical channel, sends the confirmation email best-effort, ignores duplicates, caps
  outgoing emails, answers rate limits with JSON and supports a CORS allowlist.
- **Quality pipeline.** Strict TypeScript without `any`, ESLint 10 + Stylelint + Prettier, Husky +
  lint-staged (ESLint, Prettier and Stylelint on every commit), Vitest unit tests for the site and
  the API, and CI that checks formatting, lint, tests and both builds.

---

## Tech Stack

### Frontend

- **Core:** React 19 / TypeScript / Vite 8 / SCSS
- **Routing & SEO:** React Router 8 / React Helmet Async
- **Animations:** Motion (lazily loaded features) and CSS
- **Localization:** i18next & react-i18next (EN, PL, RU)

### Backend Services

- **Runtime:** Node.js (Express 5, zod, helmet, express-rate-limit)
- **Integrations:** Telegram Bot API (lead delivery) + Brevo API (confirmation email to the visitor)
- **Hosting:** Vercel (site), Render (API)

### Quality Assurance & Tooling

- **Linters:** ESLint (flat config) / Stylelint (SCSS) / Prettier
- **Tests:** Vitest (site and API)
- **Git Hooks:** Husky / lint-staged

---

## Development & Scripts

_Note: This repository represents a proprietary personal brand asset. The scripts below are
documented exclusively for local environment auditing._

Requires Node.js 22.13 or newer.

```bash
npm run dev           # Development server
npm run build         # Type-check and production build
npm run lint          # ESLint + Stylelint
npm run format:check  # Prettier
npm test              # Unit tests (Vitest)
```

Environment variables:

- **Site:** `VITE_API_URL` — base URL of the contact API.
- **API (`server/`):** `TELEGRAM_TOKEN`, `CHAT_ID`, `EMAIL_USER`, `BREVO_API_KEY`, `PORT`, and
  optionally `ALLOWED_ORIGINS` (comma-separated site origins allowed to call the API from a
  browser).

---

## 📄 Intellectual Property & License

All rights reserved © Isterya, 2025-2026.

This source code is public strictly for evaluation, educational review, and architectural audit
purposes. Copying, redistributing, or mirroring the visual layout, branding, asset suite, or
proprietary logic for commercial or personal production use without explicit written permission is
strictly prohibited.

## Author

Bohdan Yevsieiev – @Isterya

Independent Frontend Developer based in Poland.
