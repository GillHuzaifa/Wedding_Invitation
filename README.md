# Jaisha & Zarrar — Luxury Wedding Invitation

A mobile-first, premium Pakistani wedding invitation website with:
- luxury maroon, burgundy, champagne and gold theme
- cinematic opening envelope and wax-seal interaction
- bride/groom hero video with autoplay compatibility and poster fallback
- floating curtain treatment and subtle animated bird silhouettes
- scratch-to-reveal Nikah & Mehndi date
- event cards, program timeline, venue details, maps and countdown
- no RSVP section

## Files
- `index.html` — page structure
- `css/styles.css` — responsive styling and animations
- `js/config.js` — wedding details and media paths
- `js/app.js` — interactions and dynamic rendering
- `assets/bride-groom-hero.mp4` — client-supplied hero video, browser-safe H.264 version
- `assets/hero-poster.jpg` — fallback poster for slow/blocked/unsupported video playback

## Deploy
Upload the entire folder to Vercel, Netlify, Hostinger, or any static hosting provider. Keep the folder structure unchanged.


## Wedding music
The player is wired to start from the Tap to Open gesture and the control is positioned in the top-right corner. To use Jashn-E-Bahaaraa, add a properly licensed/local audio file as `assets/jashn-e-bahaara.mp3` and set `media.music` to that path plus `musicEnabled: true` in `js/config.js`.
