/**
 * CodQR.ro Configuration — MONETIZATION OPTIMIZED
 * Stripe Payment Integration (Live Mode)
 * Updated: 2026-10-14 — Hybrid pricing model implementation
 */

window.QR_CONFIG = {
  // Brand Info
  brand: {
    name: 'CodQR',
    tagline: 'Coduri QR personalizate, generate instant',
    email: 'blogbrasov@gmail.com',
    website: 'https://codqr.ro'
  },

  // Tier Limits (Free tier — now limited to drive conversions)
  limits: {
    free: {
      maxWidth: 1024,
      maxFormat: 'png',
      maxCodesPerMonth: 10, // NEW: Limit free tier after 30 days to drive Pro conversions
      analyticsRetention: 7 // days
    }
  },

  // Pricing Tiers — HYBRID MODEL
  tiers: {
    free: {
      name: 'Gratuit',
      price: '0',
      currency: 'RON',
      description: 'PNG/JPG până la 1024px — 10 coduri/lună după trial',
      features: [
        'Download instant',
        'Fără cont necesar',
        '10 coduri/lună (după 30 zile)',
        'Suport comunitate'
      ]
    },
    pro_percode: {
      name: 'Pro — Per Cod',
      price: '19',
      currency: 'RON/cod',
      description: 'SVG vectorial + 2048px — plătești doar ce iei',
      features: [
        'SVG vectorial pentru print',
        'Export 2048px',
        'Fără watermark',
        'Licență comercială',
        'Ideal pentru utilizare ocazională'
      ],
      type: 'one-time'
    },
    pro_monthly: {
      name: 'Pro — Abonament',
      price: '39',
      currency: 'RON/lună',
      description: 'Exporturi SVG nelimitate — cea mai bună valoare',
      features: [
        'Exporturi Pro nelimitate',
        'SVG + PNG 2048px',
        'Fără watermark',
        'Licență comercială extinsă',
        'Anulare oricând'
      ],
      type: 'subscription',
      badge: 'BEST VALUE'
    },
    business: {
      name: 'Business',
      price: '89',
      currency: 'RON/lună',
      description: 'Coduri dinamice + analytics — pentru SME-uri active',
      features: [
        'Coduri dinamice (schimbabil după print)',
        'Statistici scanare real-time',
        'Unlimited coduri',
        'API access (beta)',
        'Email support prioritar',
        '3 team members',
        'Ideal pentru restaurant, imobiliar, inventar'
      ],
      type: 'subscription',
      badge: 'POPULAR'
    }
  },

  // Stripe Configuration (Live Mode)
  stripe: {
    publishableKey: 'pk_live_51UMWHdBRTh54P0hRK3vQjMtndxX0JZnVsGh5JJlhvWwwyaWjslV1SPBLWD7v8Bmqj6DEO7DKM2LFxlKCeDOfKESr00qBhxgOGp',
    accountId: 'acct_1UMWHdBRTh54P0hR',
    mode: 'live',
    // Price IDs - REQUIRES UPDATE IN STRIPE DASHBOARD FOR NEW PRICES
    // See ACTION_PLAN_STRIPE_PRICING.md for setup instructions
    prices: {
      pro: 'price_1UPfB2BRTh54P0hRNU2yvEK0',       // CodQR Pro - one-time 19 RON (keep as-is)
      pro_monthly: 'price_1UQVi6BRTh54P0hRQ7jEBgzJ',      // CodQR Pro Monthly - 39 RON/month subscription ✅
      business: 'price_1UQVjIBRTh54P0hR1Z01lqRa'   // CodQR Business - 89 RON/month ✅
    },
    // Success/Cancel URLs
    successUrl: window.location.origin + '/index.html?success=true',
    cancelUrl: window.location.origin + '/index.html?canceled=true'
  },

  // Industry Package Products — NEW REVENUE STREAM
  products: {
    etichete: {
      name: 'Kit Etichete Inventar',
      price: '79',
      currency: 'RON',
      description: '500 etichete + QR coduri nelimitate',
      icon: '📦',
      ideal_for: 'Retaileri, depozite, magazine'
    },
    kitreview: {
      name: 'Kit Recenzii Google',
      price: '49',
      currency: 'RON',
      description: 'Pachet complet: QR + templates email + ghid',
      icon: '⭐',
      ideal_for: 'Restaurante, saloane, servicii'
    },
    horeca: {
      name: 'Pachet HoReCa Pro',
      price: '119',
      currency: 'RON/lună',
      description: 'Meniu QR + carduri vizită + promocii sezonale',
      icon: '🍽️',
      ideal_for: 'Restaurant, bar, cafenea'
    },
    imobiliare: {
      name: 'Pachet Imobiliar',
      price: '99',
      currency: 'RON/lună',
      description: 'Anunț cu QR + virtual tour + contact',
      icon: '🏠',
      ideal_for: 'Agent imobiliar, birou vânzări'
    },
    monument: {
      name: 'Program Partener Producători',
      price: '199',
      currency: 'RON/lună',
      description: 'White-label QR + branding partener',
      icon: '🏛️',
      ideal_for: 'Producători pietre funerare'
    }
  },

  // Dynamic QR Configuration
  dynamicQr: {
    baseUrl: 'https://codqr-dynamic.blogbrasov.workers.dev',
    apiKey: (typeof window !== 'undefined' && window.DYNAMIC_QR_API_KEY) ? window.DYNAMIC_QR_API_KEY : ''
  },

  // Feature Flags
  features: {
    dynamicQr: true,
    stripeCheckout: true,
    freeTierLimits: true, // NEW: Enforce 10 codes/month after 30 days
    industryPackages: true, // NEW: Show industry package CTAs
    gumroadFallback: false
  }
};

// Legacy Gumroad config (deprecated, kept for reference)
window.QR_CONFIG.gumroad = {
  enabled: false,
  token: '',
  products: {
    pro: '',
    business: '',
  }
};
