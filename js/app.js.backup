/**
 * CodQR.ro — QR Code Generator Application
 * Stripe Payment Integration (Live Mode)
 */

// Initialize Stripe
let stripe = null;
let qrCode = null;
let currentQRCode = null;

// Application State
const state = {
  data: '',
  type: 'url',
  colors: {
    fg: '#000000',
    bg: '#ffffff',
    fg2: ''
  },
  gradient: false,
  transparency: false,
  dotsStyle: 'square',
  cornersStyle: 'square',
  errorLevel: 'M',
  margin: 0,
  logo: null,
  logoSize: 0.3,
  isDynamic: false,
  dynamicSlug: ''
};

// ============= INITIALIZATION =============

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  loadStripe();
  checkPaymentStatus();
  setupEventListeners();
  restoreDraft();
  applyDefaultValues();
});

function initializeApp() {
  // Load Stripe.js
  const script = document.createElement('script');
  script.src = 'https://js.stripe.com/v3/';
  script.async = true;
  script.onload = () => {
    stripe = Stripe(window.QR_CONFIG.stripe.publishableKey);
  };
  document.body.appendChild(script);

  // Initialize QR Code generator
  const canvas = document.getElementById('qr-canvas');
  if (canvas) {
    qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'canvas',
      data: state.data || 'https://codqr.ro',
      dotsOptions: { type: state.dotsStyle, color: state.colors.fg },
      cornersSquareOptions: { type: state.cornersStyle, color: state.colors.fg },
      cornersCircleOptions: { color: state.colors.fg },
      backgroundOptions: { color: state.colors.bg },
      margin: state.margin,
      errorCorrectionLevel: state.errorLevel
    });
    qrCode.append(canvas);
  }
}

function loadStripe() {
  const script = document.createElement('script');
  script.src = 'https://js.stripe.com/v3/';
  script.async = true;
  script.onload = () => {
    stripe = Stripe(window.QR_CONFIG.stripe.publishableKey);
    console.log('✅ Stripe loaded and initialized');
  };
  script.onerror = () => {
    console.error('❌ Failed to load Stripe.js');
    showToast('Eroare la încărcare Stripe. Reîncarcă pagina.', 'error');
  };
  document.head.appendChild(script);
}

function checkPaymentStatus() {
  const params = new URLSearchParams(window.location.search);

  if (params.get('success') === 'true') {
    showSuccessModal('Plată confirmată!', 'Mulțumim! Codul tău QR Pro este gata de descărcare.');
    updateProBadge();
  }

  if (params.get('canceled') === 'true') {
    showToast('Plata a fost anulată. Poți încerca din nou oricând.', 'info');
  }
}

function setupEventListeners() {
  // Type tabs
  document.querySelectorAll('.type-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      switchContentType(e.target.dataset.type);
    });
  });

  // Preset templates
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      applyPreset(e.target.closest('[data-preset]').dataset.preset);
    });
  });

  // Logo upload
  const logoInput = document.getElementById('logo-upload');
  if (logoInput) {
    logoInput.addEventListener('change', handleLogoUpload);
  }

  // Download buttons
  document.querySelectorAll('[data-format]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const format = e.target.dataset.format;
      const size = e.target.dataset.size || '1024';
      handleExport(format, size);
    });
  });

  // Pro/Business buttons - STRIPE CHECKOUT
  document.querySelectorAll('[data-tier]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tier = e.target.closest('[data-tier]').dataset.tier;
      handleStripeCheckout(tier);
    });
  });

  // Checkout modal
  const coCancel = document.getElementById('co-cancel');
  if (coCancel) {
    coCancel.addEventListener('click', closeCheckoutModal);
  }

  const coPayBtn = document.getElementById('co-pay');
  if (coPayBtn) {
    coPayBtn.addEventListener('click', proceedToStripeCheckout);
  }

  const successClose = document.getElementById('success-close');
  if (successClose) {
    successClose.addEventListener('click', closeSuccessModal);
  }
}

// ============= STRIPE PAYMENT HANDLER =============

