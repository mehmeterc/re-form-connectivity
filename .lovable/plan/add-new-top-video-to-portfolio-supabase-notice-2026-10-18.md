# Add new top video to Portfolio + Supabase notice

## 1. New first film on /portfolio
Add as the first card (above "Life Is an Odyssey"), same click-to-play privacy style:
- Title: A Mundane Miracle
- Format: AI-assisted short film · 2026 · 2 min
- Video: YouTube rGqvah_Wj2I (youtube-nocookie, loads only after click)
- Description: "A childhood dream of flying just 30 centimeters above the ground becomes a reflection on the early days of AI. A playful reminder that even the smallest miracle is still a miracle."

Only `src/pages/Portfolio.tsx` changes (new entry at the top of the `works` list).

## 2. Supabase "paused" message
The site no longer uses Supabase at all. The message comes from Lovable itself: the old Supabase project is still linked to this Lovable project in the settings. It does not affect reformhub.de.
To get rid of it: Lovable project settings → Integrations / Supabase → Disconnect. Then remove the leftover `supabase/config.toml` and the Supabase lines in `.env` (I'll delete the config file in this step).
