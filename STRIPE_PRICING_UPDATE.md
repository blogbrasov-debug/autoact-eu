# Stripe Pricing Update — ACTION PLAN
**Status:** Ready for your manual Stripe updates  
**Priority:** CRITICAL — Blocks revenue  
**Timeline:** Complete in 5 minutes

---

## What Changed
The monetization strategy requires 2 new Stripe prices:

### 1. ✅ Pro Monthly Subscription (NEW)
- **Tier Name:** Pro — Abonament
- **Price:** 39 RON/month (recurring)
- **Billing Period:** Monthly
- **Tax Behavior:** Taxable (if applicable)
- **Currency:** RON
- **Recurring:** Yes, monthly
- **Action:** Create this in Stripe Dashboard

**Steps:**
1. Go to Stripe Dashboard → Products → Create Product
2. Name: "CodQR Pro — Monthly Subscription"
3. Pricing: 39.00 RON / month
4. Recurring: Yes
5. **Copy the Price ID** (format: `price_1XX...`)
6. Return here and update `config.js` line ~96: `pro_monthly: 'price_YOUR_NEW_ID_HERE'`

---

### 2. ⚠️ Business Tier Price Update (OPTIONAL but RECOMMENDED)
Current: 29 RON/month → Recommended: 89 RON/month

**Option A: Keep current price (simple)**
- Leave `price_1UPfEeBRTh54P0hRb4jMXSxg` as-is
- No Stripe changes needed
- Revenue stays low (~29 lei/customer)

**Option B: Create new price at 89 RON (recommended)**
- Go to Stripe Dashboard → Products → find "CodQR Business"
- Click "+ Add another price"
- Set to: 89.00 RON / month
- **Copy the Price ID**
- Update `config.js` line ~97: `business: 'price_YOUR_NEW_ID_HERE'`
- Old price still exists (not deleted), won't be used

**Option C: Archive old price + create new product (complex)**
- Not recommended — keeps things simple with Option B

---

## Implementation Order

### STEP 1: Create Pro Monthly in Stripe (5 min)
1. Stripe Dashboard: https://dashboard.stripe.com
2. Products → Create Product
3. Name: "CodQR Pro — Monthly Subscription"
4. Type: Service
5. Pricing tab:
   - Price: 39.00
   - Currency: RON
   - Recurring: Monthly
6. Save
7. Copy the Price ID

### STEP 2: Update config.js with Pro Monthly ID
```javascript
// Line ~96 in config.js
pro_monthly: 'price_1XX...XXX',  // Paste your new ID here
```

### STEP 3 (Optional but Recommended): Update Business Price
1. Go to Products → "CodQR Business"
2. Add another price → 89.00 RON/month
3. Copy the new Price ID
4. Update config.js line ~97:
```javascript
business: 'price_1XX...XXX',  // Paste the new Business price ID
```

### STEP 4: Update HTML pricing display
**Already done in index.html** — shows both Pro options and 89 RON Business

### STEP 5: Test in Stripe Test Mode
1. Switch dashboard to Test Mode
2. Click a "Buy" button on the live site
3. Verify prices are correct

### STEP 6: Commit changes to GitHub
```bash
git add config.js
git commit -m "Monetization: Add Pro monthly tier + update Business price"
git push origin master
```

---

## Timeline Until Revenue Flows

| Step | Duration | Status |
|------|----------|--------|
| Create Stripe prices | 5 min | ⏳ Waiting on you |
| Update config.js | 1 min | ✅ Ready when you have IDs |
| Test live checkout | 5 min | ✅ Automated |
| **Total until live** | **~15 min** | |

---

## What This Enables

After updates:
- ✅ Users can choose Pro (per-code) or Pro (monthly) — **more conversions**
- ✅ Business tier at 89 RON/month — **3x revenue per customer**
- ✅ Industry packages available (separate products, no price ID needed yet)
- ✅ Free tier limited to 10 codes/month — **drives Pro adoption**

---

## Support

If you get stuck:
1. Error "Price ID not found"? Paste the exact ID from Stripe (starts with `price_`)
2. Prices not updating? Clear browser cache + refresh
3. Questions? Stripe docs: https://stripe.com/docs/billing/prices-create

**Next revenue-driver:** Industry packages (no Stripe setup needed — can implement Monday)
