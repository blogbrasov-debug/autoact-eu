# Phase 1: GitHub Connection + Auto-Deploy Setup

**Status:** Phase 1 - GitHub + Netlify Auto-Deploy  
**Date:** 2026-10-12  
**Objective:** Enable automatic deployment to Netlify on every git push (matching ClarTransfer workflow)

---

## 📋 Pre-Setup Checklist

- ✅ HTML extracted from Netlify live deployment
- ✅ Directory structure created (`css/`, `js/`, `vendor/`)
- ✅ Supporting files created (README.md, package.json, .gitignore)
- ⏳ **REQUIRED:** CSS, JS config, and app.js files (see Step 1 below)
- ⏳ **REQUIRED:** qr-code-styling library

---

## Step 1: Add Missing Source Files

### Option A: Use Your Local Source Files (Recommended)
If you have the source code on your computer at `C:\Users\alex\Desktop\LUCRU & PROIECTE\CodQr`:

1. Copy these files to the project folder:
   - `css/style.css` → `/css/style.css`
   - `js/config.js` → `/js/config.js`
   - `js/app.js` → `/js/app.js`
   - `vendor/qr-code-styling.min.js` → `/vendor/qr-code-styling.min.js`

2. If you don't have `qr-code-styling.min.js` locally, download from NPM:
   ```bash
   npm install qr-code-styling
   # Copy from node_modules/qr-code-styling/lib/qr-code-styling.min.js
   ```

### Option B: Re-Extract from Live Netlify Deployment
If you don't have local source files, use the Live site to get CSS/JS:

1. **Fetch CSS:**
   ```bash
   curl "https://rainbow-chebakia-3e9542.netlify.app/css/style.css" -o css/style.css
   ```

2. **Fetch JS files:**
   ```bash
   curl "https://rainbow-chebakia-3e9542.netlify.app/js/config.js" -o js/config.js
   curl "https://rainbow-chebakia-3e9542.netlify.app/js/app.js" -o js/app.js
   ```

3. **Fetch qr-code-styling library:**
   ```bash
   curl "https://cdn.jsdelivr.net/npm/qr-code-styling@3.0.0/lib/qr-code-styling.min.js" -o vendor/qr-code-styling.min.js
   ```

### Option C: Email Files to Yourself
Send the files to **blogbrasov@gmail.com** as a ZIP, then extract into the project folder.

---

## Step 2: Verify Local Setup

Run these commands in the project folder to verify all files are present:

```bash
# Check directory structure
ls -la css/style.css
ls -la js/config.js
ls -la js/app.js
ls -la vendor/qr-code-styling.min.js

# All should exist without errors
```

**Expected output:**
```
-rw-r--r-- css/style.css
-rw-r--r-- js/config.js
-rw-r--r-- js/app.js
-rw-r--r-- vendor/qr-code-styling.min.js
```

---

## Step 3: Test Locally (Optional)

Before pushing to GitHub, verify the site works locally:

```bash
# Start a local server
python -m http.server 8000
# OR
npm run dev
```

Open browser: http://localhost:8000

---

## Step 4: Create GitHub Repository

### 4a. Create repo on GitHub
1. Go to https://github.com/new
2. Repository name: **codqr-ro**
3. Description: "Coduri QR personalizate, generate instant"
4. Choose: **Public** (as requested)
5. Initialize with: Nothing (we'll push existing code)
6. Click "Create repository"

### 4b. Initialize Git locally

```bash
# From the project folder
git init
git add .
git commit -m "Initial commit: CodQR.ro source code

This is the extracted source from the live Netlify deployment.
Includes HTML configurator, CSS styling, QR generation logic,
and payment integration via Gumroad.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01MvPmZc7NxU4rJfyxvhDDXP"
```

### 4c. Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/codqr-ro.git
git branch -M main
git push -u origin main
```

**Verify:** Go to https://github.com/YOUR_USERNAME/codqr-ro and confirm all files are there.

---

## Step 5: Connect GitHub to Netlify for Auto-Deploy

### 5a. Link GitHub in Netlify Admin

1. Go to https://app.netlify.com/teams/TEAM_ID/sites (or direct to your site)
2. Go to **Site Settings** → **Build & Deploy** → **Deploy from Git**
3. Click **Connect repository**
4. Select **GitHub** as provider
5. Authenticate with GitHub (if needed)
6. Choose repository: `codqr-ro`
7. Choose branch: `main`
8. Build command: (leave empty — static site)
9. Publish directory: `.` (root of repo)
10. Click **Deploy**

### 5b. Wait for First Deploy

Netlify will automatically build and deploy. Watch the deploy log at:
https://app.netlify.com/sites/rainbow-chebakia-3e9542/deploys

Expected status: **Published** ✅

### 5c. Verify Auto-Deploy Works

1. Make a small change to `index.html` (e.g., change a comment)
2. Commit and push:
   ```bash
   git add index.html
   git commit -m "Test auto-deploy"
   git push
   ```
3. Go to Netlify deploy log — should see new deploy triggered automatically
4. Wait for **Published** status
5. Verify change is live at https://rainbow-chebakia-3e9542.netlify.app

---

## Step 6: (Optional) Setup Branch Protection Rules

To require code review before merging to main:

1. Go to GitHub repo → **Settings** → **Branches**
2. Under "Branch protection rules", click **Add rule**
3. Apply to: `main`
4. Check: ✅ Require a pull request before merging
5. Check: ✅ Require status checks to pass
6. Check: ✅ Require code review before merging (1 reviewer)
7. Click **Create**

Now all pushes must go through PR → Review → Merge workflow.

---

## Step 7: Verify Phase 1 Complete

### Checklist
- ✅ GitHub repo created (`https://github.com/YOU/codqr-ro`)
- ✅ Source code pushed to `main` branch
- ✅ Netlify connected to GitHub
- ✅ Auto-deploy working (test with small change)
- ✅ Site live at `https://rainbow-chebakia-3e9542.netlify.app`
- ✅ All source files in `/css`, `/js`, `/vendor` folders

---

## 🚀 Phase 1 Complete!

**Next Steps:**
1. Reply with confirmation that Phase 1 is working
2. Once verified, we proceed to **Phase 2: Real Payment Integration**
   - Replace Gumroad with Stripe or 2Checkout
   - Setup subscription management (Business plan)
   - Add invoice generation

**Ready for Phase 2?** Reply with ✅ and we'll continue!

---

## Troubleshooting

### Issue: Deploy fails with "publish directory not found"
**Solution:** Make sure `index.html` is in the root of the repo, not in a subfolder.

### Issue: Auto-deploy doesn't trigger on push
**Solution:** Go to Netlify Settings → Build & Deploy, disconnect and reconnect the GitHub repo.

### Issue: CSS/JS not loading after deploy
**Solution:** Verify all files exist in the repo with correct paths:
```bash
git ls-files | grep -E "\.(css|js)$"
```

### Issue: "Cannot find qr-code-styling"
**Solution:** Verify `vendor/qr-code-styling.min.js` exists in the repo:
```bash
ls -la vendor/qr-code-styling.min.js
```

---

**Questions?** Email: blogbrasov@gmail.com
