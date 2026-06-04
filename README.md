# Isterya | Production-Ready Personal Portfolio

> A high-performance, fully responsive, and multilingual portfolio ecosystem built with React 18, TypeScript, and Vite.
> Engineered from scratch with production-level standards, clean architecture, and strict quality control.

---

## Live Application

> **[Explore Live Demo](https://my-portfolio-git-main-isteryas-projects.vercel.app/)**

---

## Architecture & Engineering Highlights

This project serves as a demonstration of production-grade frontend engineering applied to a solo product. Key architectural pillars include:

- **Strict Type Safety:** 100% TypeScript implementation with no `any` types.
- **Performance Optimization:** Asset optimization, code-splitting via React Router v7, and lightweight animations via Framer Motion.
- **Code Quality Pipeline:** Automated pre-commit hooks (Husky + Lint-staged) enforcing strict formatting and code standards before any push.
- **Enterprise Tooling:** Complete linting ecosystem (ESLint, Stylelint for SCSS Modules, and Prettier).

---

## Tech Stack

### Frontend
- **Core:** React 18 / TypeScript / Vite
- **Routing & SEO:** React Router v7 / React Helmet Async
- **Animations:** Framer Motion (including a custom-built dynamic portfolio slider)
- **Localization:** i18next & react-i18next (Full context-aware switching for EN, PL, RU)

### Backend Services
- **Runtime:** Node.js (Express)
- **Integrations:** Telegram Bot API (Real-time form delivery) + Nodemailer (Failover email infrastructure)

### Quality Assurance & Tooling
- **Linters:** ESLint / Stylelint + SCSS Lint / Prettier
- **Git Hooks:** Husky / Lint-staged
- **Configuration:** Custom Vite path aliases for absolute import clean-code separation

---

## Key Ecosystem Features

- **Deep Multilingualism:** Dynamic translation engine covering three locales (EN, PL, RU).
- **Dual-Channel Contact System:** Instant lead capturing via Telegram bot webhook API with an automated Node.js email failover.
- **Granular SEO:** Per-page meta-tag injection, semantic HTML layout, and optimized Core Web Vitals.
- **Legal Compliance:** Custom-tailored Privacy Policy and Terms of Use complying with modern data security expectations.

---

## Development & Scripts

*Note: This repository represents a proprietary personal brand asset. The scripts below are documented exclusively for local environment auditing.*

```bash
npm run dev         # Spin up isolated development server
npm run build       # Execute production-grade compilation & bundling
npm run lint        # Trigger deep static analysis check (ESLint + Stylelint)
```

📄 Intellectual Property & License
All rights reserved © Isterya, 2025-2026.

This source code is public strictly for evaluation, educational review, and architectural audit purposes. Copying, redistributing, or mirroring the visual layout, branding, asset suite, or proprietary logic for commercial or personal production use without explicit written permission is strictly prohibited.

Author
Bohdan Yevsieiev – @Isterya

Independent Frontend Developer based in Poland.