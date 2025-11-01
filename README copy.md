# 🏭 Vighnaharta Steel Industries Website

A modern, responsive website for Vighnaharta Steel Industries built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Quick Start

### Prerequisites

- **Node.js v20.17.0 or higher** ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)

### 🔧 Setup & Installation

#### Option 1: Automated Setup (Recommended)

**For macOS/Linux:**
```bash
npm run setup
```

**For Windows:**
```bash
npm run setup:windows
```

#### Option 2: Manual Setup

1. **Clone and navigate to the project:**
```bash
cd vighnaharta-website
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open your browser:**
   - Visit: [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
vighnaharta-website/
├── 📁 app/                 # Backend API routes (Next.js App Router)
│   ├── api/                # API endpoints
│   ├── about/              # Backend about route
│   ├── contact/            # Backend contact route
│   ├── quote/              # Backend quote route
│   └── layout.tsx          # Root layout
├── 📁 src/                 # Frontend application
│   ├── components/         # React components
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── Footer.tsx      # Footer component
│   │   ├── Banner.tsx      # Hero section
│   │   ├── ProductCard.tsx # Product cards
│   │   └── ProductGrid.tsx # Product grid layout
│   ├── pages/              # Frontend pages
│   │   ├── index.tsx       # Home page
│   │   ├── about.tsx       # About page
│   │   ├── contact.tsx     # Contact page
│   │   └── products/       # Product pages
│   ├── lib/                # Utilities and libraries
│   ├── sections/           # Page sections
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── 📁 public/              # Static assets
│   └── assets/
│       └── images/         # Steel product images
└── 📄 Configuration files
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run setup` | Automated setup (macOS/Linux) |
| `npm run setup:windows` | Automated setup (Windows) |
| `npm run clean` | Clean build files and dependencies |
| `npm run fresh-install` | Clean install dependencies |
| `npm run type-check` | Check TypeScript types |

## 🎯 Key Features

### 🏗️ Steel Industry Focused
- **Product Catalog**: I-beams, rods, sheets, pipes with specifications
- **Quality Assurance**: Industry standards and certifications
- **Professional Design**: Modern, industrial aesthetic
- **Contact & Quote**: Lead generation forms

### 🔧 Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** mobile-first approach
- **SEO Optimized** metadata and structure
- **API Routes** for backend functionality

### 📱 Pages Included
- **Home** - Hero section, features, featured products
- **About** - Company history, mission, values, team
- **Products** - Complete product catalog with details
- **Contact** - Contact form, location, business hours
- **Quote** - Detailed quote request form

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_NAME="Vighnaharta Steel Industries"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"

# Add your environment variables here
# DATABASE_URL="your_database_url"
# API_KEY="your_api_key"
```

## 🛠️ Development

### File Organization
- **Frontend pages**: Edit files in `src/pages/`
- **Components**: Reusable components in `src/components/`
- **Backend API**: API routes in `app/api/`
- **Styles**: Global styles in `src/styles/`
- **Images**: Static assets in `public/assets/`

### Adding New Products
1. Add product images to `public/assets/images/`
2. Update product data in relevant page files
3. Add product specifications and details

### Customization
- **Colors**: Update Tailwind config in `tailwind.config.js`
- **Fonts**: Modify in `app/layout.tsx`
- **Company Info**: Update contact details in components

## 🔧 Troubleshooting

### Node.js Version Issues
If you see version compatibility errors:
1. Update Node.js to v20.17.0 or higher
2. Or use nvm: `nvm install 20 && nvm use 20`

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

### Clean Installation
If you encounter dependency issues:
```bash
npm run fresh-install
```

## 📧 Support

For questions or support, please contact:
- **Email**: info@vighnahartasteel.com
- **Phone**: +91 98765 43210

## 📄 License

This project is proprietary software owned by Vighnaharta Steel Industries.

---

**Happy Coding! 🚀**

Made with ❤️ for Vighnaharta Steel Industries