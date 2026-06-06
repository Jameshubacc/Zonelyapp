# Zonely

A tiny, installable **PWA** for converting times across cities and time zones.
No build step — vanilla HTML/CSS/JS. Brand mascot: a Shiba Inu holding a time-zone globe. 🐕🌐

## Features
- Convert from any source city to many destinations at once
- **Now** mode (live current time) or pick any **date + time**
- At-a-glance **time-of-day sky tiles** (morning / afternoon / evening / night) per city
- Plain-English **hours ahead / behind** and **+1 / −1 day** markers
- **Tap a city** to swap it to the source; **Edit** to remove
- Light & dark mode, offline-capable (service worker), installable to your home screen

## Run locally
Any static server works. With Python:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy (free HTTPS via GitHub Pages)
1. Push this repo to GitHub (see below).
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` / `/ (root)`, **Save**.
3. Your app goes live at `https://<username>.github.io/<repo>/` — installable on any phone.

## Project layout
- `index.html` — UI + styles
- `app.js` — all logic (cities, time math, rendering)
- `manifest.json`, `sw.js` — PWA manifest + offline service worker
- `icons/` — app icons (512 / 192 / 180)
- `brand/` — Zonely design kit: logo directions, wordmark, city landmarks, time-of-day tiles

## Credits
Brand & icon system: "Zonely" design handoff. Time math uses the browser's `Intl` API.
