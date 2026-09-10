# Decisions

Items in brackets stay out of the public site until confirmed.

## Resolved

- Display + body type: Unbounded + Inter
- V1 hero visual: SVG/CSS wave, no WebGL
- Extra packages: `motion`, `clsx`, `zod`, `next-intl`, `lenis`
- Hero CTAs: quote request + portfolio
- Final CTA: „Имаш идея? Разкажи ни.“
- Public Bulgarian routes: `/услуги`, `/портфолио`, `/за-нас`, `/контакти`
- English: `/en`, `/en/services`, `/en/portfolio`, `/en/about`, `/en/contact`
- German: `/de`, `/de/leistungen`, `/de/portfolio`, `/de/ueber-uns`, `/de/kontakt`
- Default locale is Bulgarian at `/`. Language switcher is compact `BG / EN / DE` text, no flags.
- Public email: `mitkobarev@gmail.com`
- Phone is not published. The chat number stays in server env (`WHATSAPP_E164`) and is never rendered in HTML or client JS.
- Reply time: within 2 calendar days
- Inquiry form on the homepage finale and contact page. „Send enquiry“ opens WhatsApp with the filled message. A separate Viber button is a native `viber://` link so the app opens a chat. The number is not shown as text. Form fields stay filled until WhatsApp send succeeds.
- Quote calculator is removed from this version. Old URLs (`/калкулатор`, `/en/calculator`, `/de/rechner`) redirect to contact.
- No Resend / send-email keys in this version
- Founders: Dimitar and Nikolay, first names only. Cards show short title lines plus a LinkedIn link. Photos are the portraits supplied for v0.3.
- Prices stay off marketing pages. Exact price is agreed in conversation.
- Two engagement models on services: handoff vs maintain (maintain marked recommended).
- Portfolio shows three live sites: Glenz Reinigung, Manufacturas Quezher, and Dimitar’s personal site. Cards show a landing-page thumbnail and link out.
- Social links: LinkedIn on founder cards only. No other socials.
- Blog omitted from this version
- No Edge middleware: locale routing uses `app/[locale]` plus `next.config` rewrites, so Vercel does not load an ESM middleware file.

## Open

- [РЕШЕНИЕ: клиентски лога]
- [РЕШЕНИЕ: клиентски отзиви]
- [РЕШЕНИЕ: проекти за портфолио]
- [РЕШЕНИЕ: текстове за поверителност и бисквитки]
- [РЕШЕНИЕ: човешка редакция на немския превод]
- [РЕШЕНИЕ: Vercel / домейн / ключове за пускане]
