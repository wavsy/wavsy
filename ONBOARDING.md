# Онбординг — wavsy.dev

За човек или сесия, която подхваща сайта отвън. Прочети това веднъж; отнема пет минути и спестява ден.

**Живо:** [wavsy.dev](https://wavsy.dev) · **Решения:** [`DECISIONS.md`](DECISIONS.md) · **Общо:** [`README.md`](README.md) · **Търговската част:** частното repo [`wavsy/wavsy_GTM`](https://github.com/wavsy/wavsy_GTM)

---

## 1. Първите шейсет секунди

```bash
cd ~/Projects/wavsy
npm install
npm run dev              # http://localhost:3000
```

Работи без нито една променлива. Формата няма да отваря WhatsApp без `WHATSAPP_E164` — това е нарочно, вж. §5.

## 2. Кое къде е

```
app/[locale]/   по една папка на страница: uslugi, portfolio, za-nas, kontakti,
                poveritelnost, biskvitki, karieri
app/sitemap.ts · app/robots.ts · app/llms.txt/  се пишат сами от lib/routes.ts
components/     home · layout · contact · services · portfolio · team · motion · ui
lib/            routes (адресите) · metadata · projects (портфолио) · flags · analytics
messages/       bg.json · en.json · de.json — ЦЕЛИЯТ текст на сайта
public/         снимки за портфолиото, снимки на екипа, лого
```

**Текстът живее само в `messages/`.** Компонентите не съдържат изречения. Нова страница значи нови ключове и в трите езика.

## 3. Работният ред

```bash
npx tsc --noEmit     # типовете
npx eslint           # правилата
npm run build        # билдът
```

Всяка промяна минава през **PR**. Vercel вдига preview за PR-а и **качва `main` автоматично** на wavsy.dev след merge.

## 4. Капаните — прочети ги, ще ти спестят часове

**Адресите на кирилица се пазят на две места.** `lib/routes.ts` държи таблицата, а `next.config.ts` държи rewrite-а от кирилския адрес към латинската папка. Нова страница иска запис и в двата файла, иначе дава 404. Няма middleware нарочно: Vercel не успяваше да зареди ESM middleware.

**Никога не показвай страницата от прозрачно при първо зареждане.** Обвивката `PageFade` правеше точно това и на телефон екранът стоеше празен, докато се зареди JavaScript. Резултат: главният текст се виждаше за 5 сек и Lighthouse даваше 77–79. След поправката: 2.3 сек и 95. Анимации при първо зареждане се правят с CSS, не с JavaScript, и не тръгват от `opacity: 0`.

**`messages/*.json` се пишат с 2 интервала и с истинска кирилица** (без `\uXXXX`). Ако ги пипаш със скрипт, сравни новия текст със стария формат, преди да запишеш, иначе diff-ът става целият файл.

**Preview-то на Vercel е зад вход.** Lighthouse не може да го отвори. Мери локално с истинско забавяне:

```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000/ --throttling-method=devtools --only-categories=performance
```

Симулираното мерене на localhost лъже: показва секунди закъснение, които на живо ги няма.

**Портфолиото е на две места.** `lib/projects.ts` държи адреса и снимката, а `messages/*.json` → `portfolio.projects.<slug>` държи името, бранша и описанието на трите езика. Снимките са 1440×900 JPEG в `public/portfolio/`.

**Концептуалните проекти носят етикет.** Клиентските проекти са първи; всичко, което не е клиент (например Cacao Cartel), се маркира „Концептуален проект“. Правилото е в `DECISIONS.md`, идва от KAN-15: без измислени проекти.

**Analytics е изключен, докато не дойдат два ключа.** `NEXT_PUBLIC_ANALYTICS_ENABLED=true` **и** `NEXT_PUBLIC_UMAMI_WEBSITE_ID`. Текстовете на „Бисквитки“ и „Поверителност“ се сменят сами, когато е включен, за да не пише невярно.

**Картинката за споделяне ползва TTF с кирилица** (`assets/fonts/Unbounded-ExtraBold.ttf`). `ImageResponse` не чете woff2 и променливи шрифтове — без този файл слоганът излиза като квадратчета.

## 5. Правилата за съдържанието

Пълният списък е в [`DECISIONS.md`](DECISIONS.md). Най-важните:

- **Цени не се публикуват.** Уговарят се в разговор.
- **Телефонът не се публикува.** Стои само в сървърната променлива `WHATSAPP_E164`.
- **Основателите са с първи имена** на сайта; с пълни имена само в JSON-LD, за да ни различава Google от песента „Wavsy“.
- **Без страници по градове.** Решено на 13.09.2026.
- **GDPR значката във футъра остава.** Рискът е обсъден и решението е взето на 16.09.2026.
- Нищо измислено: без несъществуващи проекти, отзиви или числа.

## 6. Бърза проверка, че живият сайт е здрав

```bash
curl -s https://wavsy.dev/sitemap.xml | grep -c "<loc>"        # 24 адреса
curl -sI https://wavsy.dev/ | head -1                           # 200
```

След по-голяма промяна: мини през началната страница, една вътрешна и портфолиото на трите езика, на телефон и на компютър, и гледай за грешки в конзолата.

## 7. Къде е останалото

| | |
|---|---|
| Задачи | [Jira · KAN](https://wavsy.atlassian.net/browse/KAN) |
| Фирми за контакт | [Jira · CRM](https://wavsy.atlassian.net/browse/CRM) |
| Планове, оферти, договори | [`wavsy/wavsy_GTM`](https://github.com/wavsy/wavsy_GTM) (частно) |
| Клиентски сайтове | `wavsy/storm_car_wash`, `wavsy/kibo-2`, `wavsy/cacao-cartel` |
