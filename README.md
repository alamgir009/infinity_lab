# Infinity Lab — Company Website

Production website for **Infinity Lab**, a software engineering company
established 2016. Four pages: Home, Services, Projects, Contact.

## Stack

- **React 18 + Vite (JavaScript/JSX)** — no TypeScript, per project decision
- **Tailwind CSS 3** with centralized design tokens in `tailwind.config.js` and `src/index.css`
- **React Router 6** — lazy-loaded, route-level code splitting
- **react-icons** — per-icon imports for tree shaking
- **Vitest** — pure-logic unit tests (filtering, form validation, data shape)

## Prerequisites

- Node.js ≥ 18

## Setup

```bash
npm install
cp .env.example .env    # then fill in real values
npm run dev             # http://localhost:5173
```

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | Production base URL used for canonical/OG/sitemap absolute links |
| `VITE_FORM_ENDPOINT` | JSON POST endpoint receiving contact form submissions |
| `VITE_CONTACT_EMAIL` / `VITE_CONTACT_PHONE` / `VITE_CONTACT_WHATSAPP` / `VITE_CONTACT_ADDRESS` | Public contact details rendered on Contact page & footer |

> **Security note:** `VITE_*` variables are baked into the client bundle and
> visible to anyone who opens DevTools. **Never place secrets, private API
> keys, or credentials in them.** Only public, customer-facing business data
> belongs here.

### Contact form endpoint contract

The form POSTs JSON:

```json
{ "name": "...", "email": "...", "phone": "...", "service": "...", "message": "...", "submittedAt": "ISO-8601" }
```

Expected response on success: HTTP 2xx with JSON body (`{ "ok": true }` is
typical). On failure: non-2xx and/or `{ "message": "human readable reason" }`.
The UI never fakes success: without `VITE_FORM_ENDPOINT` set, the submit
button is disabled and a visible notice explains the missing configuration.
Spam protection uses an invisible honeypot field + a 15-second abort timeout;
**server-side validation is still required** at the endpoint.

## Build

```bash
npm run build       # outputs to dist/
npm run preview     # serve dist/ locally
npm run lint        # ESLint
npm test            # Vitest unit tests
```

## Deployment (Cloudflare Pages)

1. Push this repo; connect it in Cloudflare Pages (framework preset: **Vite**;
   build command `npm run build`; output dir `dist`). Uses free plan features
   only.
2. Add the environment variables above in *Pages → Settings → Environment
   variables* (they apply at build time).
3. `public/_headers` deploys automatically; it sets `X-Content-Type-Options`,
   `Referrer-Policy`, `Permissions-Policy`, a **Content-Security-Policy**, and
   long-lived cache for hashed assets. Before publishing, edit `_headers` to
   replace `https://your-form-endpoint.example` with the actual host of your
   `VITE_FORM_ENDPOINT`, or CSP will block form submissions.
4. Cloudflare Pages automatically serves `robots.txt` and `sitemap.xml` from
   `public/` and rewrites deep links to `index.html` for SPA routing.
   `dist/index.html` handles all four routes (`/`, `/services`, `/projects`,
   `/contact`).

### Security headers (documented for the deployment host)

Recommended minimum:

```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; connect-src 'self' https://<form-endpoint-host>; base-uri 'self'; frame-ancestors 'none'; form-action 'self' https://<form-endpoint-host>
```

## Project structure

```
src/
  data/        # single source of truth: siteConfig, projects, services
  components/  # Header, Footer, Button, Logo, ProjectCard, ServiceCard,
               # SectionHeading, BackToTop, ContactForm, Seo
  pages/       # Home, Services, Projects, Contact (lazy-loaded)
public/        # robots.txt, sitemap.xml, favicon.svg, _headers (Cloudflare)
tests/         # Vitest pure-logic tests
```

## Content integrity statement

Project details were derived only from the ten supplied URLs (plus the
supplied platform facts). Checked on 2026-10-26:

- ✅ Reachable: newsbazar24.com, iapro.in, impscet.net, speedwave.co.in,
  thehivehyd.in, impsconfseries.org, paulianport.in
- ⛔ DNS-unreachable: manage.infinitylab.co.in, ewalletbazar.com,
  indianchicksandfeed.com — kept listed with an explicit "Unverified link"
  badge, not claimed as live.

No metrics, timelines, clients or technologies were invented; where the
portfolio sites do not disclose facts, the site says so rather than guessing.

Contact details note: the email / phone / WhatsApp defaults in
`src/data/siteConfig.js` (and `VITE_CONTACT_*` overrides) come from the
company-controlled contact line published on iapro.in. The postal address is
**intentionally blank** — no verifiable official address was supplied; set
`VITE_CONTACT_ADDRESS` once confirmed. The contact form endpoint is left
unconfigured until a real backend exists (see setup above).

## Accessibility

Targets WCAG 2.2 AA: semantic landmarks, skip link, labelled controls,
`aria-pressed` filter group, polite live regions for form feedback,
44×44px minimum touch targets, visible focus rings, and full
`prefers-reduced-motion` support.

## License

Proprietary — © Infinity Lab.
