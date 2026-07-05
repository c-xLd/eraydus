# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
## 20_CODE_STANDARDS.md

Version: 1.0

---

# PURPOSE

This document defines the mandatory coding standards for the entire ERAYDUŞ Digital Experience Platform.

Every contributor, AI assistant and developer must follow these standards without exception.

The primary goals are:

- Maintainability
- Scalability
- Readability
- Performance
- Security
- Consistency
- Accessibility
- Production readiness

---

# CORE PRINCIPLES

Write code for humans first.

Optimize only when necessary.

Prefer clarity over cleverness.

Avoid unnecessary abstractions.

Every line of code should have a purpose.

---

# TYPESCRIPT

Enable Strict Mode.

Never use `any`.

Prefer `unknown` when necessary.

Use explicit return types for exported functions.

Use interfaces for object contracts.

Use type aliases for unions and utility types.

Avoid type assertions unless unavoidable.

Prefer readonly properties where applicable.

---

# REACT

Use Functional Components only.

Never use Class Components.

Prefer Server Components by default.

Use Client Components only when interaction requires them.

Keep components focused on a single responsibility.

Avoid prop drilling.

Prefer composition over inheritance.

---

# NEXT.JS

Use App Router.

Prefer Server Actions over REST APIs where appropriate.

Use Route Handlers only when external API endpoints are required.

Use Metadata API for SEO.

Use Image component for images.

Use Link component for navigation.

Implement streaming and Suspense where beneficial.

---

# FILE ORGANIZATION

One component per file.

One hook per file.

One exported component per file.

Keep related files together inside their feature.

Avoid deeply nested folders.

---

# NAMING CONVENTIONS

Components

PascalCase

Example

ProductCard.tsx

Hooks

camelCase with use prefix

Example

useConfigurator.ts

Utilities

camelCase

Example

formatPrice.ts

Constants

SCREAMING_SNAKE_CASE

Example

MAX_UPLOAD_SIZE

Database tables

snake_case

Example

quote_requests

Routes

kebab-case

Example

measurement-guide

---

# COMPONENT GUIDELINES

Maximum practical length: ~300 lines.

Extract repeated UI into reusable components.

Extract business logic into hooks or services.

Keep JSX clean and readable.

Avoid deeply nested conditionals.

---

# STYLING

Use Tailwind CSS.

Do not write inline styles unless absolutely necessary.

Use design tokens.

Never hardcode colors, spacing or typography values.

Prefer utility classes.

Use CSS variables for theme values.

---

# SHADCN/UI

Use Shadcn/UI as the component foundation.

Customize components to match the ERAYDUŞ design system.

Never ship default styles unchanged.

---

# STATE MANAGEMENT

Server State

TanStack Query

Authentication

Supabase Auth

UI State

React Context

Component State

useState

Avoid global state unless required.

---

# FORMS

Use React Hook Form.

Validate with Zod.

Validate on both client and server.

Display user-friendly validation messages.

Prevent duplicate submissions.

---

# DATA FETCHING

Prefer Server Components.

Use caching where appropriate.

Avoid unnecessary client-side fetching.

Use pagination for large datasets.

Implement optimistic updates when appropriate.

---

# PERFORMANCE

Use lazy loading for heavy components.

Optimize images with Next/Image.

Use dynamic imports for large libraries.

Memoize expensive calculations.

Avoid unnecessary re-renders.

Virtualize large lists.

Meet Core Web Vitals targets:

- LCP < 2s
- CLS < 0.1
- INP < 200ms

---

# ACCESSIBILITY

Comply with WCAG AA.

Use semantic HTML.

Provide ARIA labels where needed.

Ensure keyboard navigation.

Visible focus states are mandatory.

Support reduced motion preferences.

Minimum touch target: 44px.

---

# SEO

Use semantic HTML.

Implement structured data (JSON-LD).

Generate unique metadata.

Use canonical URLs.

Implement Open Graph and Twitter Cards.

Generate XML sitemaps.

Optimize internal linking.

---

# SECURITY

Validate all inputs.

Sanitize user-generated content.

Never expose secrets to the client.

Use environment variables.

Protect against:

- XSS
- CSRF
- SQL Injection
- Rate abuse

Implement role-based authorization.

Log security-sensitive events.

---

# ERROR HANDLING

Use Error Boundaries.

Handle expected and unexpected errors gracefully.

Display meaningful messages.

Never expose stack traces to users.

Log server errors.

---

# LOGGING

Log:

Authentication events

Quote creation

Configuration changes

Admin actions

SEO updates

Media uploads

Errors

Warnings

Use structured logs.

---

# TESTING

Write:

Unit Tests

Integration Tests

End-to-End Tests

Accessibility Tests

Performance Tests

Visual Regression Tests

Use Vitest and Playwright.

---

# GIT

Use feature branches.

Write meaningful commit messages.

Follow Conventional Commits.

Examples:

feat(configurator): add live pricing

fix(blog): resolve image loading issue

refactor(seo): simplify metadata generation

---

# DOCUMENTATION

Document exported utilities.

Document complex business logic.

Keep README files up to date.

Update documentation when behavior changes.

---

# CODE REVIEW CHECKLIST

Before merging:

- Code builds successfully.
- No TypeScript errors.
- No ESLint warnings.
- Tests pass.
- Accessibility verified.
- Performance impact reviewed.
- Security reviewed.
- SEO reviewed.
- Responsive behavior verified.
- Documentation updated if needed.

---

# AI DEVELOPMENT RULES

When AI generates code:

- Never generate placeholder functionality.
- Never leave TODO comments for critical features.
- Generate production-ready implementations.
- Prefer reusable abstractions.
- Respect all design tokens.
- Respect folder structure.
- Respect naming conventions.
- Respect accessibility requirements.
- Respect performance targets.
- Respect SEO architecture.

---

# DEPENDENCY MANAGEMENT

Prefer stable, well-maintained libraries.

Avoid unnecessary dependencies.

Review bundle impact before adding packages.

Keep dependencies up to date.

---

# FINAL PRINCIPLE

Every commit should improve the platform.

Every file should be understandable.

Every component should be reusable.

Every feature should be scalable.

Every implementation should be production-ready.

The ERAYDUŞ Digital Experience Platform must reflect the same level of precision, craftsmanship and quality in its codebase as it does in its visual design.