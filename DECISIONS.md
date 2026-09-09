# Decisions

Items in brackets stay out of the public site until confirmed.

## Resolved

- Display + body type: Unbounded + Inter
- V1 hero visual: SVG/CSS wave, no WebGL
- Extra packages: `motion`, `clsx`, `zod`, `next-intl`, `lenis`
- Hero CTAs: quote request + portfolio
- Final CTA: „Имаш идея? Разкажи ни.“
- Public Bulgarian routes: `/услуги`, `/калкулатор`, `/портфолио`, `/за-нас`, `/контакти`
- English: `/en`, `/en/services`, `/en/calculator`, `/en/portfolio`, `/en/about`, `/en/contact`
- German: `/de`, `/de/leistungen`, `/de/rechner`, `/de/portfolio`, `/de/ueber-uns`, `/de/kontakt`
- Default locale is Bulgarian at `/`. Language switcher is `BG / EN / DE` text, no flags.
- Public email: `mitkobarev@gmail.com`
- Phone is not published. WhatsApp number stays in server env (`WHATSAPP_E164`) and is never rendered in HTML or client JS.
- Reply time: within 2 calendar days
- Inquiry form on the homepage finale and contact page. After submit, WhatsApp opens with a ready message.
- Quote calculator can open WhatsApp from the result (step 7) before the visitor fills contact details. Step 8 adds name, company, phone and email, then opens WhatsApp with the full breakdown.
- No Resend / send-email keys in this version
- Founders: Dimitar and Nikolay, first names only. Bios are short and non-technical. Dimitar photo uses his public GitHub portrait (LinkedIn is authwalled). Nikolay photo still pending — drop `public/team/nikolay.jpg` when available.
- Prices stay off marketing pages except the calculator, which shows a range at the end only.
- Two engagement models on services: handoff vs maintain (maintain marked recommended).
- Portfolio page is an empty state until there are confirmed projects. `PortfolioCard` is ready.
- No social links in this version
- Blog omitted from this version
- No Edge middleware: locale routing uses `app/[locale]` plus `next.config` rewrites, so Vercel does not load an ESM middleware file.

## Open

- [РЕШЕНИЕ: снимка на Николай]
- [РЕШЕНИЕ: клиентски лога]
- [РЕШЕНИЕ: клиентски отзиви]
- [РЕШЕНИЕ: проекти за портфолио]
- [РЕШЕНИЕ: текстове за поверителност и бисквитки]
- [РЕШЕНИЕ: човешка редакция на немския превод]
- [РЕШЕНИЕ: Vercel / домейн / ключове за пускане]
