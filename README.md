<p align="center">
  <img src="public/brand/wavsy-logo-horizontal.svg" alt="Wavsy" width="320">
</p>

<p align="center">
  <strong>Wavsy</strong> — a web development studio building websites and web apps for businesses.<br>
  Home of <a href="https://wavsy.dev">wavsy.dev</a>, in Bulgarian, English and German.
</p>

---

> **Pre-release.** The domain, the Vercel setup and the launch keys are still an open
> decision — see [`DECISIONS.md`](DECISIONS.md).

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

Next.js 15 needs Node 18.18 or newer.

| Script | What it does |
|---|---|
| `npm run dev` | Dev server, Turbopack |
| `npm run build` | Production build, Turbopack |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment

| Variable | Purpose |
|---|---|
| `WHATSAPP_E164` | The chat number, server only. **Never prefix it with `NEXT_PUBLIC_`.** Without it the form cannot open a chat. |
| `NEXT_PUBLIC_ASSISTANT_ENABLED` | `true` renders the slot for the site assistant. Off by default. |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | `true` renders the analytics slot. Off by default. |

## Stack

Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS 4 · next-intl ·
motion · Lenis (smooth scroll) · zod (form validation)

Typefaces: **Unbounded** for display, **Inter** for body text.

## How it is put together

```
app/[locale]/   one folder per page: uslugi, portfolio, za-nas, kontakti,
                poveritelnost, biskvitki
components/     home · layout · contact · services · portfolio · team · motion · ui
lib/            routes, locale, metadata, validation, inquiry, whatsapp, flags
messages/       bg.json · en.json · de.json — the copy
brand/logos/    logo sources; the served copies are in public/brand/
public/         portfolio thumbnails, founder photos
```

### Routes in three languages

Bulgarian is the default and lives at `/`. Every language has its own public
paths:

| | Bulgarian | English | German |
|---|---|---|---|
| Home | `/` | `/en` | `/de` |
| Services | `/услуги` | `/en/services` | `/de/leistungen` |
| Portfolio | `/портфолио` | `/en/portfolio` | `/de/portfolio` |
| About | `/за-нас` | `/en/about` | `/de/ueber-uns` |
| Contact | `/контакти` | `/en/contact` | `/de/kontakt` |

The folders under `app/[locale]/` use Latin names internally. The public paths
are mapped onto them by **rewrites in `next.config.ts`**, not by middleware:
Vercel could not load an ESM Edge middleware file. The path table itself is in
`lib/routes.ts`. A new page needs an entry in both.

The old calculator URLs redirect to the contact page.

### The enquiry form

There is no email sending in this version. The form is validated on the server
(`lib/inquiry.ts`, zod), and a valid enquiry **opens WhatsApp** with the message
already filled in. The fields stay filled until that succeeds. A separate Viber
button is a native `viber://` link.

The number lives only in the server environment and is never shown as text on
the page. Note that the Viber button's link does carry it.

A hidden `website` field catches bots: when it is filled, the form reports
success and sends nothing.

## Content rules

- Prices stay off the marketing pages; the exact price is agreed in conversation.
- The phone number is not published.
- Founders appear by first name only.
- Anything written in brackets, like `[РЕШЕНИЕ: …]`, stays off the public site
  until it is confirmed.

The full list of settled and open decisions is in [`DECISIONS.md`](DECISIONS.md).
