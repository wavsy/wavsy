# Decisions

Items in brackets stay out of the public site until confirmed.

## Resolved

- Display + body type: Unbounded + Inter
- V1 hero visual: SVG/CSS wave, no WebGL
- Extra packages: `motion`, `clsx`, `zod`
- Hero CTAs: „Заявете оферта“ + „Виж проектите“
- Final CTA: „Имаш идея? Разкажи ни.“
- Routes in Bulgarian: `/услуги`, `/проекти`, `/за-нас`, `/контакти`
- Public email: `mitkobarev@gmail.com`
- Phone is not published
- Reply time: within 2 calendar days
- Inquiry form on the homepage finale and `/контакти`
- Inquiry form: visitor fills the form; we receive it as a WhatsApp message. The WhatsApp number stays in server env (`WHATSAPP_E164`) and is never rendered in HTML or client JS.
- WhatsApp message includes name, company, email, phone, project type, and the visitor’s message
- Form fields: име, фирма, имейл and/or телефон, тип проект, съобщение
- Founders: Димитър and Николай — photos, roles and bios still placeholder
- No prices on the site. Copy says it depends on the work; better to talk.
- No social links in this version
- Resend is not used while WhatsApp is the inquiry channel
- Blog omitted from this version (not in nav or footer)

## Open

- [РЕШЕНИЕ: снимки на основателите]
- [РЕШЕНИЕ: роли и кратки биографии]
- [РЕШЕНИЕ: клиентски лога]
- [РЕШЕНИЕ: клиентски отзиви]
- [РЕШЕНИЕ: проекти за портфолио]
- [РЕШЕНИЕ: текстове за поверителност и бисквитки]
- [РЕШЕНИЕ: Vercel / домейн / ключове за пускане]
