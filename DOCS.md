# SoChillMedia Website — Complete Guide

> Simple documentation to set up, run, edit, and upgrade the website.

---

## Table of Contents

1. [First-Time Setup (New PC)](#1-first-time-setup-new-pc)
2. [Daily Workflow](#2-daily-workflow)
3. [How to Edit Content](#3-how-to-edit-content)
4. [How to Add a New Section/Page](#4-how-to-add-a-new-sectionpage)
5. [How to Add a Nav Button](#5-how-to-add-a-nav-button)
6. [Project Structure](#6-project-structure)
7. [How the Scroll Animation Works](#7-how-the-scroll-animation-works)
8. [Deployment (Vercel + GitHub)](#8-deployment-vercel--github)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. First-Time Setup (New PC)

### Prerequisites

Install these (one-time):

| Software | Download | Why |
|----------|----------|-----|
| Node.js | https://nodejs.org (LTS version) | Runs the website locally |
| Git | https://git-scm.com | Version control |
| VS Code | https://code.visualstudio.com | Code editor |

### Steps

```bash
# 1. Clone the project from GitHub
git clone https://github.com/kartikc26/SoChillMedia.git

# 2. Go into the project folder
cd SoChillMedia/website-enhanced

# 3. Install dependencies (downloads all packages — takes 2-3 minutes)
npm install

# 4. Start the website locally
npm run dev
```

Open http://localhost:3000 in your browser. Done!

---

## 2. Daily Workflow

### Start working

```bash
cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"
npm run dev
```

Website runs at http://localhost:3000. Changes auto-refresh in the browser.

### Save and publish changes

```bash
git add .
git commit -m "Describe what you changed"
git push
```

Vercel auto-deploys within 2 minutes. No extra steps.

### Stop the server

Press `Ctrl + C` in the terminal.

---

## 3. How to Edit Content

**ALL website text lives in ONE file:** `src/data/site-data.ts`

### Change Contact Info

```ts
export const contactInfo = {
  phone: "+917249992499",
  email: "aryankapoor@sochillmedia.in",
  instagram: "https://www.instagram.com/sochillmedia.co",
  instagramHandle: "@sochillmedia.co",
  website: "sochillmedia.in",
  whatsapp: "https://wa.me/917249992499",
};
```

### Add a Team Member

Add a new block inside the `team` array:

```ts
export const team = [
  // ... existing members ...
  {
    name: "New Person",
    role: "Their Job Title",
    vibe: "Short catchy line about them",
  },
];
```

To remove: delete their `{ name, role, vibe }` block.

### Add a Service

Add a new block inside the `services` array:

```ts
export const services = [
  // ... existing services ...
  {
    title: "New Service Name",
    description: "One line about what it includes.",
  },
];
```

### Update Stats

```ts
export const stats = [
  { value: "500+", label: "Reels Created" },
  { value: "50+", label: "Brands Served" },
  { value: "100%", label: "Client Retention" },
];
```

### Change the Logo

Replace `public/logo.png` with your new logo file (keep the same filename).

### Change Colors

In `tailwind.config.ts`:
```ts
accent: "#0033CC",        // Button/accent color
"accent-dark": "#002299", // Hover state
```

---

## 4. How to Add a New Section/Page

This website uses a **single-page scroll animation**. All sections are inside `CinematicHero.tsx` and appear as you scroll. To add a new section:

### Step 1: Add your section content in `src/data/site-data.ts`

Example — adding a "Portfolio" section:

```ts
export const portfolio = [
  { title: "Brand X Campaign", image: "/portfolio/brand-x.jpg" },
  { title: "Reel Series Y", image: "/portfolio/reel-y.jpg" },
];
```

### Step 2: Add the section scene in `src/components/CinematicHero.tsx`

Find the scenes area (look for `{/* SERVICES SCENE */}`, `{/* TEAM SCENE */}`, etc.) and add your new scene between existing ones:

```tsx
{/* PORTFOLIO SCENE */}
<div className="scene-portfolio absolute inset-0 flex items-center z-10 pt-20">
  <div className="w-full max-w-7xl mx-auto px-4 lg:px-12">
    <p className="text-blue-400 uppercase text-xs tracking-widest font-bold mb-2">Our Work</p>
    <h3 className="text-xl lg:text-3xl font-bold text-white mb-8">Portfolio</h3>
    {/* Your content here */}
  </div>
</div>
```

### Step 3: Add GSAP animation for the new scene

In the same file, find the timeline (the `.to()` and `.fromTo()` chains). Add animation for your scene:

```ts
// PHASE X: Show Portfolio
.to(".scene-team", { autoAlpha: 0, duration: 1, ease: "power2.in" })  // hide previous scene
.fromTo(".scene-portfolio", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 })  // show your scene
.to({}, { duration: 2 })  // pause so user can read
```

### Step 4: Update scroll distance

If you added a new section, increase the total scroll distance in `CinematicHero.tsx`:

```ts
const scrollDistance = isMobile ? 9000 : 17000;  // increase from 7000/14000
```

### Step 5: Update nav scroll positions

In `src/data/site-data.ts`, adjust the percentages (must add up to less than 1):

```ts
export const navScrollProgress: Record<string, number> = {
  services: 0.28,
  portfolio: 0.45,  // ← new section
  team: 0.62,
  contact: 0.82,
};
```

### Step 6: Add nav button (see next section)

---

## 5. How to Add a Nav Button

### What to change (2 things in `src/data/site-data.ts`):

**1. Add the scroll position** — where should clicking the button scroll to:

```ts
export const navScrollProgress: Record<string, number> = {
  services: 0.35,
  team: 0.58,
  portfolio: 0.72,  // ← ADD THIS (number between 0 and 1)
  contact: 0.82,
};
```

The number is a percentage of total page scroll:
- `0.0` = top of page
- `0.5` = middle of page
- `1.0` = bottom of page

**2. Add the button** — what text shows in the navbar:

```ts
export const navLinks = [
  { label: "Services", key: "services" },
  { label: "Team", key: "team" },
  { label: "Portfolio", key: "portfolio" },  // ← ADD THIS
];
```

The `key` must match what you used in `navScrollProgress`.

That's it! The navbar and footer automatically pick up new links.

### The "Let's Work Together" button

This button is hardcoded in `src/components/Navbar.tsx` (not in navLinks) because it has special styling. It scrolls to `contact` position. To change its text, edit `Navbar.tsx` directly.

---

## 6. Project Structure

```
website-enhanced/
├── public/
│   └── logo.png                ← Website logo (replace to change)
├── src/
│   ├── app/
│   │   ├── globals.css         ← Styles, animations, effects
│   │   ├── layout.tsx          ← SEO meta tags, page wrapper
│   │   ├── page.tsx            ← Main page (imports components)
│   │   ├── error.tsx           ← Error page
│   │   ├── not-found.tsx       ← 404 page
│   │   ├── robots.ts           ← SEO for search engines
│   │   └── sitemap.ts          ← Sitemap for Google
│   ├── components/
│   │   ├── CinematicHero.tsx   ← Main scroll animation (complex)
│   │   ├── Navbar.tsx          ← Top navigation bar
│   │   └── Footer.tsx          ← Bottom footer
│   └── data/
│       └── site-data.ts        ← ⭐ ALL EDITABLE CONTENT
├── package.json                ← Dependencies list
├── tailwind.config.ts          ← Tailwind CSS colors/config
└── tsconfig.json               ← TypeScript config
```

### What each file does:

| File | Purpose | Safe to edit? |
|------|---------|---------------|
| `src/data/site-data.ts` | All text, services, team, nav links | ✅ Yes — edit freely |
| `src/components/Navbar.tsx` | Navigation bar | ✅ Yes — for nav changes |
| `src/components/Footer.tsx` | Page footer | ✅ Yes — for footer changes |
| `src/components/CinematicHero.tsx` | Scroll animation | ⚠️ Careful — complex GSAP logic |
| `src/app/globals.css` | Styles and effects | ⚠️ Careful — affects animations |
| `public/logo.png` | Logo image | ✅ Yes — just replace the file |
| `tailwind.config.ts` | Colors, fonts | ✅ Yes — for color changes |
| `src/app/layout.tsx` | SEO title, description | ✅ Yes — for SEO changes |

---

## 7. How the Scroll Animation Works

The website uses **GSAP ScrollTrigger** — as you scroll down, different scenes appear:

```
Phase 1: Hero text ("We make brands go viral")
Phase 2: Dashboard phone mockup + stats
Phase 3: Services grid
Phase 4: Team members
Phase 5: Contact info
Phase 6: Fade to footer
```

Key settings in `CinematicHero.tsx`:

```ts
const scrollDistance = isMobile ? 7000 : 14000;  // total scroll height
```

- Desktop gets 14000px of scroll (more content time)
- Mobile gets 7000px (less scrolling needed)

### Navigation works by percentage

```ts
// In site-data.ts
export const navScrollProgress = {
  services: 0.35,   // 35% down the page
  team: 0.58,       // 58% down the page
  contact: 0.82,    // 82% down the page
};
```

When you click "Services", it calculates:
```
target = 0.35 × (total scrollable height)
```

This works on ANY screen size — desktop, mobile, tablet.

---

## 8. Deployment (Vercel + GitHub)

### How it works:

```
You edit code → git push → GitHub receives it → Vercel auto-deploys → Live in 2 min
```

### First-time Vercel setup:

1. Go to https://vercel.com → Sign in with GitHub
2. Click "Add New Project" → Import "SoChillMedia"
3. Root Directory: `website-enhanced`
4. Click Deploy

### Connect custom domain (sochillmedia.in):

1. Vercel → Project → Settings → Domains → Add `sochillmedia.in`
2. GoDaddy → DNS → Change nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. Wait 24-48 hours for DNS to propagate

### Every future change:

```bash
git add .
git commit -m "What I changed"
git push
```

Vercel handles everything else automatically.

---

## 9. Troubleshooting

### "npm run dev" doesn't work

```bash
# Delete node_modules and reinstall
rm -r node_modules
rm package-lock.json
npm install
npm run dev
```

### Page shows weird cache issues

```bash
# Delete the build cache
rm -r .next
npm run dev
```

### "Cannot find module" error

```bash
rm -r .next
npm run dev
```

### Git push fails

```bash
# If you get "rejected" error
git pull --rebase
git push
```

### Website not updating on Vercel

1. Check https://vercel.com → your project → Deployments
2. Look for build errors (red X)
3. If error: fix code locally → push again

### Port 3000 already in use

```bash
# Kill whatever is using port 3000
npx kill-port 3000
npm run dev
```

---

## Quick Reference Card

| I want to... | Do this |
|--------------|---------|
| Start the website locally | `npm run dev` |
| Add a team member | Edit `src/data/site-data.ts` → `team` array |
| Add a service | Edit `src/data/site-data.ts` → `services` array |
| Add a nav button | Add to `navLinks` + `navScrollProgress` in site-data.ts |
| Change the logo | Replace `public/logo.png` |
| Change colors | Edit `tailwind.config.ts` |
| Change contact info | Edit `src/data/site-data.ts` → `contactInfo` |
| Publish changes | `git add . && git commit -m "msg" && git push` |
| Fix broken page | `rm -r .next && npm run dev` |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.35 | React framework |
| React | 18 | UI library |
| GSAP | 3.15.0 | Scroll animations |
| Tailwind CSS | 3.4.1 | Styling |
| TypeScript | 5 | Type safety |
| Vercel | — | Hosting & deployment |
| GitHub | — | Code storage |
