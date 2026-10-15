# CodQR.ro Blog Deployment — Quick Checklist

**Target:** Complete Phase 2 Week 1 deployment  
**Estimated Time:** 60 minutes total  
**Date:** October 15, 2026

---

## ✅ Pre-Deployment (5 min)

- [ ] Download all 4 files from Claude to your Windows machine:
  - [ ] `cod-qr-restaurant-ghid.html`
  - [ ] `BLOG_DEPLOYMENT_GUIDE.md`
  - [ ] `PHASE2_WEEK1_SUMMARY.txt`
  - [ ] `meniu-qr-cod-restaurant-blog.md` (reference)

- [ ] Verify CodQR.ro repo exists on Windows:
  - [ ] Path: `C:\Users\alex\Desktop\LUCRU & PROIECTE\CodQr`
  - [ ] Files present: `index.html`, `.git` folder, `sitemap.xml`

- [ ] Open PowerShell/Git Bash and cd to project folder:
  ```bash
  cd "C:\Users\alex\Desktop\LUCRU & PROIECTE\CodQr"
  ```

---

## 📁 Step 1: Create Blog Folder (5 min)

- [ ] Create `blog` folder:
  ```bash
  mkdir blog
  ```

- [ ] Verify folder created:
  ```bash
  ls -la | grep blog
  ```

---

## 📄 Step 2: Copy Blog Post HTML (2 min)

- [ ] Copy `cod-qr-restaurant-ghid.html` to `blog/` folder

- [ ] Verify file is in place:
  ```bash
  ls blog/cod-qr-restaurant-ghid.html
  ```

---

## 🔗 Step 3: Update Sitemap (3 min)

- [ ] Open `sitemap.xml` in text editor

- [ ] Add this block before `</urlset>`:
  ```xml
  <!-- Blog Articles -->
  <url>
      <loc>https://autoact.eu/blog/cod-qr-restaurant-ghid</loc>
      <lastmod>2026-10-15</lastmod>
      <priority>0.8</priority>
  </url>
  ```

- [ ] Save file

---

## 🤖 Step 4: Verify robots.txt (1 min)

- [ ] Open `robots.txt`

- [ ] Verify this is present:
  ```
  User-agent: *
  Allow: /blog/
  Allow: /
  Disallow: /admin/
  
  Sitemap: https://autoact.eu/sitemap.xml
  ```

- [ ] If `/blog/` is missing from `Allow:`, add it

- [ ] Save file

---

## 📤 Step 5: Git Commit (5 min)

- [ ] Stage changes:
  ```bash
  git add blog/
  git add sitemap.xml
  git add robots.txt
  ```

- [ ] Check what's being committed:
  ```bash
  git status
  ```

- [ ] Commit with message:
  ```bash
  git commit -m "Add restaurant QR menu blog post and update sitemap

- Add blog/cod-qr-restaurant-ghid.html (8200 word guide)
- Update sitemap.xml with blog article URL
- Create blog/ folder structure for future articles

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01MvPmZc7NxU4rJfyxvhDDXP"
  ```

---

## 🚀 Step 6: Push to GitHub (5 min)

- [ ] Push to remote:
  ```bash
  git push origin master
  ```

- [ ] Verify push succeeded (should show commit hash)

- [ ] Go to GitHub to confirm:
  - [ ] Visit: `https://github.com/blogbrasov-debug/codqr-ro`
  - [ ] Verify new commit appears in main branch

---

## 🔨 Step 7: Wait for Netlify Build (2 min)

- [ ] Go to Netlify dashboard:
  ```
  https://app.netlify.com/projects/rainbow-chebakia-3e9542
  ```

- [ ] Watch deployment build complete (1-2 minutes)

- [ ] Verify build shows ✅ green checkmark

---

## 🌐 Step 8: Verify Blog Post Live (5 min)

- [ ] Visit blog post:
  ```
  https://rainbow-chebakia-3e9542.netlify.app/blog/cod-qr-restaurant-ghid
  ```

- [ ] Verify in browser:
  - [ ] Page loads without 404
  - [ ] Title shows: "Meniu QR pentru Restaurant — Ghid Complet 2026"
  - [ ] Content displays correctly
  - [ ] All sections visible (what is, why, comparison, how-to, etc.)
  - [ ] CTA buttons visible at bottom
  - [ ] Mobile layout responsive (test on phone if possible)

- [ ] Check page source for metadata:
  - [ ] Right-click → View Page Source
  - [ ] Verify `<meta name="description">` present
  - [ ] Verify `<meta property="og:title">` present
  - [ ] Verify `<script type="application/ld+json">` present

---

## 🔍 Step 9: Submit to Google Search Console (5 min)

- [ ] Go to GSC:
  ```
  https://search.google.com/search-console/
  ```

- [ ] Select: `autoact.eu` property

- [ ] Go to: **Sitemaps** (left sidebar)

- [ ] Click: **Submit new sitemap**

- [ ] Enter: `sitemap.xml` and submit

- [ ] Verify new sitemap shows in list (should show 2 URLs now)

---

## 📊 Step 10: GA4 Setup (15 min)

- [ ] Go to Google Analytics:
  ```
  https://analytics.google.com
  ```

- [ ] Create new GA4 property for autoact.eu
  - [ ] Admin (bottom left) → Create Property
  - [ ] Property name: "autoact.eu"
  - [ ] Reporting timezone: Europe/Bucharest
  - [ ] Currency: RON

