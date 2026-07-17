# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
# ENTERPRISE AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses the latest Next.js App Router architecture.
Always check current framework conventions before implementing features.
<!-- END:nextjs-agent-rules -->

---

## 1. PROJECT MISSION: "ANTIGRAVITY UX"

You are building a world-class luxury shower cabin digital showroom. The platform must feel **weightless, frictionless, and instantaneous** — an "Antigravity" digital experience.

The final product must feel comparable to:
- Apple
- Stripe
- Linear
- Vercel
- Porsche
- Bang & Olufsen

This is NOT a template e-commerce website. It is a high-performance digital flagship store.

---

## 2. TECHNOLOGY STACK

Frontend
- Next.js 15 (App Router)
- React 19 (React Compiler enabled)
- TypeScript (strict)
- Tailwind CSS
- Shadcn/UI
- Framer Motion
- next-pwa (for mobile app-like behavior)

Backend
- Next.js Server Actions
- Route Handlers
- Edge Middleware

Database
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage

---

## 3. ABSOLUTE RULES (NON-NEGOTIABLE)

### NEVER
- Generate mock data
- Use fake CRUD behavior
- Leave buttons without functionality
- Create placeholder handlers
- Use local arrays as persistent storage
- Use 'any' as a shortcut
- Skip validation, loading states, or error handling
- Skip accessibility requirements
- Simplify requested functionality
- Create UI-only implementations
- Ignore Core Web Vitals

### ALWAYS
- Persist data to Supabase
- Read, Update, and Delete data from Supabase
- Use React Hook Form with Zod validation
- Use TypeScript strict typing
- Show loading skeletons, error states, and success toasts
- Refresh UI after mutations (`revalidatePath` / `revalidateTag`)
- Implement confirmation dialogs for destructive actions

---

## 4. DEFINITION OF DONE

A feature is NOT complete if:
- A button does nothing or data is not persisted to Supabase
- Loading, error, and empty states are missing
- Data disappears after a hard refresh
- TypeScript or Accessibility (WCAG) errors exist
- **Lighthouse score drops below target (100)**
- **Mobile experience feels like a website rather than a native app**

A feature is complete ONLY when it works end-to-end against Supabase, survives page refresh, and loads instantly.

---

## 5. PERFORMANCE RULES (ANTIGRAVITY MANDATE)

Performance is a feature. Do whatever is necessary to achieve perfection.

Target scores:
- Desktop Lighthouse: **100**
- Mobile Lighthouse: **100**

### Mandatory Performance Implementations:
- **Zero Layout Shift (CLS):** Pre-calculate aspect ratios and reserve space for dynamic content.
- **Instant TTFB:** Heavily utilize Next.js cache, Partial Prerendering (PPR), and Edge CDN.
- **Image Optimization:** Use `next/image` exclusively. Force `avif` formats. Preload LCP (Largest Contentful Paint) images.
- **Font Optimization:** Use `next/font` to eliminate layout shift and network waterfalls.
- **Bundle Size:** Initial JS bundle must be < 150KB. Dynamically import (`next/dynamic`) heavy components, charts, and modals below the fold.
- **Server Components Default:** Keep client components (`'use client'`) strictly at the leaf nodes (buttons, forms, interactive bits).

---

## 6. NATIVE MOBILE APP FEEL (MOBILE-FIRST IMPERATIVE)

The mobile web version must look, feel, and operate like a premium iOS/Android native app. 

### Mandatory App-Like Behaviors:
- **Gestures & Swipes:** Implement Framer Motion drag gestures for carousels, drawers, and dismissible elements.
- **Bottom Sheets over Modals:** On mobile, NEVER use center-screen popup modals. Always use draggable bottom sheets.
- **Tap Highlights:** Remove default browser tap flashes (`-webkit-tap-highlight-color: transparent`).
- **Overscroll:** Control bounce effects using `overscroll-behavior: none` where appropriate to prevent the whole page from pulling when swiping inside a container.
- **Safe Areas:** Respect notch and home indicator safe areas (`env(safe-area-inset-bottom)`).
- **Navigation:** Use fixed bottom tab bars for main mobile navigation (where applicable) instead of hidden hamburger menus.
- **Touch Targets:** Minimum 48x48 pixels for all interactive elements.
- **Input Zoom:** Prevent iOS from zooming in on inputs by ensuring all text inputs are at least `16px`.
- **PWA Ready:** Implement a web app manifest and theme colors for seamless home-screen installation.

---

## 7. SEO RULES (MAXIMUM VISIBILITY)

Every public page must be perfectly optimized for search engines.

