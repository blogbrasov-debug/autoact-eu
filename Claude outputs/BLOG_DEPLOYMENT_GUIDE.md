# Blog Deployment Guide — CodQR.ro Phase 2

**Date**: October 15, 2026  
**Status**: ✅ HTML READY FOR DEPLOYMENT  
**File**: `cod-qr-restaurant-ghid.html`

---

## 📦 What's Ready

- ✅ **Blog post HTML** (`cod-qr-restaurant-ghid.html`) — 8,200 words, fully formatted, SEO-optimized
- ✅ **Responsive design** — Mobile-friendly, CSS inline for fast load
- ✅ **Schema.org metadata** — JSON-LD structured data for Google search
- ✅ **Open Graph tags** — Social media preview (title, description, image)
- ✅ **Internal linking** — CTA buttons link to `/` (main generator) and `/` (Business Plan)
- ✅ **Canonical URL** — Set to `https://autoact.eu/blog/cod-qr-restaurant-ghid`

---

## 📁 Folder Structure (To Create on Your Windows Machine)

Create this structure in your CodQR.ro repository:

```
codqr-ro/
├── index.html                    (existing main page)
├── robots.txt                    (existing)
├── sitemap.xml                   (existing, to update)
├── blog/
│   ├── index.html               (optional: blog listing page)
│   └── cod-qr-restaurant-ghid.html  (NEW — the article)
└── images/
    └── og-qr-restaurant.png     (NEW — for Open Graph preview)
```

---

## 🚀 Deployment Steps (From Your Windows Machine)

### Step 1: Create Blog Folder

On your Windows machine, in the CodQR.ro project folder:

```bash
mkdir blog
```

### Step 2: Place the HTML File

1. Copy `cod-qr-restaurant-ghid.html` to the `blog/` folder
2. Verify the file is accessible at: `blog/cod-qr-restaurant-ghid.html`

### Step 3: Create Open Graph Image (Recommended)

The article references `https://autoact.eu/images/og-qr-restaurant.png` for social media previews.

**Quick Solution:** Create a simple 1200x630px image with:
- Title: "Meniu QR pentru Restaurant"
- Subtitle: "Ghid Complet 2026"
- CodQR.ro logo (if you have one)

Save as: `images/og-qr-restaurant.png`

