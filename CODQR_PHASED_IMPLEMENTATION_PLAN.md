# CodQR.ro — Multi-Phase Implementation Plan

**Project:** CodQR.ro (QR Code Generator)  
**Current State:** Netlify static site, manual deploys, no GitHub integration  
**Plan Date:** 2026-10-12  
**Owner:** Alexandru (blogbrasov@gmail.com)

---

## Executive Summary

5-phase implementation plan to transform CodQR.ro from a manual-deploy MVP into a professional, monetized platform:

1. **Phase 1: GitHub + Auto-Deploy** (Priority: HIGH — Foundational)
2. **Phase 2: Real Payment Integration** (Priority: HIGH — Revenue)
3. **Phase 3: Security & Optimization Audit** (Priority: MEDIUM — Foundation)
4. **Phase 4: New Features & Templates** (Priority: MEDIUM — Growth)
5. **Phase 5: Professional Branding** (Priority: LOW — Polish)

**Each phase requires your explicit approval before execution.**

---

## PHASE 1: GitHub Connection + Auto-Deploy Pipeline

### Goal
Enable automatic deployment to Netlify on every git push (matching ClarTransfer workflow).

### Current State
- ✗ No GitHub repo connected
- ✗ Manual deploy only (via API/CLI)
- ✗ No CI/CD pipeline
- ✗ No deploy history or rollback capability

### Deliverables
1. **GitHub repository creation** (codqr-ro or similar)
2. **Source code upload** (from current Netlify deployment or local files)
3. **Netlify GitHub integration** (connect repo → auto-deploy)
4. **Branch protection rules** (main branch protection, require PR reviews)
5. **Deploy preview links** (automatic previews on PRs)

### Technical Steps
```
1. Create private GitHub repo under your account
2. Initialize git locally OR extract code from Netlify
3. Push code to main branch
4. Connect repo to Netlify (Admin > Deploy settings > GitHub)
5. Test: push a small change → verify auto-deploy
```

### Blockers & Questions
- **Q1**: Do you have the source code locally already, or should I extract it from Netlify's live deployment?
- **Q2**: Should the repo be private or public?
- **Q3**: Do you want PR-based reviews before each deploy?

### Approval Checkpoint
**Before proceeding to Phase 2, Phase 1 must be complete and verified.**

---

## PHASE 2: Real Payment Integration

### Goal
Replace unknown/placeholder payment processor with a real, verifiable payment gateway for Pro (19 lei) and Business (29 lei/month) plans.

### Current State
- ✗ External payment processor (unknown service, not visible in code)
- ✗ No real transaction capability
- ✗ No subscription management (Business plan)
- ✗ No payment history or invoices

### Deliverables
1. **Payment gateway selection** (Stripe, 2Checkout, Wise, local solution)
2. **Integration code** (client-side + backend/webhook handlers)
3. **Subscription management** (for Business plan recurring payments)
4. **Invoice generation** (automatic receipts via email)
5. **Security audit** (PCI compliance, secure token handling)

### Technical Architecture

#### Option A: Stripe (Recommended)
- **Pros**: Industry standard, excellent docs, webhooks, EU/Romania support
- **Cons**: 2.9% + €0.30/transaction fee, requires backend/serverless function
- **Setup**: Stripe account → API keys → Netlify environment variables → Stripe Checkout/Elements
- **Estimate**: 2-3 days integration

#### Option B: 2Checkout/Verifone
- **Pros**: Local support, handles EU VAT, recurring subscriptions built-in
- **Cons**: Older UX, higher fees (3.5%+ per transaction)
- **Estimate**: 2-3 days integration

#### Option C: Wise/TransferWise + Custom Invoice
- **Pros**: Lower fees (1-2%), simple bank integration
- **Cons**: Manual payment verification, no automatic recurring, webhook management needed
- **Estimate**: 4-5 days integration

### Blockers & Questions
- **Q1**: Which payment gateway do you prefer? (Stripe is safest for MVP)
- **Q2**: For Business plan: should subscriptions auto-renew, or require manual confirmation?
- **Q3**: What currency? (RON, EUR, or multi-currency?)
- **Q4**: Invoice requirements: simple receipt or full VAT-compliant invoice?

### Approval Checkpoint
**Payment provider choice + architecture decision must be approved before implementation.**

---

## PHASE 3: Security & Optimization Audit

### Goal
Harden security, improve SEO, optimize performance.

### Current State
- ? Unknown: XSS/CSRF protection
- ? Unknown: Input validation on QR content
- ? Unknown: SEO metadata (title, description, og:tags)
- ? Unknown: Performance metrics (page load, render time)

### Audit Items

#### Security Review
1. **Input validation**: Ensure QR input (URL, email, phone, etc.) is validated
2. **XSS prevention**: Sanitize any user-provided content (logo uploads, custom text)
3. **CSRF tokens**: If any forms exist (e.g., contact, feedback)
4. **CSP headers**: Content Security Policy to prevent injected scripts
5. **Dependency audit**: Check qr-code-styling and other libraries for vulnerabilities

#### SEO Optimization
1. **Metadata**: Page title, meta description, og:image, og:url
2. **Structured data**: JSON-LD for organization, local business (if applicable)
3. **Robots/sitemap**: robots.txt, sitemap.xml, canonical URLs
4. **Mobile/responsive**: Ensure mobile-first design

