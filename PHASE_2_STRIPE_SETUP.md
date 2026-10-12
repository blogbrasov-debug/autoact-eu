# Phase 2: Real Payment Integration with Stripe — Setup Guide

**Status:** Phase 2 - Stripe Checkout Integration  
**Date:** 2026-10-12  
**Objective:** Replace external payment processor with Stripe, implementing both one-time (Pro) and recurring (Business) payments using Stripe Checkout

---

## 📋 What's Ready for Phase 2

### ✅ Frontend Code (Done)
- **js/config.js** — Stripe configuration with publishable key, account ID, and tiers
- **js/app.js** — Complete QR generator with Stripe Checkout modal and payment flow
- **index.html** — Main application (unchanged from Phase 1)
- **Checkout Modal** — Shows tier details, price, features, and "Pay" button
- **Payment Flow** — Click → Modal → Pay → Redirect to Stripe Checkout

### ✅ Backend Functions (Ready to Deploy)
- **netlify/functions/checkout.js** — Creates Stripe checkout sessions (POST endpoint)
- **netlify/functions/webhook.js** — Handles Stripe payment confirmations

### 📝 Configuration Structure
```
codqr-ro/
├── index.html
├── js/
│   ├── config.js          (Stripe config + tiers)
│   └── app.js             (Payment integration)
├── netlify/
│   └── functions/
│       ├── checkout.js    (Session creation)
│       └── webhook.js     (Payment confirmation)
├── PHASE_1_GITHUB_SETUP.md
└── PHASE_2_STRIPE_SETUP.md (this file)
```

---

## 🔧 Phase 2 Setup Steps (In Order)

### Step 1: Verify Your Stripe Account

1. Go to https://dashboard.stripe.com
2. Sign in with your Stripe account (the one you used for AutoAct)
3. Confirm you're in **Live Mode** (not Test Mode) at the top-left
4. Go to **Developers** → **API Keys**
5. Copy your **Publishable Key** (starts with `pk_live_`)
   - ✅ Already set in config.js: `pk_live_51UMWHdBRTh54P0hRK3vQjMtndxX0JZnVsGh5JJlhvWwwyaWjslV1SPBLWD7v8Bmqj6DEO7DKM2LFxlKCeDOfKESr00qBhxgOGp`

6. Copy your **Secret Key** (starts with `sk_live_`)
   - ⚠️ **DO NOT paste this in chat!** Keep it safe
   - You'll add this to Netlify environment variables (Step 3)

---

### Step 2: Create Stripe Products & Prices

#### 2a. Create "CodQR Pro" Product

1. Go to **Products** → **Create Product**
2. **Product Name:** `CodQR Pro`
3. **Description:** `SVG vectorial + 2048px export`
4. **Price Type:** `One-time`
5. **Unit Price:** `19` (in RON)
6. **Billing Period:** (Not applicable for one-time)
7. Click **Create Product**

**Expected:** Price ID like `price_1Uxxxxx...` (one-time)

---

#### 2b. Create "CodQR Business" Product

1. Go to **Products** → **Create Product**
2. **Product Name:** `CodQR Business`
3. **Description:** `Coduri dinamice + statistici de scanare`
4. **Price Type:** `Recurring`
5. **Unit Price:** `29` (in RON)
6. **Billing Period:** `Monthly`
7. Click **Create Product**

**Expected:** Price ID like `price_1Uxxxxx...` (recurring)

---

#### 2c. Find Your Price IDs

1. Go to **Products**
2. Click on **CodQR Pro**
   - In the "Pricing" section, find the **Price ID** (e.g., `price_1UMW...`)
   - Copy it → You'll use this for `pro` tier

3. Click on **CodQR Business**
   - In the "Pricing" section, find the **Price ID** (e.g., `price_1UMW...`)
   - Copy it → You'll use this for `business` tier

---

### Step 3: Configure Netlify Environment Variables

1. Go to https://app.netlify.com → Your CodQR Site → **Site Settings** → **Build & Deploy** → **Environment**
2. Click **Edit variables**
3. Add these variables:

