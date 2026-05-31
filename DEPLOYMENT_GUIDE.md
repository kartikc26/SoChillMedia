# Deploy to Vercel & Connect GoDaddy Domain

## Part 1: Deploy on Vercel

### Step 1: Go to Vercel

1. Open https://vercel.com
2. Click **"Sign Up"** (or sign in if you already have an account)
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

---

### Step 2: Import Your Repository

1. After signing in, click **"Add New..."** → **"Project"**
2. Select **"Import an existing project from GitHub"**
3. Search for **"SoChillMedia"** in the search box
4. Click **"Import"** next to your repository

---

### Step 3: Configure Project (Auto-Detected)

The settings should auto-fill:
- **Framework**: Next.js ✓
- **Root Directory**: `./` ✓
- **Node.js Version**: 18.x or higher ✓

**Just click "Deploy"** — nothing else to change.

---

### Step 4: Wait for Deployment

Vercel will:
1. Clone your code from GitHub
2. Run `npm install`
3. Build the project
4. Deploy automatically

This takes **2-5 minutes**. You'll see a URL like:
```
https://sochillmedia-kartikc26.vercel.app
```

**Your site is now live!** (Anyone can visit this URL)

---

### Step 5: Auto-Deploy on Future Changes

Every time you push to GitHub:
```bash
git add .
git commit -m "Your message"
git push
```

Vercel automatically redeploys. No extra steps needed.

---

## Part 2: Connect Your GoDaddy Domain

### Step 1: Get Your Domain's Nameservers

1. On Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Type your domain (e.g., `sochillmedia.in`)
5. Select **"Add"**

You'll see a message saying:
```
To complete the domain setup, update the nameservers at your domain registrar.
```

**Copy these nameservers from Vercel:**
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`
- `ns3.vercel-dns.com`
- `ns4.vercel-dns.com`

---

### Step 2: Update Nameservers on GoDaddy

1. Go to https://godaddy.com and **log in**
2. Click **"My Products"**
3. Find your domain and click it
4. Click **"DNS"** or **"Nameservers"** tab
5. Click **"Change Nameservers"**
6. Select **"I'll use custom nameservers"**
7. **Delete the old nameservers** (if any)
8. **Add Vercel's nameservers:**
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`
9. Click **"Save"**

---

### Step 3: Wait for DNS Propagation

It can take **24-48 hours** for DNS changes to propagate globally.

**To check if it's ready:**
1. Go back to Vercel → Your project → Settings → Domains
2. Your domain should show ✓ (green check)

---

### Step 4: Verify Domain is Working

Visit your domain:
```
https://sochillmedia.in
```

You should see your website live!

---

## Common Issues & Solutions

### Domain shows "Invalid DNS" on Vercel

**Solution:**
- Make sure you entered the **exact** Vercel nameservers
- Wait 24 hours for DNS to propagate
- Clear your browser cache and try again

### Domain still points to old website

**Solution:**
- DNS cache can take time to clear
- Try accessing from a different browser or device
- Wait up to 48 hours

### Want to use `www.sochillmedia.in` too?

**On Vercel:**
1. Go to Settings → Domains
2. Add a new domain: `www.sochillmedia.in`
3. Vercel handles the redirect automatically

---

## Quick Reference

| Step | Where | Action |
|------|-------|--------|
| 1 | Vercel | Sign up with GitHub |
| 2 | Vercel | Import SoChillMedia repo |
| 3 | Vercel | Click Deploy |
| 4 | Vercel | Copy nameservers |
| 5 | GoDaddy | Replace nameservers |
| 6 | Wait | DNS propagates (24-48h) |
| 7 | Browser | Visit your domain ✓ |

---

## After Deployment

### Making Changes

Every time you change content (in `src/data/site-data.ts` or any file):

```bash
cd "c:\Users\karti\Desktop\vsCode\SoChillMedia\website-enhanced"
git add .
git commit -m "Describe your changes"
git push
```

Vercel automatically redeploys within 1-2 minutes. No manual deployment needed.

### Checking Deployment Status

Go to https://vercel.com/dashboard and click your project. You'll see:
- **Deployments**: List of all deployments
- **Status**: Current status (Building/Ready/Failed)
- **Logs**: What happened during deployment

### Rolling Back to Previous Version

If something breaks:
1. Go to Vercel dashboard → Your project
2. Click on "Deployments"
3. Find the previous working version
4. Click the **"..."** menu → **"Promote to Production"**

Done. Your site is back to the working version.

---

## Troubleshooting Deployment

### Build Failed Error

**Common cause:** Missing dependency or syntax error

**Solution:**
- Check the error message in Vercel logs
- Fix the issue in your local code
- Run `git push` again

### Website shows old content

**Solution:**
- Clear your browser cache (Ctrl+Shift+Del)
- Wait 2-3 minutes for Vercel to deploy
- Try incognito/private window

### Custom domain not loading

**Solution:**
1. Check nameservers are updated on GoDaddy
2. Wait 48 hours for full propagation
3. Try clearing browser cache
4. Try from different network/device

---

## Security (Optional)

Once deployed, you can enable HTTPS (it's already enabled by default):

1. Vercel Settings → Domains → Your domain
2. You should see **🔒 Secure** indicator
3. All traffic is automatically redirected to HTTPS

---

## Summary

✅ Website is live on Vercel  
✅ Connected to your custom domain  
✅ Auto-deploys on every GitHub push  
✅ Always uses latest HTTPS  
✅ Free CDN & hosting (Vercel free tier)

Done! Your website is now live and manageable from the GitHub workflow.
