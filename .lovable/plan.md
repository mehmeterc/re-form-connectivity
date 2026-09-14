# Plan: Add Portfolio link to the mobile navigation

## Goal
Add a visible link to the `/portfolio` page inside the hamburger/mobile menu (and keep the existing desktop nav ready) so users can navigate to the portfolio subpage from the home page.

## What will be built

1. **Add bilingual navigation label**
   - In `src/lib/translations.ts`, add `portfolio: 'Portfolio'` to both the `de` and `en` `nav` objects.

2. **Add the route to the header navigation**
   - In `src/components/Header.tsx`, add a new entry to the `navLinks` array:
     - label: `t('nav.portfolio')`
     - route: `/portfolio`
   - Use React Router's `<Link>` for this route entry (the others are anchor links to sections on `/`, so they keep `<a>` tags).
   - Ensure the mobile hamburger menu item closes the menu on click and links to `/portfolio`.
   - Keep styling consistent with the existing nav items.

## What will NOT change
- No changes to the Portfolio page itself or its YouTube embeds.
- No changes to desktop nav behavior except making the new link available if the desktop nav is enabled.
- No changes to the existing landing-page sections, order, or content.

## Technical details
- React Router `Link` from `react-router-dom`.
- Existing Tailwind classes and color tokens preserved.
- German/English versions kept in sync.
