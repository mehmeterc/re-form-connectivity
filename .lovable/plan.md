# Plan: Add /portfolio route with cinematic portfolio page

## Goal
Add a new `/portfolio` route that displays Mehmet Dadal Ercan's selected moving-image work as a self-contained, dark/editorial-cinematic page while leaving the existing Re:Form Hub landing page untouched.

## What will be built

1. **New page component** `src/pages/Portfolio.tsx`
   - Hero/page title: "Selected Moving-Image Work" with the existing gradient title style (`text-gradient heading-glow`).
   - Two vertical cinematic cards, one per film:
     - **Life Is an Odyssey** — AI-assisted fictional commercial film · 2026 — embed `https://www.youtube.com/embed/MgCVK6PFNX0`
     - **Vahit Abi Vampir Oldu (Vahit Abi Became a Vampire)** — AI film project — elevator pitch · 2026 — embed `https://www.youtube.com/embed/eu0w5tIHQ6I`
   - Each card contains the title, format, real 16:9 responsive YouTube iframe (no autoplay), description, and a subtle cinematic border/glow using existing brand colors.
   - **About** section with the provided bio text.
   - **Connect** section with LinkedIn (`https://www.linkedin.com/in/mehmet-ercan/`) and Instagram (`https://www.instagram.com/mehmetdadalercan`) links opening in new tabs.
   - **Footer** line on the page: "Mehmet Dadal Ercan · Filmmaker, Visual Anthropologist & AI-Native Storyteller · Berlin / Lutherstadt Wittenberg".

2. **Routing**
   - Register `<Route path="/portfolio" element={<Portfolio />} />` in `src/App.tsx` before the catch-all `*` route.
   - No other route changes.

3. **Design consistency**
   - Reuse existing Tailwind tokens and utility classes: `bg-background`, `text-foreground`, `glassmorphism`, `glow-card`, gradients, rounded corners, spacing.
   - Iframes use `aspect-video`, `w-full`, `rounded-xl`, and a thin `border-white/10 dark:border-reform-cyan/20` frame.
   - Mobile-first responsive layout; generous vertical spacing between cards.

4. **Head metadata**
   - Update `index.html` `<title>` and `<meta name="description">` to real app-specific values for the whole project (the current description is the Lovable template default).
   - The portfolio page will also update `document.title` via `useEffect` when mounted.

## What will NOT change
- The existing homepage (`/`), its sections, components, header, footer, chatbot, newsletter logic, or Supabase configuration.
- No stock/placeholder media, fake awards, or generic AI imagery.
- No autoplay on videos.

## Technical details
- React 18, Vite, React Router, Tailwind CSS v3, TypeScript.
- No new dependencies needed; YouTube embeds are plain `iframe` elements.
- The page will be reachable at `/portfolio` after deployment thanks to Lovable's built-in SPA fallback.