- [ ] Get Measurement ID:
  - [ ] Go to: Data Streams → Web
  - [ ] Copy Measurement ID (looks like `G-XXXXXXXXXX`)

- [ ] Add to website HTML:
  - [ ] In your website's `<head>` section, add:
  ```html
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  ```

- [ ] Create 3 conversion goals:
  1. Goal 1: `qr_generated` (QR code created)
  2. Goal 2: `pro_purchased` (Pro plan purchased)
  3. Goal 3: `business_signup` (Business plan signup)

- [ ] Test events firing:
  - [ ] Create a test QR on your site
  - [ ] Go to GA4 → Realtime
  - [ ] Verify event shows up within 10 seconds

---

## 🎉 Final Verification (10 min)

- [ ] All files deployed:
  - [ ] `blog/cod-qr-restaurant-ghid.html` ✅
  - [ ] `sitemap.xml` updated ✅
  - [ ] `robots.txt` verified ✅

- [ ] Netlify build successful:
  - [ ] Visit: https://app.netlify.com/projects/rainbow-chebakia-3e9542
  - [ ] Build status: ✅ Green checkmark

- [ ] Blog post live:
  - [ ] URL: https://rainbow-chebakia-3e9542.netlify.app/blog/cod-qr-restaurant-ghid
  - [ ] Displays correctly ✅
  - [ ] Mobile responsive ✅
  - [ ] No 404 errors ✅

- [ ] GSC updated:
  - [ ] Sitemap submitted ✅
  - [ ] Shows 2 URLs in GSC ✅

- [ ] GA4 working:
  - [ ] Property created ✅
  - [ ] Measurement ID found ✅
  - [ ] Test event firing ✅

---

## 📈 Post-Deployment Monitoring (Next 24-48 Hours)

- [ ] Check Google Search Console:
  - [ ] Visit: https://search.google.com/search-console/
  - [ ] Select autoact.eu
  - [ ] Go to: URL Inspection
  - [ ] Paste: https://autoact.eu/blog/cod-qr-restaurant-ghid
  - [ ] Click: Request Indexing
  - [ ] Wait for crawl status (can take a few hours)

- [ ] Monitor GA4 Events:
  - [ ] Check Realtime dashboard
  - [ ] Verify events are logging correctly
  - [ ] Test conversion funnel (create QR → see event in GA4)

- [ ] Monitor Netlify Builds:
  - [ ] Any new commits should auto-deploy
  - [ ] Watch for any failed builds in logs

---

## 🎯 Success Criteria (Check All Boxes)

- [ ] Blog post HTML copied to `blog/` folder
- [ ] Sitemap.xml updated with blog URL
- [ ] robots.txt allows `/blog/` crawling
- [ ] Git commit created with proper attribution
- [ ] Git push completed successfully
- [ ] Netlify build shows green checkmark
- [ ] Blog post accessible at live URL
- [ ] Page displays correctly (no 404)
- [ ] Mobile layout responsive
- [ ] Meta tags present in HTML source
- [ ] Sitemap submitted to Google Search Console
- [ ] GA4 property created with Measurement ID
- [ ] 3 conversion goals configured
- [ ] Test event firing in GA4 Realtime

---

## 🚨 Troubleshooting Quick Links

**Problem: Netlify build failed**
- Check: https://app.netlify.com/projects/rainbow-chebakia-3e9542/deploys
- Look for red X and error message
- Most common: filename case-sensitive (Linux servers)

**Problem: Blog shows 404**
- Verify file is in: `blog/cod-qr-restaurant-ghid.html` (exact path)
- Check Netlify build completed successfully
- Clear browser cache: Ctrl+Shift+Delete

**Problem: Git push failed**
- Run: `git remote -v` (verify GitHub URL is correct)
- Try again: `git push origin master`
- Check internet connection

**Problem: GA4 events not showing**
- Verify Measurement ID is correct in HTML
- Check Analytics Debugger: https://analytics.google.com/analytics/web/?utm_source=debugger
- Wait 10-30 seconds (real-time takes time to report)

---

## 📞 If You Get Stuck

1. **Check BLOG_DEPLOYMENT_GUIDE.md** — Has detailed explanations
2. **Check PHASE2_WEEK1_SUMMARY.txt** — Has troubleshooting section
3. **Check Netlify build logs** — Most errors are shown there
4. **Test in incognito mode** — Rules out browser cache issues

---

## ⏱️ Time Estimate

| Step | Time | Cumulative |
|------|------|-----------|
| Pre-deployment | 5 min | 5 min |
| Create blog folder | 5 min | 10 min |
| Copy HTML | 2 min | 12 min |
| Update sitemap | 3 min | 15 min |
| Verify robots.txt | 1 min | 16 min |
| Git commit | 5 min | 21 min |
| Git push | 5 min | 26 min |
| Netlify build | 2 min | 28 min |
| Verify live | 5 min | 33 min |
| Submit sitemap | 5 min | 38 min |
| GA4 setup | 15 min | 53 min |
| Final verification | 10 min | 63 min |

**Total: ~60 minutes**

---

**Start time:** ___________  
**End time:** ___________  
**Total time:** ___________

✅ **When all checkboxes are complete, Phase 2 Week 1 = DONE!**

Good luck! 🚀
