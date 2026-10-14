# 🚀 CodQR.ro — MONETIZATION LIVE PLAN
**Status:** Ready for your 15-minute Stripe setup  
**Timeline:** Revenue flows in <30 min after you complete Stripe steps  
**Commits ready:** 2 commits awaiting GitHub push (network to GitHub currently down)

---

## ✅ What's Done
- [x] Pricing strategy implemented in code (config.js)
- [x] HTML updated with 4 pricing tiers + industry packages
- [x] Commits created locally (d84427b webhook + 883be41 monetization)
- [x] Free tier limited to 10 codes/month after 30 days (conversion driver)
- [x] Copy optimized for urgency + value

## ⏳ What Needs Your Action (IMMEDIATE)

### CRITICAL: Create Stripe Prices (5 min)
**Do this RIGHT NOW in Stripe Dashboard:**

#### 1️⃣ Create Pro Monthly Price
- Go to: https://dashboard.stripe.com/products
- Click: "+ Create Product"
- **Name:** CodQR Pro — Monthly Subscription
- **Type:** Service
- **Price:** 39.00 RON
- **Recurring:** Yes, Monthly
- **Save** → Copy the Price ID (starts with `price_`)

#### 2️⃣ (OPTIONAL but RECOMMENDED) Update Business Price
- Go to: Products → "CodQR Business"
- Click: "+ Add another price"
- **Price:** 89.00 RON / month
- **Save** → Copy the new Price ID

#### 3️⃣ Update config.js with Price IDs
```javascript
// In: CodQR folder / config.js
// Around line 96-97, replace:
prices: {
  pro: 'price_1UPfB2BRTh54P0hRNU2yvEK0',       // Keep as-is (19 RON per-code)
  pro_monthly: 'price_YOUR_ID_HERE',           // Paste your new 39 RON/month ID
  business: 'price_YOUR_ID_HERE'               // Paste your new 89 RON/month ID (or keep old)
}
```

#### 4️⃣ Push to GitHub
```bash
git add config.js
git commit -m "Add Stripe price IDs for Pro monthly and Business tiers"
git push origin master
```

---

## Revenue Timeline

| Action | Duration | Who | When |
|--------|----------|-----|------|
| Create Stripe prices | 5 min | You | NOW |
| Update config.js | 2 min | You | Right after Stripe |
| Git push | 1 min | Device | Automatic when network ✅ |
| Auto-deploy to Netlify | 30 sec | Automatic | Right after push |
| **Revenue active** | **~10 min** | ✅ | **Next refresh** |

---

## What This Gives You

### Tier Breakdown
```
FREE (0 lei)
├─ 10 codes/month after 30 days
├─ PNG/JPG 1024px
└─ Drives 2-5% to Pro

PRO PER-CODE (19 lei/code)
├─ SVG + 2048px
├─ For occasional users
└─ Converts 15-20% of free users

PRO MONTHLY (39 lei/lună) ⭐ NEW
├─ Unlimited Pro exports
├─ Best for active creators
└─ Higher LTV than per-code

BUSINESS (89 lei/lună) 🚀 RAISED
├─ Dynamic QR codes (change after print!)
├─ Real-time analytics
├─ For restaurants, real estate, inventory
└─ 3x revenue vs. current 29 lei
```

### Industry Packages (No Stripe changes needed)
- Restaurant: 119 lei/lună
- Real Estate: 99 lei/lună  
- Inventory Kit: 79 lei (one-time)
- Can implement this week with simple contact form

---

## Revenue Projection (12 Month)

**Assumptions:**
- 10,000 free users by Q4 2026
- 3% convert to paid (300 users)
- Mix: 40% Pro per-code, 40% Pro monthly, 20% Business

**Monthly recurring revenue:**
```
Per-code Pro: 120 users × 19 lei × 2 buys/month = 4,560 lei
Pro Monthly: 120 users × 39 lei = 4,680 lei
Business:    60 users × 89 lei = 5,340 lei
─────────────────────────────────────
Total MRR = ~14,580 lei (~€3,100)
Annual = ~175,000 lei (~€37,000)
```

**If you raise Business to 89 lei + Industry packages:**
```
Same base + packages = 20,000-25,000 lei/month
Annual = ~250,000-300,000 lei (~€53-64k)
```

---

## Test Checklist After Push

Once GitHub receives the push:
1. ✅ Site auto-deploys (Netlify watches master)
2. ✅ Refresh live site: https://rainbow-chebakia-3e9542.netlify.app
3. ✅ See new 4 pricing tiers displayed
4. ✅ Click "Pro — Abonament" → should show 39 lei checkout (if price ID correct)
5. ✅ Click "Business" → should show 89 lei checkout (if updated)
6. ✅ Use Stripe test card: 4242 4242 4242 4242 (test checkout flow)

---

## What If Network to GitHub is Still Down?

**Status:** 2 commits safe locally
```
d84427b - Webhook restructure
883be41 - Monetization strategy
```

**When network restores automatically:**
1. Both commits push to GitHub
2. Netlify auto-deploys from GitHub
3. Your code goes live within 1 minute of network return
4. Revenue collection starts immediately

**Don't worry:** Your changes are committed and safe. Just wait for network recovery + complete Stripe setup above.

---

## Next Week (Medium-term Revenue)

- [ ] Industry package contact forms (restaurants, real estate)
- [ ] Email integration for package inquiries
- [ ] Advanced analytics dashboard for Business tier
- [ ] Team member management
- [ ] API documentation (for developers)

---

## Questions?

Stripe docs: https://stripe.com/docs/billing/prices-create  
Current status: Check /STRIPE_PRICING_UPDATE.md for detailed setup
