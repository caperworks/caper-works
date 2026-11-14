# Caper Works Previews

Holds client demo sites, served at https://previews.caperworks.com/<slug>/

This is an orphan branch (`previews`) with no relation to the main site's files.
Cloudflare Pages project "caper-previews" deploys it (production branch = `previews`).

## Add a demo
1. Create a folder with an unguessable slug: `acme-clinic-7k2x/`
2. Put the built site inside, with `index.html` at its root.
3. Use RELATIVE asset paths (`assets/style.css`, not `/assets/style.css`).
   Framework builds: set the base path to `/<slug>/` (e.g. Vite `base`).
4. Commit and push. Link: https://previews.caperworks.com/<slug>/

## Rules
- Everything is noindex (robots.txt + `_headers`). Never list demos in a sitemap.
- Static output only (no backend).
- When a client approves, move the folder into their own repo and delete it here.