| Variable Name | Value |
|---------------|-------|
| `STRIPE_SECRET_KEY` | Your `sk_live_...` key (from Step 1) |
| `STRIPE_WEBHOOK_SECRET` | Leave blank for now (Step 4) |

**Important:**
- Use your **Live Secret Key** (starts with `sk_live_`)
- Do NOT use Test keys for live payments
- Netlify will encrypt these values

4. Click **Save** and wait for deployment to pick up the changes

---

### Step 4: Set Up Stripe Webhook

The webhook tells you when payments succeed so you can confirm the user's tier upgrade.

#### 4a. Create Webhook Endpoint

1. Go to Stripe **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. **Endpoint URL:** `https://your-site.netlify.app/.netlify/functions/webhook`
   - Replace `your-site` with your actual Netlify site name (e.g., `rainbow-chebakia-3e9542.netlify.app`)
4. **Events to listen for:**
   - Select: `checkout.session.completed` ✓
   - Select: `customer.subscription.created` ✓
   - Select: `customer.subscription.updated` ✓
5. Click **Add Endpoint**

---

#### 4b. Get Webhook Signing Secret

1. Click on your newly created webhook
2. In the **Signing Secret** section, click **Reveal** and copy the secret (starts with `whsec_`)
3. Go to Netlify → Site Settings → Environment
4. Update the `STRIPE_WEBHOOK_SECRET` variable with this value
5. Save and redeploy

---

### Step 5: Update config.js with Price IDs

In your local project, edit `js/config.js`:

```javascript
stripe: {
  publishableKey: 'pk_live_51UMWHdBRTh54P0hRK3vQjMtndxX0JZnVsGh5JJlhvWwwyaWjslV1SPBLWD7v8Bmqj6DEO7DKM2LFxlKCeDOfKESr00qBhxgOGp',
  accountId: 'acct_1UMWHdBRTh54P0hR',
  mode: 'live',
  prices: {
    pro: 'price_XXXXXXXXXXXXX',      // ← Replace with your CodQR Pro price ID
    business: 'price_YYYYYYYYYYYYY'  // ← Replace with your CodQR Business price ID
  },
  successUrl: window.location.origin + '/index.html?success=true',
  cancelUrl: window.location.origin + '/index.html?canceled=true'
}
```

---

### Step 6: Deploy to GitHub & Netlify

