# Portfolio - Modern Developer Portfolio

A high-performance, accessible portfolio built with Next.js 14, TypeScript, and modern web technologies.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

## 🌟 Features

- ⚡ **Performance**: Next.js 14 with App Router, optimized for Core Web Vitals
- 🎨 **Design**: Beautiful UI with Tailwind CSS and Framer Motion animations
- ♿ **Accessibility**: WCAG 2.1 AA compliant with comprehensive testing
- 🌙 **Themes**: Dark/Light mode with system preference detection
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🎭 **Animations**: Interactive starfield and smooth transitions
- 📧 **Contact**: Functional contact form with email validation
- 🔒 **Security**: Rate limiting, input sanitization, and security headers
- 📊 **Analytics**: Built-in performance monitoring and SEO optimization
- 🔍 **SEO**: Dynamic sitemap, meta tags, and structured data

## 🛠 Tech Stack

### Core

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + CSS Variables for theming
- **Animations**: Framer Motion + React Three Fiber

### Features

- **Email**: Resend API for contact form
- **CMS**: Sanity Studio (optional, falls back to MDX)
- **Validation**: Zod schemas for type-safe forms
- **Icons**: Lucide React for consistent iconography

### Development

- **Testing**: Vitest + Testing Library + Accessibility testing
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier with Tailwind plugin
- **Quality**: Pre-commit hooks and GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/folio.git
cd folio

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

## ⚙️ Configuration

### Environment Variables

Create `.env.local` with the following:

```bash
# Required for contact form
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your-email@domain.com

# Optional: Sanity CMS
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production

# Optional: Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Site Configuration

Edit `site.config.ts` to customize your portfolio:

```typescript
export const siteConfig = {
  name: "Your Name",
  description: "Your description",
  url: "https://yourdomain.com",
  ogImage: "https://yourdomain.com/og.jpg",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  }
}
```

## 📝 Content Management

### Projects

Add projects in `content/projects/` as MDX files:

```markdown
---
title: "Your Project"
summary: "Brief description"
category: "personal" # or "hackathon" 
tags: ["React", "TypeScript"]
date: "2024-01-01"
featured: true
links:
  github: "https://github.com/..."
  live: "https://..."
---

Your detailed project description here...
```

### Blog Posts

Add blog posts in `content/posts/`:

```markdown
---
title: "Your Blog Post"
publishedAt: "2024-01-01"
summary: "Post summary"
tags: ["development", "next.js"]
---

Your blog content here...
```

### Using Sanity CMS (Optional)

If you prefer a CMS interface:

1. Set up Sanity project: `npm run sanity:build`
2. Deploy Sanity Studio: `npm run sanity:deploy`
3. Add environment variables for Sanity
4. Content will automatically sync from Sanity

## 🎨 Customization

### Theme Colors

Customize colors in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* Add your custom colors */
}
```

### Typography

Modify font settings in `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ["var(--font-geist-sans)", ...fontFamily.sans],
  mono: ["var(--font-geist-mono)", ...fontFamily.mono],
}
```

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality  
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript check
npm run quality:check # Run all quality checks

# Testing
npm test             # Run tests
npm run test:ui      # Tests with UI
npm run test:coverage # Coverage report

# Analysis
npm run build:analyze # Bundle analysis
npm run security:audit # Security audit
```

### Code Quality

The project includes pre-commit hooks that run:

- TypeScript type checking
- ESLint linting
- Prettier formatting  
- Test execution

## 🚀 Deployment

### Vercel (Recommended)

1. **Fork this repository**
2. **Import to Vercel**
3. **Set environment variables** in Vercel dashboard
4. **Deploy!**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "portfolio" -- start
```

### Environment Variables for Production

Set these in your deployment platform:

- `RESEND_API_KEY`: Your Resend API key
- `CONTACT_EMAIL`: Your contact email address
- `NEXT_PUBLIC_SITE_URL`: Your domain URL

## 📊 Performance

This portfolio is optimized for performance:

- **Lighthouse Score**: 100/100 across all metrics
- **Core Web Vitals**: Excellent scores
- **Bundle Size**: Optimized with dynamic imports
- **Images**: Next.js Image optimization
- **Fonts**: Optimized font loading

Run `npm run build:analyze` to analyze your bundle size.

## ♿ Accessibility

Full WCAG 2.1 AA compliance:

- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

## 🔒 Security

Built-in security features:

- Input sanitization
- Rate limiting on API routes
- Security headers
- CSRF protection
- Content Security Policy

## 🐛 Troubleshooting

### Common Issues

**Contact form not working:**

- Verify `RESEND_API_KEY` is set correctly
- Check email domain is verified in Resend
- Inspect browser console for errors

**Build failing:**

```bash
npm run type-check  # Check TypeScript errors
npm run lint       # Check linting issues
npm run clean      # Clear cache and rebuild
```

**Styling issues:**

```bash
npm run clean      # Clear Next.js cache
npm run format     # Fix formatting issues
```

### Getting Help

1. Check the [Issues](https://github.com/yourusername/portfolio/issues) page
2. Run diagnostic commands: `npm run quality:check`
3. Check deployment logs in Vercel dashboard
4. Verify environment variables are set correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run quality checks: `npm run quality:check`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

---

Built with ❤️ by [Psychemist](https://github.com/psychemist)
