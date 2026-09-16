# Decisions

Items in brackets stay out of the public site until confirmed.

## Resolved

- Display + body type: Unbounded + Inter
- V1 hero visual: SVG/CSS wave, no WebGL
- Extra packages: `motion`, `clsx`, `zod`, `next-intl`, `lenis`
- Hero CTAs: quote request + portfolio
- Final CTA: „Имаш идея? Разкажи ни.“
- Public Bulgarian routes: `/услуги`, `/портфолио`, `/за-нас`, `/контакти`, `/поверителност`, `/бисквитки`, `/кариери`
- English: `/en`, `/en/services`, `/en/portfolio`, `/en/about`, `/en/contact`, `/en/privacy`, `/en/cookies`, `/en/careers`
- German: `/de`, `/de/leistungen`, `/de/portfolio`, `/de/ueber-uns`, `/de/kontakt`, `/de/datenschutz`, `/de/cookies`, `/de/karriere`
- Default locale is Bulgarian at `/`. Language switcher is compact `BG / EN / DE` text, no flags.
- Public email: `wavsy.dev@gmail.com`
- Phone is not published. The chat number stays in server env (`WHATSAPP_E164`) and is never rendered in HTML or client JS.
- Reply time: within 2 calendar days
- Inquiry form on the homepage finale and contact page. „Send enquiry“ opens WhatsApp with the filled message. A separate Viber button is a native `viber://` link so the app opens a chat. The number is not shown as text. Form fields stay filled until WhatsApp send succeeds.
- Quote calculator is removed from this version. Old URLs (`/калкулатор`, `/en/calculator`, `/de/rechner`) redirect to contact.
- No Resend / send-email keys in this version
- Founders: Dimitar and Nikolay, first names only. Cards show short title lines plus a LinkedIn link. Photos are the portraits supplied for v0.3.
- Prices stay off marketing pages. Exact price is agreed in conversation.
- Two engagement models on services: handoff vs maintain (maintain marked recommended).
- Portfolio shows five client sites, in this order: Автомивка СТОРМ (KAN-38), Glenz Reinigung, Manufacturas Quezher, КИБО - 2 (the client agreed to be shown, 2026-09-14) and Dimitar’s personal site. Then Cacao Cartel as the sixth card (KAN-43), labelled „Концептуален проект“ / „Concept project“ / „Konzeptprojekt“, because it is a concept piece and not a client. Concept work always carries that label and comes after the clients. Cards show a landing-page thumbnail and link out.
- Social links: LinkedIn on founder cards, plus the company Facebook and LinkedIn pages as icons in the footer (KAN-30). No other socials.
- Structured data (KAN-30): a `ProfessionalService` JSON-LD block on the home pages. The founders appear there by full name with their LinkedIn profiles, so search engines can tell Wavsy the studio from the song of the same name. The visible site keeps first names only. No telephone, since the phone is not published.
- Blog omitted from this version
- Hosting: live on Vercel at `wavsy.dev`, auto-deploy from `main`. `www.wavsy.dev` still needs its own domain entry in Vercel (KAN-41).
- Privacy and cookies pages carry the full texts (2026-09-15). The footer and the privacy page show a „GDPR compliant“ badge; kept as is by decision of Nikolay, 2026-09-16.
- Careers page at `/кариери`, `/en/careers`, `/de/karriere` (2026-09-15).
- Analytics (KAN-18): Umami Cloud, Hobby plan, which is free and cookieless, so no consent banner. It counts page views plus the events `inquiry-whatsapp` and `inquiry-viber`. Off until `NEXT_PUBLIC_ANALYTICS_ENABLED=true` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` are set in Vercel. The cookies and privacy texts switch to the analytics wording only when it is on.
- First paint (KAN-11): the first page shows as the server sent it, with no fade-in, so mobile does not stay blank until JavaScript loads. The fade stays for later navigations.
- No Edge middleware: locale routing uses `app/[locale]` plus `next.config` rewrites, so Vercel does not load an ESM middleware file.

## Open

- [РЕШЕНИЕ: клиентски лога]
- [РЕШЕНИЕ: клиентски отзиви]
- [РЕШЕНИЕ: човешка редакция на немския превод]
