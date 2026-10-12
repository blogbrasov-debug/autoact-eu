# CodQR.ro — Coduri QR Personalizate

Aplicație web pentru generarea codurilor QR cu design personalizat direct în browser, fără cont necesar.

**Versiune:** 1.0.0  
**Status:** MVP Funcțional  
**Link live:** https://codqr.ro (în progres)

---

## Caracteristici

### Tipuri de conținut codificabile
- 🔗 Link (URL)
- 📝 Text simplu
- ✉️ Email
- 📞 Telefon (apel)
- 💬 SMS
- 📶 Wi-Fi (cu autentificare)
- 👤 Carte de vizită (vCard)

### Personalizare design
- Culori personalizate (foreground, background, gradient)
- Forme de puncte (square, rounded, extra-rounded, classy, classy-rounded, circle, star)
- Forme de colțuri (square, extra-rounded, rounded, circle)
- Logo în centru (PNG/JPG, max 2MB)
- Fundal transparent
- Nivele de corecție a erorilor (L, M, Q, H)
- Margini personalizabile

### Export
- **Plan Gratuit:** PNG/JPG până la 1024px, descărcare instant
- **Plan Pro (19 lei):** SVG vectorial + 2048px + 5 coduri/lună
- **Plan Business (29 lei/lună):** Coduri dinamice + statistici scanare

### Șabloane industrie
- 🍽️ Restaurant/Horeca
- 🏠 Imobiliare
- 🪦 Monumente funerare
- 📦 Inventar/Logistică
- ⭐ Recenzii Google
- 💼 Business/Corporate
- 💅 Beauty/Salon
- 📅 Evenimente

---

## Structură proiect

```
codqr-ro/
├── index.html              # Aplicația principală
├── css/
│   └── style.css          # Stiluri (dark theme, responsive)
├── js/
│   ├── config.js          # Configurație (pricing, URLs de plată)
│   └── app.js             # Logica aplicației (QR generation, exports)
├── vendor/
│   └── qr-code-styling.min.js  # Bibliotecă QR (MIT license)
├── README.md
├── package.json
└── .gitignore
```

---

## Setup local

### Cerințe
- Git
- Node.js 16+ (opțional, doar pentru development)
- Server local (de ex. `python -m http.server`)

### Instalare
```bash
# Clone repository
git clone https://github.com/yourusername/codqr-ro.git
cd codqr-ro

# Start local server
python -m http.server 8000
# sau
npx http-server

# Deschide în browser
# http://localhost:8000
```

---

## Stack tehnologic

- **Frontend:** HTML5, CSS3 (custom properties, responsive)
- **JavaScript:** Vanilla JS (fără framework)
- **QR Generation:** [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) (MIT)
- **Plăți:** Gumroad (current), Stripe (planned)
- **Dinamice QR:** Cloudflare Workers + D1 Database
- **Hosting:** Netlify (static site)
- **CI/CD:** GitHub → Netlify auto-deploy

---

## Plăți

### Gumroad (Current)
- Plan Pro: [Gumroad link]
- Licență verificare via API

### Stripe (Planned)
- Payment Links pentru planuri
- Subscription management (Business plan)
- Webhook handling pentru verificare

---

## Variabile de mediu

```bash
# .env.local
VITE_STRIPE_PUBLISHABLE_KEY=pk_...
VITE_GUMROAD_TOKEN=...
VITE_DYNAMIC_QR_BASE_URL=https://codqr-dynamic.blogbrasov.workers.dev
```

---

## Deployment

### Netlify (Current setup)
1. Connect GitHub repo → Netlify
2. Trigger auto-deploy pe push la `main`
3. DNS pointing: `codqr.ro` → Netlify

### Rollback
```bash
git revert <commit>
git push origin main
# Netlify auto-redeploy triggered
```

---

## Roadmap

### Phase 1: GitHub + Auto-Deploy ✅
- Extract source code to GitHub
- Connect Netlify for auto-deploy on push
- Setup branch protection + PR reviews

### Phase 2: Payment Integration
- Integrate real Stripe payment gateway
- Subscription management for Business plan
- Invoice generation + email delivery

### Phase 3: Security & Optimization
- Audit input validation & XSS protection
- SEO metadata + structured data
- Performance optimization (Core Web Vitals)

### Phase 4: New Features & Templates
- Additional content types (calendar, loyalty, crypto)
- More industry templates
- Advanced customization UI

### Phase 5: Branding
- Rename Netlify site → `codqr-ro`
- Connect custom domain `codqr.ro`
- SSL certificate (automatic via Netlify)

---

## Contact & Support

- **Email:** blogbrasov@gmail.com
- **GitHub:** [codqr-ro](https://github.com/yourusername/codqr-ro)
- **Website:** https://codqr.ro

---

## License

MIT License — See LICENSE file for details

---

**Generat:** 2026-10-12  
**Versiune:** Phase 1 - GitHub + Auto-Deploy
