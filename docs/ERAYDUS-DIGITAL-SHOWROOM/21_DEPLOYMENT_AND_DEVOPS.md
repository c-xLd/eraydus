# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
## 21_DEPLOYMENT_AND_DEVOPS.md

Version: 1.0

---

# PURPOSE

This document defines the deployment, infrastructure, DevOps, monitoring and maintenance strategy for the ERAYDUŞ Digital Experience Platform.

The objective is to ensure reliable, secure and scalable production deployments with minimal downtime.

---

# ENVIRONMENTS

Development

Purpose:
Local development.

Branch:
feature/*

URL:
localhost

---

Staging

Purpose:
Internal testing and QA.

Branch:
develop

URL:
staging.eraydus.com

Mirror production as closely as possible.

---

Production

Purpose:
Public website.

Branch:
main

URL:
www.eraydus.com

---

# INFRASTRUCTURE

Frontend

Next.js

Hosting

Vercel

Database

Supabase PostgreSQL

Authentication

Supabase Auth

Storage

Supabase Storage

CDN

Cloudflare

DNS

Cloudflare

Email

Resend

Analytics

Google Analytics 4

PostHog

Microsoft Clarity

Error Monitoring

Sentry

Uptime Monitoring

Better Stack or UptimeRobot

---

# DEPLOYMENT FLOW

Developer pushes code

↓

GitHub

↓

Automatic CI

↓

Tests

↓

Build

↓

Lint

↓

Type Check

↓

Deploy Preview

↓

Approval

↓

Production Deployment

---

# GITHUB BRANCHES

main

Production

develop

Staging

feature/*

New Features

hotfix/*

Critical Fixes

release/*

Release Preparation

---

# CI/CD CHECKLIST

Every deployment must:

Run TypeScript checks.

Run ESLint.

Run Unit Tests.

Run Integration Tests.

Run Build.

Verify Environment Variables.

Verify Database Connection.

Verify SEO Metadata.

Generate Sitemap.

Generate Robots.txt.

Generate Static Assets.

---

# ENVIRONMENT VARIABLES

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

DATABASE_URL

RESEND_API_KEY

WHATSAPP_API_KEY

GOOGLE_MAPS_API_KEY

GOOGLE_ANALYTICS_ID

POSTHOG_KEY

SENTRY_DSN

Never expose server-only keys to the client.

---

# DATABASE MIGRATIONS

All schema changes must use migrations.

Never edit production database manually.

Every migration must be reversible.

Backup before applying production migrations.

---

# BACKUP STRATEGY

Daily automatic backups.

Weekly snapshots.

Monthly archive.

Point-in-time recovery enabled.

Backup verification monthly.

---

# ROLLBACK STRATEGY

Every deployment must support rollback.

If deployment fails:

Restore previous deployment.

Restore previous migration if required.

Notify administrators.

Generate incident report.

---

# SECURITY

HTTPS enforced.

HSTS enabled.

Rate limiting.

Secure Headers.

Content Security Policy.

XSS Protection.

CSRF Protection.

Secret rotation every 90 days.

2FA for administrators.

---

# MONITORING

Monitor:

Website availability

API response times

Database performance

Error rates

Core Web Vitals

Traffic spikes

Storage usage

CPU usage

Memory usage

Realtime alerts for critical failures.

---

# LOGGING

Log:

Authentication

Quote requests

Configurator events

Admin actions

Media uploads

Errors

Warnings

Security events

Store logs securely.

Retain logs according to company policy.

---

# IMAGE OPTIMIZATION

Automatically convert uploads to:

AVIF

WebP

Generate multiple sizes.

Lazy load images.

Serve via CDN.

---

# PDF GENERATION

Generate PDFs server-side.

Store generated PDFs securely.

Expire temporary files automatically.

---

# EMAIL DELIVERY

Transactional emails only.

Retry failed deliveries.

Track delivery status.

Log failures.

---

# PERFORMANCE TARGETS

Lighthouse

95+

TTFB

< 500ms

LCP

< 2s

CLS

< 0.1

INP

< 200ms

---

# CACHE STRATEGY

Static pages

ISR

Dynamic content

Server caching

Images

CDN caching

API responses

Appropriate cache headers

---

# DISASTER RECOVERY

Database recovery documented.

Deployment rollback documented.

DNS recovery documented.

Backup restoration tested.

Recovery Time Objective (RTO)

< 1 hour

Recovery Point Objective (RPO)

< 15 minutes

---

# DEPENDENCY MANAGEMENT

Review dependencies monthly.

Update security patches immediately.

Avoid abandoned packages.

Monitor vulnerabilities automatically.

---

# DOMAIN MANAGEMENT

Primary

www.eraydus.com

Redirect

eraydus.com → www.eraydus.com

HTTPS mandatory.

Canonical domain configured.

---

# MONITORING DASHBOARD

Include:

Deployment status

Database health

API health

Traffic

Errors

Performance

Quote requests

Storage usage

Analytics overview

---

# RELEASE CHECKLIST

Before production deployment:

✔ All tests passed

✔ Accessibility verified

✔ Responsive verified

✔ SEO verified

✔ Analytics working

✔ WhatsApp flow tested

✔ Configurator tested

✔ Admin panel tested

✔ Database backup completed

✔ Environment variables verified

✔ Sitemap generated

✔ Robots.txt verified

✔ Structured data validated

✔ Performance targets achieved

---

# FINAL PRINCIPLE

Deployments must be predictable, reversible and observable.

The platform should be capable of continuous delivery without compromising stability, security or performance.

Every release should increase confidence—not risk.

END OF DOCUMENT