#### Performance
1. **Asset size**: Minify/compress CSS, JS, images
2. **Lazy loading**: Images, logos, heavy scripts
3. **Caching headers**: Set browser cache policies on Netlify
4. **Core Web Vitals**: LCP, FID, CLS measurements

### Deliverables
1. **Security report** with findings and fixes
2. **SEO improvements** (metadata, structured data)
3. **Performance baseline** + optimization checklist
4. **Updated package.json** (dependency audit)

### Estimate
2-3 days review + fixes

### Approval Checkpoint
**Audit results + recommended fixes must be approved before implementation.**

---

## PHASE 4: New Features & Templates

### Goal
Expand QR code content types and industry templates.

### Current Known Features
- ✓ Link, text, email, phone, SMS, Wi-Fi, vCard
- ✓ Industry templates (restaurant, real estate, monuments, inventory)

### Possible Additions
- Event/calendar (iCal format)
- Product catalog (QR → product page)
- Loyalty/coupon codes
- Bitcoin/crypto wallet addresses
- Video embed (via QR → video URL)
- Form submission (QR → Google Form, Typeform)

### Template Ideas
- Hotel/tourism (your domain!)
- Beauty/salon
- Education/courses
- Nonprofit/fundraising

### Deliverables
1. **New content type implementations**
2. **New industry templates** (mockups + backend logic)
3. **Template customization UI** (color picker, branding, etc.)

### Estimate
3-5 days (depends on features chosen)

### Approval Checkpoint
**Feature list + template priorities must be approved before development.**

---

## PHASE 5: Professional Branding (Netlify + Domain)

### Goal
Rename Netlify site and connect custom domain `codqr.ro`.

### Current State
- ✗ Site name: rainbow-chebakia-3e9542 (auto-generated)
- ✗ Domain: rainbow-chebakia-3e9542.netlify.app
- ? Unknown: codqr.ro domain ownership status

### Deliverables
1. **Netlify site rename** (rainbow-chebakia-3e9542 → codqr-ro or similar)
2. **Domain connection** (point codqr.ro → Netlify)
3. **SSL certificate** (automatic via Netlify)
4. **Redirects** (ensure old URL redirects to new domain)

### Technical Steps
```
1. Netlify Admin > Site settings > Change site name
2. Register/verify codqr.ro domain ownership (if not done)
3. Netlify Admin > Domain management > Add domain
4. Update DNS records (or point domain registrar to Netlify nameservers)
5. Wait for DNS propagation (5 min - 48 hours)
6. Verify SSL certificate auto-issued
```

### Blockers & Questions
- **Q1**: Is codqr.ro already registered? If yes, who manages it?
- **Q2**: Where is the domain registered? (GoDaddy, local registrar, Namecheap, etc.)
- **Q3**: Preferred Netlify site name? (codqr-ro, codqr-app, etc.)

### Estimate
1-2 days (mostly waiting for DNS)

### Approval Checkpoint
**Domain status + naming preferences must be confirmed before changes.**

---

## Implementation Timeline (With Approvals)

| Phase | Duration | Start | Complete | Status |
|-------|----------|-------|----------|--------|
| 1 | 2-3 days | Pending approval | - | 🔴 Awaiting |
| 2 | 2-3 days | After Phase 1 | - | 🔴 Blocked |
| 3 | 2-3 days | After Phase 2 | - | 🔴 Blocked |
| 4 | 3-5 days | After Phase 3 | - | 🔴 Blocked |
| 5 | 1-2 days | After Phase 4 | - | 🔴 Blocked |
| **Total** | **10-16 days** | - | - | - |

---

## Critical Decisions Before Start

### 1️⃣ Source Code Location
- **Option A**: Extract from live Netlify deployment (current HTML/JS/CSS)
- **Option B**: Provide local source files
- **Decision needed**: Which one?

### 2️⃣ GitHub Repository
- **Public or private?** (Public = easier collaboration, Private = protection)
- **Organization or personal account?** 

### 3️⃣ Payment Gateway
- **Stripe** (recommended: safest, best docs)
- **2Checkout** (local support)
- **Custom solution** (higher risk, lower fees)

### 4️⃣ Feature Priorities (Phase 4)
- Which new content types first?
- Which templates are most valuable?

### 5️⃣ Domain Status (Phase 5)
- Is codqr.ro already owned?
- Where should it be managed?

---

## Approval Flow

```
User confirms Phase 1 plan
    ↓
I execute Phase 1 (GitHub + deploy)
    ↓
User verifies Phase 1 works
    ↓
User confirms Phase 2 (payment choice)
    ↓
[Repeat for Phases 3, 4, 5]
```

---

## Next Steps

**1. Confirm this plan is acceptable**
- Any changes to phases or timeline?

**2. Answer Phase 1 blockers:**
- Where is the source code? (Local files or extract from Netlify?)
- GitHub: public or private?
- Any PR review requirement?

**3. Proceed with Phase 1 execution**

---

## Notes

- **No breaking changes**: Each phase is additive; we'll test thoroughly
- **Rollback capability**: Once GitHub is connected, we can rollback any deploy in seconds
- **User approval required**: I will NOT execute any phase without your explicit OK
- **Timeline flexible**: If any phase takes longer, we adjust and continue from there
