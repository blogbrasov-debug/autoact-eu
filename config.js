/**
 * CodQR.ro Configuration
 * Stripe Payment Integration (Live Mode)
 */

window.QR_CONFIG = {
  // Brand Info
  brand: {
    name: 'CodQR',
    tagline: 'Coduri QR personalizate, generate instant',
    email: 'blogbrasov@gmail.com',
    website: 'https://codqr.ro'
  },

  // Tier Limits (Free tier)
  limits: {
    free: {
      maxWidth: 1024,
      maxFormat: 'png'
    }
  },

  // Pricing Tiers
  tiers: {
    free: {
      name: 'Gratuit',
      price: '0',
      currency: 'RON',
      description: 'PNG/JPG până la 1024px',
      features: [
        'Download instant',
        'Fără cont necesar',
        'Fără limită de timp'
      ]
    },
    pro: {
      name: 'Pro',
      price: '19',
      currency: 'RON',
      description: 'SVG vectorial + 2048px',
      features: [
        'SVG vectorial pentru print',
        'Export 2048px',
        'Fără watermark',
        '5 coduri/lună'
      ],
      type: 'one-time'
    },
    business: {
      name: 'Business',
      price: '29',
      currency: 'RON/lună',
      description: 'Coduri dinamice + statistici',
      features: [
        'Coduri dinamice (schimbabil după print)',
        'Statistici scanare',
        'Unlimited coduri',
        'API access'
      ],
      type: 'subscription'
    }
  },

  // Stripe Configuration (Live Mode)
  stripe: {
    publishableKey: 'pk_live_51UMWHdBRTh54P0hRK3vQjMtndxX0JZnVsGh5JJlhvWwwyaWjslV1SPBLWD7v8Bmqj6DEO7DKM2LFxlKCeDOfKESr00qBhxgOGp',
    accountId: 'acct_1UMWHdBRTh54P0hR',
    mode: 'live',
    // Price IDs - CONFIGURED FOR LIVE PAYMENTS
    prices: {
      pro: 'price_1UPfB2BRTh54P0hRNU2yvEK0', // CodQR Pro - one-time 19 RON
      business: 'price_1UPfEeBRTh54P0hRb4jMXSxg' // CodQR Business - recurring 29 RON/month
    },
    // Success/Cancel URLs
    successUrl: window.location.origin + '/index.html?success=true',
    cancelUrl: window.location.origin + '/index.html?canceled=true'
  },

  // Products (Business packages)
  products: {
    etichete: {
      name: 'Etichete Inventar',
      price: '49',
      currency: 'RON',
      description: '500 etichete personalizate'
    },
    kitreview: {
      name: 'Kit Recenzii Google',
      price: '39',
      currency: 'RON',
      description: 'Pachet complet de promovare recenzii'
    },
    horeca: {
      name: 'Pachet HoReCa',
      price: '99',
      currency: 'RON/lună',
      description: 'Gestionare coduri pentru restaurant'
    },
    partener: {
      name: 'Program Partener',
      price: '149',
      currency: 'RON/an',
      description: 'Pentru producători de monumente'
    }
  },

  // Dynamic QR Configuration
  dynamicQr: {
    baseUrl: 'https://codqr-dynamic.blogbrasov.workers.dev',
    apiKey: process.env.DYNAMIC_QR_API_KEY || ''
  },

  // Feature Flags
  features: {
    dynamicQr: true,
    stripeCheckout: true,
    gumroadFallback: false
  }
};

// Legacy Gumroad config (deprecated, kept for reference)
window.QR_CONFIG.gumroad = {
  enabled: false,
  token: '', // Deprecated
  products: {
    pro: '', // Deprecated
    business: '', // Deprecated
  }
};