*(If you don't have design tools, you can skip this and the social preview will use the text description.)*

### Step 4: Create Blog Index Page (Optional but Recommended)

Create `blog/index.html` to list all blog articles:

```html
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog — CodQR.ro</title>
    <meta name="description" content="Articole și ghiduri despre coduri QR personalizate, digitalizare restaurant, inventar și alte industrii.">
</head>
<body>
    <div class="container" style="max-width: 800px; margin: 40px auto; padding: 20px; font-family: sans-serif;">
        <h1>Blog CodQR.ro</h1>
        <p>Ghiduri practice și articole despre implementare coduri QR în afacerea ta.</p>
        
        <div style="margin-top: 40px;">
            <h2>Articole Recent</h2>
            <ul>
                <li>
                    <a href="/blog/cod-qr-restaurant-ghid">
                        <strong>Meniu QR pentru Restaurant — Ghid Complet 2026</strong>
                    </a>
                    <p>Cum să implementezi meniu digital în restaurant în 5 minute. Cost: 0 lei/lună. Económii: 5,600 lei/an vs Doxmenu.</p>
                </li>
            </ul>
        </div>
    </div>
</body>
</html>
```

### Step 5: Update `sitemap.xml`

Add the blog post to your sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- existing URLs -->
    
    <!-- NEW — Blog Articles -->
    <url>
        <loc>https://autoact.eu/blog/cod-qr-restaurant-ghid</loc>
        <lastmod>2026-10-15</lastmod>
        <priority>0.8</priority>
    </url>
    
    <!-- Optional: Blog listing page -->
    <url>
        <loc>https://autoact.eu/blog/</loc>
        <lastmod>2026-10-15</lastmod>
        <priority>0.7</priority>
    </url>
</urlset>
```

### Step 6: Update `robots.txt` (If Not Already Done)

Ensure robots.txt allows blog access:

```
User-agent: *
Allow: /blog/
Allow: /
Disallow: /admin/

Sitemap: https://autoact.eu/sitemap.xml
```

### Step 7: Git Commit and Push

```bash
cd path/to/codqr-ro
git add blog/
git add sitemap.xml
git add robots.txt
git commit -m "Add restaurant QR menu blog post and update sitemap

- Add blog/cod-qr-restaurant-ghid.html (8200 word guide)
- Update sitemap.xml with blog article URL
- Create blog/ folder structure for future articles

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01MvPmZc7NxU4rJfyxvhDDXP"

git push origin master
```

### Step 8: Verify Netlify Deployment

After pushing to GitHub:

1. Go to: `https://app.netlify.com/projects/rainbow-chebakia-3e9542`
2. Wait for build to complete (~1-2 minutes)
3. Visit: `https://rainbow-chebakia-3e9542.netlify.app/blog/cod-qr-restaurant-ghid` (or your custom domain)
4. Verify:
   - Page loads correctly
   - All internal links work (`/` for main, `/` for Business Plan)
   - Mobile layout is responsive
   - No CSS issues

---

## 🔗 Internal Links — What to Update

The HTML file currently links to:
- `href="/"` for **Generator QR Gratis** button (main page)
- `href="/"` for **Business Plan** button (should link to pricing/subscription section)

### To Customize:

If you have dedicated pricing pages, update these links:

```html
<!-- Current (generic home link) -->
<a href="/">Generează meniu QR gratis</a>

<!-- If you have a /pricing page: -->
<a href="/pricing#pro">Generează meniu QR gratis</a>

<!-- For Business Plan: -->
<a href="/">Business Plan — 29 lei/lună</a>

<!-- If you have a dedicated /business page: -->
<a href="/business">Business Plan — 29 lei/lună</a>
```

---

## 📊 SEO Checklist (After Deployment)

- [ ] Page is live at `/blog/cod-qr-restaurant-ghid`
- [ ] Canonical URL is correct: `https://autoact.eu/blog/cod-qr-restaurant-ghid`
- [ ] Sitemap.xml includes the blog URL
- [ ] robots.txt allows `/blog/` crawling
- [ ] Open Graph image is deployed (optional)
- [ ] Mobile preview looks good (test on phone)

### Monitor in Google Search Console:

1. Go to: `https://search.google.com/search-console/` → select autoact.eu property
2. Inspect URL: `https://autoact.eu/blog/cod-qr-restaurant-ghid`
3. Request indexing
4. Wait 24-48 hours for Google to crawl and index
5. Monitor impressions/clicks in "Performance" tab after 1 week

---

## 📈 Expected Impact (Week 1-4)

| Metric | Timeline | Goal |
|--------|----------|------|
| **Indexing** | Day 1-3 | Article appears in Google Search results |
| **Organic impressions** | Week 1-2 | 50-150 impressions for "meniu QR restaurant" |
| **Click-through rate** | Week 2-4 | 5-10 clicks to article |
| **Bounce rate** | Week 2+ | <50% (readers stay on page) |
| **Conversion** | Week 3+ | 1-2 clicks to Pro plan or Business Plan signup |

---

## 🛠 Troubleshooting

### Issue: Page shows as 404 after deployment

**Solution**: Check Netlify build logs. Ensure:
- File is named exactly `cod-qr-restaurant-ghid.html` (case-sensitive on Linux)
- File is in `/blog/` folder
- Build completed successfully (green checkmark on Netlify)

### Issue: Links show as broken

**Solution**: Verify internal links are correct:
- Links to `/` should work from any page
- Test from `blog/cod-qr-restaurant-ghid` to ensure relative paths work

### Issue: Styling looks broken on mobile

**Solution**: The CSS is inline and should be responsive. Test on:
- iPhone (375px width)
- Android (360px width)
- Check table formatting (may need horizontal scroll)

### Issue: Open Graph preview not showing on social media

**Solution**: 
1. Verify `og-qr-restaurant.png` exists at `/images/og-qr-restaurant.png`
2. Test preview at: `https://www.opengraph.xyz/` (paste your blog URL)
3. Share link on Facebook/LinkedIn — social platforms cache previews for 24 hours

---

## 📝 Next Steps

After deployment:

1. **Monitor Analytics**
   - Check GA4 for `pageview` events on `/blog/cod-qr-restaurant-ghid`
   - Track scroll depth (see how far readers get)
   - Monitor conversion events (clicks to Pro/Business)

2. **Share on Community Channels**
   - Post on r/Romania, r/Antreprenoriat (Reddit)
   - Share in restaurant/entrepreneur Facebook groups
   - Create 2-3 LinkedIn posts from article highlights

3. **Iterate & Optimize**
   - If bounce rate is high (>60%), the intro might be too long — consider shortening
   - If CTR is low (<5%), test different CTA button colors/text
   - Monitor which sections get most scroll engagement

4. **Plan Future Blog Posts** (Phase 2, Week 2-3)
   - "Etichete QR pentru Inventar — Sistem Gratuit" (existing outline)
   - "QR Codes for Retail — 5 Use Cases 2026"
   - "Google Reviews Kit — Cum să obții 5-star feedback"

---

## 📞 Questions?

If you encounter issues during deployment:
1. Check Netlify build logs for errors
2. Verify file permissions (should be 644)
3. Clear browser cache (`Ctrl+Shift+Delete`)
4. Try incognito mode to rule out cache issues

---

**Status**: 🟢 READY FOR PRODUCTION  
**Last Updated**: October 15, 2026  
**Estimated Deployment Time**: 15-30 minutes  
**Time to First Indexing**: 1-3 days