function handleStripeCheckout(tier) {
  if (!stripe) {
    showToast('Stripe nu a fost încărcat. Reîncarcă pagina.', 'error');
    return;
  }

  // Validate tier
  if (!window.QR_CONFIG.tiers[tier]) {
    console.error(`Unknown tier: ${tier}`);
    return;
  }

  // Check if price ID is configured
  const priceId = window.QR_CONFIG.stripe.prices[tier];
  if (!priceId || priceId === 'price_') {
    showToast('Plată nu este configurată încă. Contactează support.', 'error');
    console.warn(`Price ID not configured for tier: ${tier}`);
    return;
  }

  // Show checkout modal
  showCheckoutModal(tier);
}

function showCheckoutModal(tier) {
  const tierConfig = window.QR_CONFIG.tiers[tier];
  const modal = document.getElementById('checkout-modal');

  if (!modal) return;

  document.getElementById('co-title').textContent = tierConfig.name;
  document.getElementById('co-price').textContent = tierConfig.price + ' ' + tierConfig.currency;

  const featuresList = document.getElementById('co-features');
  featuresList.innerHTML = '';
  tierConfig.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = '✓ ' + feature;
    featuresList.appendChild(li);
  });

  modal.hidden = false;
  document.querySelector('.modal-backdrop#checkout-modal').hidden = false;

  // Store selected tier for checkout
  window.selectedTier = tier;
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.hidden = true;
    document.querySelector('.modal-backdrop#checkout-modal').hidden = true;
  }
}

async function proceedToStripeCheckout() {
  const tier = window.selectedTier;
  if (!tier) {
    showToast('Tier-ul nu este selectat.', 'error');
    return;
  }

  const priceId = window.QR_CONFIG.stripe.prices[tier];
  if (!priceId || priceId === 'price_') {
    showToast('Price ID not configured. Contact support.', 'error');
    return;
  }

  try {
    // Create checkout session via Stripe
    const response = await fetch('/.netlify/functions/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        priceId: priceId,
        tier: tier,
        successUrl: window.QR_CONFIG.stripe.successUrl,
        cancelUrl: window.QR_CONFIG.stripe.cancelUrl
      })
    });

    const session = await response.json();

    if (session.error) {
      showToast('Eroare: ' + session.error, 'error');
      return;
    }

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId
    });

    if (result.error) {
      showToast('Eroare la redirecție: ' + result.error.message, 'error');
    }
  } catch (error) {
    console.error('Stripe checkout error:', error);
    showToast('Eroare la inițialisarea plății.', 'error');
  }

  closeCheckoutModal();
}

// ============= QR CODE GENERATION =============

function switchContentType(type) {
  state.type = type;

  // Update active tab
  document.querySelectorAll('.type-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.type === type);
  });

  // Show/hide form fields
  document.querySelectorAll('.type-form').forEach(form => {
    form.hidden = form.id !== `form-${type}`;
  });

  // Reset data and regenerate
  state.data = '';
  const input = document.querySelector(`.type-form:not([hidden]) input`);
  if (input) {
    input.focus();
    input.value = getDefaultValue(type);
    state.data = input.value;
  }

  saveDraft();
  updateQRCode();
}

function getDefaultValue(type) {
  const defaults = {
    url: 'https://codqr.ro',
    text: 'Hello World',
    email: 'contact@codqr.ro',
    tel: '+40123456789',
    sms: '+40123456789',
    wifi: 'WIFI:T:WPA;;S:NetworkName;P:password;;',
    vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+40123456789\nEND:VCARD'
  };
  return defaults[type] || '';
}

function updateQRCode() {
  if (!qrCode) return;

  const data = buildQRData();

  qrCode.update({
    data: data,
    dotsOptions: {
      type: state.dotsStyle,
      color: state.colors.fg
    },
    cornersSquareOptions: {
      type: state.cornersStyle,
      color: state.colors.fg
    },
    backgroundOptions: {
      color: state.colors.bg
    },
    margin: state.margin,
    errorCorrectionLevel: state.errorLevel
  });

  // Check contrast
  checkContrast(state.colors.fg, state.colors.bg);
}

function buildQRData() {
  const input = document.querySelector(`.type-form:not([hidden]) input`);
  let data = input?.value || state.data;

  switch (state.type) {
    case 'email':
      return `mailto:${data}`;
    case 'tel':
      return `tel:${data}`;
    case 'sms':
      return `smsto:${data}`;
    case 'wifi':
      return data; // Already in WIFI format
    case 'vcard':
      return data; // Already in vCard format
    default:
      return data;
  }
}