1. **Stage files:**
   ```bash
   git add js/config.js netlify/functions/checkout.js netlify/functions/webhook.js
   git commit -m "Phase 2: Add Stripe payment integration

   - Stripe Checkout for Pro (one-time) and Business (subscription) tiers
   - Netlify Functions for checkout session creation
   - Webhook handler for payment confirmations
   - Configuration with live Stripe credentials

   Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
   Claude-Session: https://claude.ai/code/session_01MvPmZc7NxU4rJfyxvhDDXP"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Netlify auto-deploys** (because GitHub is connected)

4. **Verify deploy:**
   - Go to Netlify **Deploys** tab
   - Check status: should say **Published** ✅

---

## 🧪 Phase 2 Testing

### Test 1: Test Checkout Modal (No Payment)

1. Go to https://your-site.netlify.app
2. Click **Pro (19 lei)** button
3. ✅ Modal appears showing:
   - Title: "Pro"
   - Price: "19 RON"
   - Features: SVG, 2048px, etc.
   - "Cancel" and "Plătește" buttons
4. Click **Cancel** → Modal closes ✅

---

### Test 2: Test Payment Flow (One-Time)

#### In Stripe Test Mode First

1. Go back to Stripe **Developers** → **API Keys**
2. Switch to **Test Mode** (toggle at top-right)
3. Copy your **Test Publishable Key** (starts with `pk_test_`)
4. **Temporarily** update `config.js`:
   ```javascript
   publishableKey: 'pk_test_...' // Your test key
   ```
5. Deploy to GitHub (small change to trigger redeploy)

#### Make a Test Payment

1. Go to https://your-site.netlify.app
2. Click **Pro (19 lei)** → Modal appears
3. Click **Plătește** → Redirects to Stripe Checkout
4. Fill in **test card:** `4242 4242 4242 4242`
5. **Expiry:** Any future date (e.g., `12/25`)
6. **CVC:** Any 3 digits (e.g., `123`)
7. **Cardholder name:** Any name
8. Click **Pay** or **Subscribe** (depends on tier)
9. ✅ Should see **success page** with "Plată confirmată!" message

#### Check Webhook in Stripe

1. Go to Stripe **Developers** → **Webhooks** → Your endpoint
2. Scroll down to **Events**
3. You should see `checkout.session.completed` ✅ (green checkmark = success)

---

### Test 3: Switch Back to Live Mode

1. Update `config.js` back to your **Live Publishable Key**
2. Deploy: `git push origin main`
3. Netlify auto-redeploys
4. Test with **real card** (or ask a friend) to confirm live mode works

---

## 📱 Payment Features Implemented

### Pro Tier (One-Time Payment)
- ✅ Price: 19 RON (one-time)
- ✅ Features: SVG export, 2048px
- ✅ No watermark
- ✅ Stripe Checkout redirect modal

### Business Tier (Monthly Subscription)
- ✅ Price: 29 RON/month (recurring)
- ✅ Features: Dynamic QR codes, analytics
- ✅ Unlimited codes
- ✅ API access (future phase)
- ✅ Automatic monthly billing

### Webhook Handlers
- ✅ `checkout.session.completed` → Mark user as Pro
- ✅ `customer.subscription.created` → Mark user as Business
- ✅ `customer.subscription.updated` → Handle renewals/cancellations

---

## 🔐 Security Checklist

- ✅ Publishable Key is frontend-safe (public, cannot charge)
- ✅ Secret Key is server-only (Netlify environment variable, not in code)
- ✅ Webhook signature is verified (prevents fake payments)
- ✅ Using Live mode for real transactions (not Test mode)
- ✅ HTTPS enforced (Netlify provides free SSL)

---

## 📊 What's NOT Implemented Yet (Phase 3+)

- User database to store Pro/Business tier status
- Email confirmations ("Your Pro plan is active!")
- Subscription management portal (pause, cancel, update billing)
- Dynamic QR redirect logic for Business tier
- Analytics dashboard for Business users
- SEO optimization
- Custom domain (codqr.ro)

---

## ❓ Troubleshooting

### "Price ID not configured"
→ You forgot to update `prices.pro` and `prices.business` in `config.js`

### Checkout fails with "Unknown parameter: stripe_account"
→ Make sure your `checkout.js` doesn't have deprecated Gumroad code

### Webhook not triggering
→ Go to Stripe **Webhooks**, click your endpoint, and check the **Events** tab for errors

### "Webhook signature verification failed"
→ Your `STRIPE_WEBHOOK_SECRET` doesn't match Stripe's signing secret
→ Re-create the webhook and copy the secret again

### Test card works but live card doesn't
→ You might still be in **Test Mode**. Check Stripe top-right toggle and switch to **Live**.

---

## 🎯 Phase 2 Completion Checklist

When all of these are ✅, Phase 2 is complete:

- ⬜ Stripe account verified (live mode, API keys found)
- ⬜ CodQR Pro product created (price ID copied)
- ⬜ CodQR Business product created (price ID copied)
- ⬜ Netlify environment variables set (STRIPE_SECRET_KEY)
- ⬜ Stripe webhook created and verified
- ⬜ js/config.js updated with real Price IDs
- ⬜ All files deployed to GitHub (git push)
- ⬜ Netlify shows Published status
- ⬜ Test payment flow works (test card → success page)
- ⬜ Stripe webhook triggered successfully (green checkmark in Events)
- ⬜ Live mode tested (optional, but recommended)

**Once all ✅, reply: "Phase 2 complete!" and we'll move to Phase 3: Database & User Management**

---

## 🚀 What's Coming Next (Phase 3+)

- **Phase 3:** User database (Supabase/Firebase) to persist tier status
- **Phase 4:** Dynamic QR codes via Cloudflare Workers
- **Phase 5:** Domain rename & professional branding

---

**Questions?** Email: blogbrasov@gmail.com

All Phase 2 files are ready in: `/mnt/user-data/outputs/`

Ready to start setup? 🚀
