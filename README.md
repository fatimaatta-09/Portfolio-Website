# FR-OS — Fatima Rehman Portfolio

> Kali Linux OS-style interactive portfolio · Claymorphism · Static · Zero backend

**Live at:** `https://YOUR_USERNAME.github.io/fr-portfolio/`
*(update after first deploy)*

---

## File Structure

```
fr-portfolio/
├── index.html          ← Full site UI (windows, dock, wallpaper)
├── style.css           ← All styles (Kali theme, claymorphism, responsive)
├── os-logic.js         ← Window manager, terminal, drag, forms, particles
├── config.js           ← ★ THE ONLY FILE YOU EVER EDIT
├── .github/
│   └── workflows/
│       └── deploy.yml  ← Auto-deploys to GitHub Pages on every push
└── README.md
```

---

## Quick Start — Deploy in 5 Minutes

### Step 1 — Set up Web3Forms (free, no backend, email stays private)

1. Go to **https://web3forms.com**
2. Enter your email address → click **Create Access Key**
3. Copy the key (looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
4. Open `config.js` and paste it:
   ```js
   FORM_KEY: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   ```
5. That's it. Your email **never appears in the code**. Anyone can see your repo publicly.

### Step 2 — Push to GitHub

```bash
# First time setup
git init
git add .
git commit -m "launch: FR-OS portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fr-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. **Settings → Pages**
3. Under **Source** → select **GitHub Actions**
4. The workflow runs automatically — your site is live in ~60 seconds at:
   `https://YOUR_USERNAME.github.io/fr-portfolio/`

### Step 4 — (Optional) Custom Domain `.me`

1. Buy `fatima-rehman.me` on Namecheap (~$2/yr)
2. In repo: **Settings → Pages → Custom domain** → enter `fatima-rehman.me`
3. GitHub shows you DNS records to add
4. In Namecheap DNS:
   - Add `A` records pointing to GitHub's IPs (shown in Pages settings)
   - Add `CNAME` for `www` pointing to `YOUR_USERNAME.github.io`
5. Check **Enforce HTTPS** in Pages settings
6. DNS propagates in 5–30 minutes → done

---

## Updating the Site

**Only edit `config.js`** — everything else auto-renders from it.

| What to update | Where in config.js |
|---|---|
| New project | `CFG.projects` array |
| New cert earned | `CFG.certs` — change `status:"plan"` to `status:"done"`, add `date` and `credId` |
| Paper published | `CFG.PAPER_LINK = "https://doi.org/..."` |
| New tool | `CFG.tools` array |
| News / milestone | `CFG.updates` array |
| Terminal commands | `CFG.termCommands` object |

After editing, just push:
```bash
git add config.js
git commit -m "update: add new cert / project / etc"
git push
```
GitHub Actions redeploys in ~30 seconds.

---

## Keyboard Shortcuts

| Key | Opens |
|-----|-------|
| `T` | Terminal |
| `A` | About |
| `P` | Projects |
| `S` | Skills |
| `R` | Research |
| `C` | Contact |
| `Esc` | Exit maximised window |

---

## Why No Email in the Repo?

The contact form submits to **Web3Forms** (`api.web3forms.com`).
Web3Forms maps your **access key → your inbox** on their server.
The key is not secret — it's safe to commit. Your email is stored only on Web3Forms' server, never in your public code.

This means:
- You can make the repo **fully public** immediately
- No Flask, no Node, no Heroku, no secrets, no `.env` file
- Works on GitHub Pages (static hosting only)

---

## Security Notes

- No API keys or secrets of any kind in any file
- No phone number in the UI (removed by design)
- All external links use `rel="noopener noreferrer"`
- Form submissions are rate-limited by Web3Forms on their end
- CSP-compatible (no inline event handlers except form buttons)

---

*Fatima Rehman · GIKI 2024–2028 · linkedin.com/in/fatima-rehman*
