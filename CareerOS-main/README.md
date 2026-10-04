# CareerOS — Deployment Guide

## 1. Tech stack (verified)

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 13.5.1**, App Router, React 18.2, TypeScript 5.2 | Runs on Vercel/Netlify natively |
| Styling | Tailwind CSS 3.3 + shadcn/ui | `components/ui/*` |
| Backend | **None separate** — no custom Node server | All data via Supabase client SDK |
| Database + Auth | **Supabase** (project `mrkjknuhwdyfwmjhagur`) | Postgres + GoTrue auth |
| Charts | Recharts | |
| Hosting config | `netlify.toml` present (Netlify-flavoured) | Vercel needs no config file |

**Routes (all statically prerendered):** `/`, `/login`, `/signup`, `/dashboard`,
`/jobs`, `/resume`, `/tracker`, `/interview`, `/settings`

## 2. Environment variables

Defined in `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

`lib/supabase.ts` reads these with a fallback to the current project, so the app
runs even if the variables are missing.

> The `NEXT_PUBLIC_` prefix means these are **inlined into the client bundle at
> build time**. The anon key is designed to be public — it is protected by your
> Supabase Row Level Security policies. Never put the **service_role** key in here.

## 3. Git state

Remote `origin` = `https://github.com/Haneeshap/CareerOS-main.git`, branch `main`.

> **Important:** the GitHub repo root is `CareerOS-main/`, but the actual Next.js
> app lives in the **`CareerOS-main/CareerOS-main/`** subfolder. There is **no**
> `package.json` at the repo root. You must set the deployment platform's
> **Root Directory** to `CareerOS-main` or the build will fail.

## 4. Deploy to Vercel (recommended — free)

Vercel is the best fit: first-class Next.js support, zero config, free Hobby tier
(100 GB bandwidth, 1M function invocations, 1M CDN requests/month).

### Option A — Dashboard (easiest)

1. Go to <https://vercel.com/new>
2. Sign in with GitHub → **Import** the repo `Haneeshap/CareerOS-main`
3. On the setup screen click **Edit** next to **Root Directory** and set:
   ```
   CareerOS-main
   ```
   > This is the single most important step. Without it Vercel looks for
   > `package.json` at the repo root, finds none, and the build errors out.
4. Framework should auto-detect as **Next.js**. Build Command `next build`,
   Output Directory `.next` — leave the defaults.
5. Open **Environment Variables** and add both keys. Set each for
   **Production**, **Preview**, and **Development**:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://mrkjknuhwdyfwmjhagur.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = *(your anon key)*
6. Click **Deploy**. You get a URL like `https://career-os-main.vercel.app`.

Every subsequent `git push` to `main` redeploys automatically.

### Option B — Vercel CLI

```powershell
npm i -g vercel
cd C:\Users\hanee\Downloads\CareerOS-main
vercel login
vercel            # first run: preview
vercel --prod     # production
```

Add the secrets once and they persist:

```powershell
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

## 5. Deploy to Netlify (alternative — free)

The repo already contains `netlify.toml` with `@netlify/plugin-nextjs`.

1. Go to <https://app.netlify.com/drop> or **Add new site → Import an existing project**
2. Connect `Haneeshap/CareerOS-main`
3. Set **Base directory** = `CareerOS-main`  ← required
4. Build command `npm run build`, publish directory `CareerOS-main/.next`
5. **Site configuration → Environment variables** → add both keys
6. **Deploy site**

> If `@netlify/plugin-nextjs` prompts to update, accept it. Otherwise the build
> will fail on the missing plugin.

## 6. Backend / database

Nothing to deploy — **Supabase is already live in the cloud** at
`https://mrkjknuhwdyfwmjhagur.supabase.co`. Just confirm before going live:

- [ ] Supabase **Authentication → URL Configuration** has your production
      domain (e.g. `career-os-main.vercel.app`) added to **Site URL** and
      **Redirect URLs**. Sign-in will silently fail otherwise.
- [ ] Tables exist and **Row Level Security** is enabled with policies, so users
      can only read their own rows.
- [ ] Email provider configured under **Authentication → Providers** (the Supabase
      default has a strict rate limit).

## 7. Redeploying after changes

```powershell
cd C:\Users\hanee\Downloads\CareerOS-main
git add -A
git commit -m "describe your change"
git push origin main
```

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `Could not find a production build in the '.next' directory` | Root Directory not set to `CareerOS-main` |
| `Module not found: Can't resolve './package.json'` | Same — Root Directory wrong |
| Build fails on missing `NEXT_PUBLIC_SUPABASE_URL` | Add the env var in the platform dashboard |
| Login returns an error / no session | Add your domain to Supabase Auth redirect URLs |
| Blank page, works locally | Check the platform's runtime logs; verify env vars were set for the right environment |
