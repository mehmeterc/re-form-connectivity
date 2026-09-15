# Fix: direct link to /portfolio shows "page doesn't exist"

## What's happening

Opening the Portfolio page through the menu works, because the site is already loaded and switches pages internally. Typing `www.reformhub.de/portfolio` directly asks the web host for a page called "portfolio" — and the host that currently serves `reformhub.de` doesn't know it should hand the request back to the site, so it answers with its own 404 error page.

Two facts confirmed:

- `reformhub.de` is **not** connected to this Lovable project (no custom domain is attached here). It is served by another host — the error screen in the screenshot is Vercel's 404 page.
- The project has no host configuration file telling that host to route unknown paths to the app.

Lovable's own hosting handles this automatically, which is why the page works fine in the preview.

## The fix

1. Add a small hosting configuration file so the external host (Vercel) sends every unknown address back to the app, which then shows the right page. This makes `/portfolio` — and any future page — work when opened directly or refreshed.
2. Nothing else changes: no page content, no styling, no menu behaviour, no database. This file is ignored by Lovable's own hosting, so the preview and the Lovable URL stay exactly as they are.
3. After that, the change has to reach `reformhub.de`. Since that domain is served outside Lovable, the site must be redeployed there (a fresh deploy from the connected repository) for the fix to take effect.

## Alternative worth considering

If you'd rather have everything in one place, `reformhub.de` can be pointed at Lovable directly (Project settings → Domains). Then direct links work with no config file at all and publishing from here updates the live site. Tell me if you want to go this route instead and I'll walk you through it.

## Technical details

- New file `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
  A rewrite (not a redirect) keeps the URL intact so React Router resolves `/portfolio`; real files under `/assets` and `/public` are still served normally because Vercel matches filesystem paths before rewrites.
- No `public/_redirects` file — Lovable hosting ignores it, so it would be dead weight.
- No changes to `src/App.tsx` routes, `Header.tsx`, or `Portfolio.tsx`; the client-side route already exists and works.
- Verification: build must stay green, and `/portfolio` plus `/` must still render in the preview after the change.