function applyPreset(preset) {
  const presets = {
    elegant: { fg: '#2c3e50', bg: '#ecf0f1', dotsStyle: 'rounded', cornersStyle: 'rounded' },
    meniu: { fg: '#8b0000', bg: '#fff8dc', dotsStyle: 'circle', cornersStyle: 'square' },
    neon: { fg: '#00ff00', bg: '#000000', dotsStyle: 'square', cornersStyle: 'square' },
    minimal: { fg: '#333333', bg: '#ffffff', dotsStyle: 'square', cornersStyle: 'square' }
  };

  if (!presets[preset]) return;

  const config = presets[preset];
  state.colors.fg = config.fg;
  state.colors.bg = config.bg;
  state.dotsStyle = config.dotsStyle;
  state.cornersStyle = config.cornersStyle;

  // Update UI
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === preset);
  });

  saveDraft();
  updateQRCode();
}

function handleLogoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    showToast('Logo trebuie să fie sub 2MB', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    state.logo = event.target.result;
    if (qrCode) {
      qrCode.update({ image: state.logo });
    }
    saveDraft();
  };
  reader.readAsDataURL(file);
}

function handleExport(format, size) {
  if (!qrCode) return;

  const sizeMap = { '512': 512, '1024': 1024, '2048': 2048 };
  const exportSize = sizeMap[size] || 1024;

  // Check if export requires payment
  if (size !== '1024' && format !== 'png' && format !== 'jpg') {
    handleStripeCheckout('pro');
    return;
  }

  try {
    if (format === 'svg') {
      qrCode.download({ name: 'qr-code', extension: 'svg' });
    } else {
      const canvas = document.getElementById('qr-canvas');
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `qr-code.${format}`;
      link.click();
    }
    showToast('Descărcare în progres...', 'success');
  } catch (error) {
    console.error('Export error:', error);
    showToast('Eroare la descărcare', 'error');
  }
}

// ============= UTILITY FUNCTIONS =============

function saveDraft() {
  const draft = {
    type: state.type,
    data: document.querySelector(`.type-form:not([hidden]) input`)?.value || '',
    colors: state.colors,
    dotsStyle: state.dotsStyle,
    cornersStyle: state.cornersStyle,
    errorLevel: state.errorLevel
  };
  localStorage.setItem('draft_v1', JSON.stringify(draft));
}

function restoreDraft() {
  const saved = localStorage.getItem('draft_v1');
  if (!saved) return;

  try {
    const draft = JSON.parse(saved);
    state.type = draft.type || 'url';
    state.colors = draft.colors || state.colors;
    state.dotsStyle = draft.dotsStyle || 'square';
    state.cornersStyle = draft.cornersStyle || 'square';
    state.errorLevel = draft.errorLevel || 'M';

    const input = document.querySelector(`.type-form:not([hidden]) input`);
    if (input && draft.data) {
      input.value = draft.data;
    }
  } catch (error) {
    console.error('Error restoring draft:', error);
  }
}

function applyDefaultValues() {
  const urlInput = document.getElementById('in-url');
  if (urlInput) urlInput.value = 'https://codqr.ro';
}

function checkContrast(fg, bg) {
  // Simple contrast check
  const fgBright = parseInt(fg.substring(1), 16);
  const bgBright = parseInt(bg.substring(1), 16);

  if (Math.abs(fgBright - bgBright) < 100000) {
    showToast('⚠️ Contrast scăzut între culori', 'warning');
  }
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.hidden = false;

  setTimeout(() => {
    toast.hidden = true;
  }, 4000);
}

function showSuccessModal(title, message) {
  const modal = document.getElementById('success-modal');
  if (!modal) return;

  document.getElementById('success-title').textContent = title;
  document.getElementById('success-msg').textContent = message;
  modal.hidden = false;
  document.querySelector('.modal-backdrop#success-modal').hidden = false;
}

function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.hidden = true;
    document.querySelector('.modal-backdrop#success-modal').hidden = true;
  }
}

function updateProBadge() {
  const badge = document.getElementById('pro-badge');
  if (badge) {
    badge.hidden = false;
    badge.textContent = '✦ Pro activ';
  }
}
