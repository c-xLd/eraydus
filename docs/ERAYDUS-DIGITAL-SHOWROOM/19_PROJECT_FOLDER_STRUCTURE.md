# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
## 19_PROJECT_FOLDER_STRUCTURE.md

Version 2.0

---

# PURPOSE

This document defines the official project architecture for the ERAYDUŞ Digital Experience Platform.

The project must be scalable, maintainable and enterprise-ready.

The architecture should follow modern Next.js App Router standards while remaining easy to understand for future developers.

The project should be capable of supporting future applications including:

• Website
• Admin Panel
• Dealer Portal
• Architect Portal
• Customer Portal
• Mobile App
• Vision Pro Experience

without requiring major restructuring.

---

# TECHNOLOGY

Next.js 15

React 19

TypeScript

App Router

TailwindCSS

Shadcn/UI

Framer Motion

Supabase

PostgreSQL

Zod

React Hook Form

TanStack Query

Resend

UploadThing

Vercel

Cloudflare

---

# ROOT STRUCTURE

```
eraydus/

├── app/
├── components/
├── features/
├── services/
├── actions/
├── hooks/
├── lib/
├── types/
├── constants/
├── config/
├── styles/
├── public/
├── content/
├── database/
├── emails/
├── middleware/
├── scripts/
├── tests/
├── docs/
├── supabase/
├── package.json
├── next.config.ts
├── middleware.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

# APP ROUTER

```
app/

(layout.tsx)

page.tsx

loading.tsx

error.tsx

not-found.tsx

globals.css

favicon.ico
```

---

# ROUTES

```
app/

about/

blog/

collections/

configurator/

contact/

faq/

gallery/

products/

projects/

quote/

search/

support/

warranty/

installation/

measurement-guide/

privacy-policy/

cookie-policy/

kvkk/

dashboard/

admin/

architect/

dealer/

api/
```

---

# PRODUCT ROUTES

```
products/

page.tsx

[slug]/

page.tsx

loading.tsx

error.tsx
```

---

# BLOG ROUTES

```
blog/

page.tsx

category/

[tag]/

[slug]/
```

---

# COLLECTION ROUTES

```
collections/

page.tsx

[slug]/
```

---

# CONFIGURATOR

```
configurator/

page.tsx

loading.tsx

success/

shared/

```

---

# ADMIN

```
admin/

dashboard/

products/

collections/

pricing/

quotes/

customers/

projects/

blog/

seo/

analytics/

media/

users/

settings/

audit/
```

---

# COMPONENTS

```
components/

ui/

layout/

shared/

navigation/

animations/

forms/

cards/

tables/

dialogs/

charts/

icons/

typography/

feedback/

media/

seo/
```

---

# FEATURES

Every business feature lives inside the features folder.

```
features/

products/

collections/

configurator/

pricing/

quotes/

customers/

projects/

blog/

analytics/

seo/

search/

auth/

notifications/

media/

dashboard/

admin/
```

Each feature contains:

```
feature/

components/

hooks/

actions/

services/

types/

schemas/

constants/

utils/
```

---

# SERVER ACTIONS

```
actions/

products/

quotes/

configurator/

customers/

blog/

seo/

media/

notifications/
```

---

# SERVICES

```
services/

supabase/

email/

whatsapp/

analytics/

storage/

pdf/

search/

seo/
```

---

# LIB

```
lib/

auth/

db/

logger/

cache/

validation/

helpers/

formatters/

permissions/

security/
```

---

# HOOKS

```
hooks/

useProducts.ts

useConfigurator.ts

usePricing.ts

useQuote.ts

useScroll.ts

useBreakpoint.ts

useDarkMode.ts

useSearch.ts

useSEO.ts
```

---

# TYPES

```
types/

product.ts

quote.ts

customer.ts

configurator.ts

pricing.ts

seo.ts

blog.ts

project.ts

user.ts

api.ts
```

---

# VALIDATION

```
schemas/

product.ts

quote.ts

contact.ts

customer.ts

configurator.ts

seo.ts

blog.ts
```

All schemas must use Zod.

---

# DATABASE

```
database/

migrations/

seed/

functions/

views/

policies/

indexes/
```

---

# SUPABASE

```
supabase/

functions/

migrations/

seed.sql

config.toml
```

---

# EMAILS

```
emails/

quote/

newsletter/

contact/

welcome/

installation/

invoice/
```

Use React Email.

---

# CONTENT

```
content/

blog/

guides/

faq/

seo/

legal/
```

---

# CONFIG

```
config/

navigation.ts

site.ts

seo.ts

theme.ts

analytics.ts

permissions.ts
```

---

# CONSTANTS

```
constants/

routes.ts

roles.ts

permissions.ts

glass.ts

profiles.ts

colors.ts

breakpoints.ts
```

---

# PUBLIC

```
public/

images/

videos/

icons/

logos/

documents/

fonts/

models/

favicons/
```

---

# STYLES

```
styles/

globals.css

tokens.css

animations.css

utilities.css

themes.css
```

---

# MIDDLEWARE

```
middleware/

auth.ts

seo.ts

locale.ts

security.ts

logging.ts
```

---

# TESTS

```
tests/

unit/

integration/

e2e/

performance/

accessibility/

visual/
```

Use Playwright and Vitest.

---

# DOCUMENTATION

```
docs/

PRD/

API/

Database/

SEO/

Deployment/

Components/

Brand/

Development/
```

---

# IMPORT RULES

Allowed

Feature → UI

Feature → Shared

Feature → Services

Feature → Types

Feature → Hooks

Not Allowed

Feature → Another Feature

Avoid circular dependencies.

---

# FILE NAMING

Routes

kebab-case

Components

PascalCase

Hooks

camelCase

Utilities

camelCase

Types

camelCase

Database

snake_case

---

# COMPONENT RULES

One component.

One responsibility.

Maximum 300 lines where practical.

Extract logic into hooks.

Extract business logic into services.

Never place API logic inside UI components.

---

# FEATURE RULES

Every feature must be independent.

Every feature owns:

Components

Hooks

Types

Schemas

Actions

Services

Constants

Utils

---

# STATE MANAGEMENT

Server Data

TanStack Query

Authentication

Supabase Auth

UI State

React Context

Local State

useState

Persistent State

Local Storage

---

# PERFORMANCE

Dynamic Imports

Lazy Loading

Code Splitting

Image Optimization

Suspense

Streaming

Server Components

Partial Prerendering

Caching

Edge Runtime where beneficial

---

# SECURITY

Never expose secrets.

Validate every request.

Sanitize inputs.

Use middleware protection.

Rate limiting.

Permission checks.

Audit logging.

---

# DEPLOYMENT

Production

Vercel

Database

Supabase

Images

Cloudflare R2 (optional)

Monitoring

Sentry

Analytics

Google Analytics

PostHog

Microsoft Clarity

---

# FUTURE APPLICATIONS

Architect Portal

Dealer Portal

Installer App

Inventory System

Production Tracking

CRM

ERP

AI Assistant

Vision Pro Viewer

Native Mobile Apps

The folder structure must support all future modules without restructuring the application.

---

# FINAL PRINCIPLE

The project architecture must feel like a premium enterprise software platform rather than a standard website.

Every folder must have a clear responsibility.

Every feature must remain independent.

Every developer should understand the project within minutes.

Scalability, clarity and maintainability always take priority over shortcuts.