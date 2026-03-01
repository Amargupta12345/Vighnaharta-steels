# Vighnaharta Steels — Project Context

> **Single source of truth** for anyone working on this codebase.
> Last updated: 2026-03-01

---

## Brand Identity

| Property | Value |
|----------|-------|
| **Brand Name** | Vighnaharta Steels |
| **Tagline** | Premium Steel Solutions |
| **Industry** | B2B Steel Manufacturing & Distribution |
| **Primary Color** | Steel Blue `#2E3A59` |
| **Secondary Color** | Silver Gray `#B0BEC5` |
| **Accent Color** | Orange `#FF6F00` |
| **Font** | Inter (Google Fonts) |
| **Logo** | V-shape monogram + steel beam bars |

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (Pages Router + App Router hybrid) | 15.3.5 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.x |
| Styling | Tailwind CSS | v4 |
| State Management | Redux Toolkit + React Redux | 2.9.x / 9.2.x |
| Package Manager | npm | — |
| Build Tool | SWC (via Next.js) | — |

---

## Project Structure

```
Vighnaharta-steels/
├── app/                          # App Router (API routes only)
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts          # GET /api/products — list all products
│   │   │   └── [slug]/route.ts   # GET /api/products/:slug — product detail
│   │   ├── home/route.ts         # GET /api/home
│   │   ├── about/route.ts        # GET /api/about
│   │   ├── contact/route.ts      # GET/POST /api/contact
│   │   ├── quote/route.ts        # POST /api/quote
│   │   ├── testimonials/route.ts # GET /api/testimonials
│   │   └── pages/[...slug]/route.ts
│   └── layout.tsx
│
├── src/                          # Pages Router (frontend)
│   ├── components/
│   │   ├── Navbar.tsx            # Glassmorphism nav, fixed position
│   │   ├── Banner.tsx            # Hero section with bg image + quicklinks
│   │   ├── Footer.tsx            # Gradient footer with animations
│   │   ├── ProductCard.tsx       # Product card with hover effects
│   │   ├── ProductGrid.tsx       # Grid layout for product cards
│   │   ├── TrendingProductsCarousel.tsx  # Auto-sliding product carousel
│   │   ├── Testimonials.tsx      # Customer testimonials section
│   │   └── BrandExamples.tsx     # Brand color/typography showcase
│   │
│   ├── pages/
│   │   ├── _app.tsx              # App wrapper with Redux Provider + fonts
│   │   ├── index.tsx             # Homepage
│   │   ├── about.tsx             # About us page
│   │   ├── contact.tsx           # Contact form page
│   │   ├── quote.tsx             # Quote request form
│   │   ├── testimonials.tsx      # Customer testimonials
│   │   └── product/
│   │       ├── index.tsx         # Product listing page (/product)
│   │       └── [slug].tsx        # Product detail page (/product/:slug)
│   │
│   ├── store/
│   │   ├── store.ts              # Redux store config
│   │   ├── hooks.ts              # useAppSelector, useAppDispatch
│   │   ├── ReduxProvider.tsx     # Provider wrapper
│   │   └── slices/
│   │       ├── productsSlice.ts  # Products state + async thunks
│   │       ├── homeSlice.ts      # Home page state
│   │       └── testimonialsSlice.ts
│   │
│   ├── lib/
│   │   └── api.ts                # API client (productsAPI, contactAPI, quoteAPI, etc.)
│   │
│   ├── styles/
│   │   └── globals.css           # Global styles, animations, utilities
│   │
│   ├── types/
│   │   └── product.ts            # Product TypeScript interface
│   │
│   └── utils/
│       └── imageUtils.ts         # Image size presets for Next.js Image
│
├── public/
│   ├── assets/images/
│   │   ├── vighnaharta-steels-logo.svg           # Icon-only logo (square)
│   │   ├── vighnaharta-steels-logo-horizontal.svg # Horizontal wordmark logo
│   │   ├── hero-banner.png       # Homepage hero background
│   │   ├── steel-beam.png        # Product image: I-beams
│   │   ├── steel-rod.png         # Product image: TMT bars
│   │   ├── steel-sheet.png       # Product image: Sheets/plates
│   │   ├── steel-pipe.png        # Product image: Pipes
│   │   └── steel-factory.png     # About page factory image
│   └── favicon.svg               # Browser favicon
│
├── next.config.ts                # Next.js config (ESLint disabled for build)
├── tailwind.config.js            # Tailwind with brand colors + Inter font
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies and scripts
├── start.sh                      # Quick start script (runs npm run dev)
└── setup.sh                      # First-time setup script
```