### Mandatory SEO Implementations:
- **Dynamic Metadata:** Use Next.js `generateMetadata` for dynamic pages (products, categories).
- **Open Graph & Twitter Cards:** Implement dynamic OG images (`next/og`) for shareability.
- **Semantic HTML5:** Use `<article>`, `<nav>`, `<aside>`, `<main>`, `<section>`, and perfect heading hierarchy (H1, H2, H3).
- **Structured Data (JSON-LD):** Inject rich snippets for Products, Breadcrumbs, and Organization.
- **Sitemaps & Robots:** Maintain dynamic `sitemap.xml` and properly configured `robots.txt`.
- **Canonical URLs:** Prevent duplicate content penalties.

---

## 8. ACCESSIBILITY RULES

WCAG AA is mandatory.
- Keyboard navigation (Tab flow must be logical).
- Visible custom focus rings (e.g., `focus-visible:ring-2`).
- Proper ARIA labels and `sr-only` text for icon buttons.
- Screen reader support and reduced motion support (`prefers-reduced-motion`).

---

## 9. ADMIN MODULE STANDARD

Every admin feature must include:
- **CREATE:** Validated form, Supabase insert, success toast, error handling, button loading state.
- **READ:** Real Supabase data, loading skeleton, empty state, error state, server-side pagination.
- **UPDATE:** Prefilled edit form, validation, Supabase update, automatic UI refresh.
- **DELETE:** Confirmation dialog (Alert Dialog), Supabase delete, automatic UI refresh, success toast.

---

## 10. DATABASE RULES

- Use UUID primary keys and Foreign keys.
- Create Indexes for filtered/searched columns.
- Enforce `created_at` and `updated_at` timestamps.
- Implement strict Row Level Security (RLS) policies.
- **Never** perform multiple related mutations without Supabase RPC transactions.

---

## 11. FILE STRUCTURE RULES

Use a feature-based architecture (Colocation):

```text
features/feature-name/
  components/
  actions/
  hooks/
  types/
  validations/
  utils/
Do not place all logic in a single page file. Keep Route Handlers (api/) and Server Actions clean and isolated.

12. DESIGN SYSTEM & VISUAL RULES
Visual style:

Minimal, Architectural, Luxury, Editorial, Modern, Timeless.

Avoid:

Generic dashboards, excessive gradients, cluttered layouts, heavy drop shadows, inconsistent spacing.

13. ANIMATION RULES
Use Framer Motion to enhance the "Antigravity" feel.

Animations must be:

Smooth (60/120fps)

Purposeful (guiding the user's eye)

Fast (duration: 0.15s - 0.3s)

Subtle (spring physics over linear easing)

Prefer animating transform (scale, translate) and opacity. NEVER animate width, height, top, or left directly to avoid layout thrashing.

14. SECURITY RULES
Validate all inputs on both Client (Zod) and Server (Zod).

Sanitize user content.

Protect server actions with strict Auth checks.

Keep environment variables secure.

Prevent CSRF and XSS inherently via Next.js and React patterns.

15. TESTING CHECKLIST
Before completing a task verify:

[ ] CRUD operations work flawlessly end-to-end.

[ ] Forms validate correctly (client and server).

[ ] Loading, Error, and Success states are implemented.

[ ] Data persists after a hard page refresh.

[ ] TypeScript compilation passes strictly.

[ ] Native Mobile App Feel (touch targets, bottom sheets, no tap highlights).

[ ] Lighthouse targets pass (100 Desktop, 100 Mobile).

[ ] Zero mock data or placeholder handlers remain.

16. WORKFLOW
Analyze the feature & Database schema.

Implement business logic and types first.

Connect Server Actions and Supabase.

Build the UI (Mobile-first, App-like).

Implement state handling (Loading, Error, Success).

Optimize for Antigravity Performance (Caching, Images, Layout Shift).

Verify SEO, Accessibility, and TypeScript.

Test gestures and touch mechanics on a mobile viewport.

17. FINAL PRINCIPLE
In ERAYDUŞ, a "page" means a fully functional production feature.

UI without working business logic, Supabase persistence, validation, native-mobile mechanics, and antigravity performance optimization is considered unfinished work.

## STORAGE RULES

Use Supabase Storage for all uploaded assets:
- Product images
- Collection images
- Blog images
- PDF proposals
- 3D files
- Videos

Do not configure or use S3-compatible storage unless explicitly requested.
Use next/image with Supabase public URLs for optimized delivery.

## CONTENT EDITOR RULES

Use a block-based content system similar to Gutenberg.

Store page content as structured JSON blocks in Supabase JSONB columns.
Render blocks using Next.js Server Components.

Never store raw unstructured HTML when a structured block type exists.

Supported blocks:
- hero
- text
- image
- gallery
- video
- cta
- quote
- product_showcase
- comparison_table
- faq

All rendered content must be SEO-friendly, semantic, and optimized for Lighthouse 95+ mobile performance.