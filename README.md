# Horde-M

Portfolio and services site for Horde-M — software builds, business email, and
contract engineering for small businesses and independent operators.

Built with Next.js (App Router), Tailwind CSS v4, and Remotion for the hero
motion sequence. Every route is statically generated.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run remotion   # open the hero composition in Remotion Studio
```

## Structure

```
src/
  app/
    page.tsx              Homepage — hero, The Armory, The Rack, contact
    work/[slug]/page.tsx  One case study per piece, generated from data
    download/page.tsx     Mr. Mouse download, setup, features and FAQ
    globals.css           Design tokens (the "Armory" identity)
  components/
    markGeometry.ts       The logo, as shared geometry
    Mark.tsx              Static logo + wordmark
    HeroPlayer.tsx        Remotion player wrapper (client-only)
    InterfaceFigure.tsx   Per-project interface figures
    SiteHeader/Footer
  data/
    horde.ts              Every piece of work, the services, contact details
    mrmouse.ts            Mr. Mouse product content, carried from the old site
  remotion/
    HordeAssembly.tsx     The hero composition
```

**Adding a piece of work:** add one entry to `PIECES` in `src/data/horde.ts`.
The rack listing, its case-study route, the sitemap, the footer, the hero
animation and the promo video all read from that array.

## The promo video

A 15-second promo for social, in two aspect ratios:

```bash
npm run promo:portrait   # 1080x1920 — WhatsApp Status, Stories, Reels, TikTok
npm run promo:square     # 1080x1080 — LinkedIn and Instagram feed
```

Both render from `src/remotion/HordePromo.tsx` into `out/`. There is no audio.
The film runs in five beats: four scattered vendors, the turn, the four real
builds landing in the same four slots, the mark assembling, then the address.

Fonts are vendored in `public/fonts` rather than fetched at render time, so the
composition renders identically anywhere and needs no network. Note that those
files are the Google **latin** subset, which does not include the naira sign
(U+20A6) — avoid the character in composition copy. Web pages are unaffected,
since browsers fall back per glyph.

Preview and scrub either composition in Remotion Studio with `npm run remotion`.

## The identity

"Armory" — the horde as a tool rack, catalogued and stamped.

| Token | Value | Role |
| --- | --- | --- |
| Gunmetal | `#14181C` | Primary ground |
| Plate | `#1E252B` | Raised surfaces |
| Steel | `#2C353C` | Borders, rules |
| Bone | `#EFEBE2` | Primary text |
| Ash | `#8D9AA4` | Secondary text |
| Brass | `#D4A02A` | The only bright thing — actions, rack numbers |
| Oxide | `#1F8E77` | State: live, running, shipped |

Type is Archivo (display, 900, uppercase, tight) over Spline Sans (body).
Radius is 2px throughout — machined, not soft.

Each piece of work also carries its own accent, taken from that build's real
interface, so the rack reads as a collection of distinct tools rather than one
house style applied four times.

The logo is four separate tools standing in a rack that only resolve into an M
once all four are seated. The hero sequence animates exactly that: each piece of
work that lands raises one tool, then the shelf seats and the tag stamps shut.
Geometry lives in `src/components/markGeometry.ts` and is shared by the static
logo, the favicon and the animation.

## Interface figures

The case studies use reconstructed interface figures (`InterfaceFigure.tsx`)
rather than screenshots — drawn in each client's own interface colours using the
product's real room numbers, rates, states and labels, and captioned as
reconstructions. Guest names and other personal data from the live systems are
deliberately not reproduced.

To swap in a real screenshot: drop the image in `public/`, replace that figure's
body with an `<Image />`, and keep the `<figcaption>`.

## Open questions

These are marked in the code and need confirming before launch:

1. **Site domain.** `SITE.url` in `src/data/horde.ts` is `https://horde-m.name.ng`,
   inferred from the corrected contact address — the earlier `horde-m.agency.ng`
   came from the same string. If the website itself lives on a different domain,
   change `SITE` and everything (metadata, sitemap, robots, promo video) follows.
2. **Lamadew vs Luma Dew.** The storefront brands itself "Luma Dew"; the brief
   called it "Lamadew Cosmetics". The brief's name is used as the piece title,
   with "Luma Dew" shown as the product name. Correct in `PIECES` if wrong.
3. **Mr. Mouse vs Ledgerly vs PocketAccountant.** Three names for one product.
   The site uses "Mr. Mouse" with "PocketAccountant" as the product name,
   matching the previous site. The app screenshot says "Ledgerly".
4. **Download links.** Both Google Drive links are carried over unchanged from
   the old site. Confirm they are still live.
5. **CMS.** Stated as coming, with no waitlist capture, as requested.

## Email

The contact form and CMS waitlist send mail through [Resend](https://resend.com):

- `src/lib/mail.ts` — the Resend client and shared send helper
- `src/app/api/contact/route.ts` — validates the contact form, notifies
  `CONTACT.email` (receive), and sends the visitor a confirmation (send)
- `src/app/api/waitlist/route.ts` — same shape, for the CMS waitlist signup
- `src/components/ContactForm.tsx` / `WaitlistForm.tsx` — the client forms,
  each with a hidden honeypot field against basic bots

**Setup:**

1. Copy `.env.example` to `.env.local` and add your `RESEND_API_KEY`
   (from [resend.com/api-keys](https://resend.com/api-keys)). This file is
   gitignored — never commit a real key.
2. On your host (Vercel: Project Settings → Environment Variables), add the
   same `RESEND_API_KEY` for Production and Preview. Local `.env.local` only
   covers `npm run dev` on your own machine.
3. Mail sends from Resend's own onboarding address until `horde-m.name.ng` is
   verified as a sending domain in the Resend dashboard (Domains → Add
   Domain, then add the DNS records it gives you at your registrar). Once
   verified, set `RESEND_FROM_EMAIL` to send as `info@horde-m.name.ng`
   instead — see `.env.example`.

This environment's network policy blocks `api.resend.com`, so sending was
verified structurally (validation, honeypot, error handling all confirmed
against a local server) but not end-to-end. Test a real submission once
deployed.

## Deploying

Static output, so any Next.js host works; Vercel needs no configuration.
Update `metadataBase` in `src/app/layout.tsx` and the base URL in
`src/app/sitemap.ts` and `src/app/robots.ts` if the domain changes.

## History

This repository previously held a single-file `index.html` — the Mr. Mouse
download page. All of its content (downloads, the seven-step setup walkthrough,
the full feature taxonomy, and the FAQ) is preserved at `/download`, with the
product itself re-slotted as piece 04 in the rack. The original file is in git
history.