---

## Routes

### Frontend Pages (Pages Router)

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/index.tsx` | Homepage with hero, products carousel, testimonials |
| `/about` | `src/pages/about.tsx` | Company info, mission, values, stats |
| `/product` | `src/pages/product/index.tsx` | Product listing with all 8 products |
| `/product/:slug` | `src/pages/product/[slug].tsx` | Individual product detail page |
| `/contact` | `src/pages/contact.tsx` | Contact information + form |
| `/quote` | `src/pages/quote.tsx` | Quote request form |
| `/testimonials` | `src/pages/testimonials.tsx` | Customer testimonials |

### API Routes (App Router)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List all products (filter by category/featured) |
| `/api/products/:slug` | GET | Get single product detail |
| `/api/home` | GET | Homepage data |
| `/api/about` | GET | About page data |
| `/api/contact` | GET/POST | Contact info / submit form |
| `/api/quote` | POST | Submit quote request |
| `/api/testimonials` | GET | Get testimonials |

---

## Products (8 total)

| Slug | Name | Category | Image |
|------|------|----------|-------|
| `steel-i-beams` | Steel I-Beams | Structural Steel | `steel-beam.png` |
| `steel-rods` | Steel Rods (TMT Bars) | Reinforcement Steel | `steel-rod.png` |
| `steel-sheets` | Steel Sheets | Sheet & Plates | `steel-sheet.png` |
| `steel-pipes` | Steel Pipes | Tubular Products | `steel-pipe.png` |
| `steel-angles` | Steel Angles | Structural Steel | `steel-beam.png` |
| `steel-channels` | Steel Channels | Structural Steel | `steel-beam.png` |
| `steel-plates` | Steel Plates | Sheet & Plates | `steel-sheet.png` |
| `steel-wire` | Steel Wire | Reinforcement Steel | `steel-rod.png` |

---

## Design System

### Brand Colors (Tailwind classes)

```
steel-blue         → #2E3A59   (primary backgrounds, headings)
steel-blue-dark    → #1e2535   (hover states, darker sections)
silver-gray        → #B0BEC5   (secondary text, borders)
accent-orange      → #FF6F00   (CTAs, highlights, accents)
accent-orange-dark → #cc5900   (hover on CTAs)
```

### CSS Animations (defined in globals.css)

`fadeIn`, `slideUp`, `slideInLeft`, `slideInRight`, `float`, `shimmer`, `pulse-glow`, `gradient-shift`

### CSS Utilities (defined in globals.css)

`.glass`, `.glass-dark`, `.glass-card` — glassmorphism effects
`.gradient-text`, `.gradient-text-white` — gradient text
`.card-premium`, `.card-hover-lift` — card effects
`.img-overlay` — image gradient overlay
`.section-divider` — decorative section breaks

### Typography

- **Primary font:** Inter (loaded via Google Fonts in `_app.tsx`)
- **Monospace:** JetBrains Mono (code/specs)

---

## Data Flow

```
User → Page Component → Redux Dispatch (async thunk)
  → src/lib/api.ts (fetch helper)
    → /api/* (App Router API routes)
      → Mock data (in-memory, no database)
        → Response JSON
          → Redux Store → Component re-render
```

> **Note:** All product data is currently mock/in-memory. No database is connected.
> To connect a real backend, modify the API route handlers in `app/api/`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `./start.sh` | Quick start (checks deps, runs dev server) |
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run clean` | Delete `.next`, `node_modules`, `package-lock.json` |
| `npm run fresh-install` | Clean + reinstall |

---

## Known Issues / Notes

- **ESLint:** `ignoreDuringBuilds: true` in `next.config.ts` due to pre-existing lint errors (unused vars, `any` types, `<a>` vs `<Link>`). These should be cleaned up over time.
- **Stale cache:** After moving/renaming page files, always delete `.next/` and restart the dev server.
- **Hybrid routing:** This project uses BOTH Pages Router (`src/pages/`) for frontend AND App Router (`app/`) for API routes. This is intentional and supported by Next.js 15.
- **No database:** All data is mock/in-memory in route handlers.
- **Port:** Dev server defaults to port 3000 (`http://localhost:3000`).
