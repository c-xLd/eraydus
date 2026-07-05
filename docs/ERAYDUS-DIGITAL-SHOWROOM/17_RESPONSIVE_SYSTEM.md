# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
## 17_RESPONSIVE_SYSTEM.md

Version 1.0

---

# PURPOSE

This document defines the responsive behavior of the entire ERAYDUŞ Digital Experience Platform.

Responsive design is not an afterthought.

Every page must be designed Mobile First while preserving the premium desktop experience.

No feature may disappear simply because the screen is smaller.

The experience must remain consistent across all devices.

---

# TARGET DEVICES

Small Mobile

320px

iPhone SE

360px

Standard Mobile

390px

Large Mobile

430px

Small Tablet

768px

Tablet Landscape

1024px

Laptop

1280px

Desktop

1440px

Large Desktop

1728px

Ultra Wide

1920px+

---

# BREAKPOINTS

xs
320px

sm
640px

md
768px

lg
1024px

xl
1280px

2xl
1536px

3xl
1920px

Never use random breakpoints.

---

# GRID SYSTEM

Mobile

4 Columns

Tablet

8 Columns

Desktop

12 Columns

Maximum Content Width

1440px

Use fluid containers.

---

# SPACING

Spacing scales proportionally.

Never reduce spacing below readability.

Use clamp() for spacing whenever appropriate.

---

# TYPOGRAPHY

Desktop Heading XL

72px

Tablet

56px

Mobile

40px

Body

Desktop

18px

Mobile

16px

Never make text smaller than 16px.

---

# NAVIGATION

Desktop

Transparent Glass Navbar

Mega Menu

Search

Configurator CTA

WhatsApp CTA

Tablet

Collapsed Navigation

Search

Configurator

Mobile

Hamburger Menu

Bottom Sticky WhatsApp

Sticky Configurator Button

Large touch targets

---

# HERO SECTION

Desktop

Split Layout

Video Background

Floating Cards

Tablet

Simplified layout

Large headline

Mobile

Single Column

Optimized video

Reduced motion

Centered content

CTA always visible

---

# PRODUCT GRID

Desktop

4 Cards

Tablet

2 Cards

Mobile

1 Card

Cards keep the same proportions.

---

# PRODUCT PAGE

Desktop

Gallery Left

Information Right

Sticky Summary

Tablet

Gallery Top

Details Below

Mobile

Vertical Layout

Sticky Bottom Price Bar

WhatsApp Button Always Visible

---

# CONFIGURATOR

Desktop

Three Columns

Left

Configuration

Center

3D Viewer

Right

Summary

Tablet

Two Columns

Viewer Top

Configuration Bottom

Mobile

Single Column

Sticky Bottom Summary

Always visible price

Always visible WhatsApp

Never hide important actions.

---

# BUTTONS

Desktop Height

56px

Mobile Height

52px

Minimum Touch Area

44px

Buttons span full width on mobile where appropriate.

---

# FORMS

Single column on mobile.

Two columns on desktop.

Numeric keyboards for measurements.

Phone keyboard for phone fields.

Auto-complete enabled.

---

# TABLES

Desktop

Full Table

Tablet

Horizontal Scroll

Mobile

Card Layout

Never break readability.

---

# GALLERY

Desktop

Masonry Grid

Tablet

2 Columns

Mobile

Swipe Carousel

Pinch to Zoom

---

# BLOG

Desktop

Sidebar TOC

Tablet

Collapsible TOC

Mobile

Sticky Reading Progress

Optimized typography

---

# FOOTER

Desktop

4 Columns

Tablet

2 Columns

Mobile

Accordion Sections

Large spacing

---

# IMAGES

Always responsive.

Use srcset.

Use sizes attribute.

Prefer AVIF.

Fallback WebP.

Lazy load below the fold.

---

# PERFORMANCE

Never load desktop assets on mobile.

Serve responsive images.

Lazy load videos.

Dynamic imports.

Reduce animation complexity on low-power devices.

---

# MOBILE UX

Bottom sticky actions.

Swipe gestures.

Native feeling scrolling.

Large tap targets.

No hover-only interactions.

Support safe-area insets.

Prevent accidental taps.

---

# ACCESSIBILITY

Keyboard support on tablets.

Screen reader labels.

Focus indicators.

Reduced Motion.

High contrast support.

Landscape support.

---

# TESTING MATRIX

Test every page on:

320px

360px

390px

430px

768px

820px

1024px

1280px

1440px

1728px

1920px

No horizontal scrolling.

No overlapping elements.

No cropped text.

No inaccessible controls.

---

# FINAL PRINCIPLE

The mobile experience must never feel like a reduced version of the desktop website.

It should feel intentionally designed, equally premium and optimized for touch interactions.

Every device should deliver the same ERAYDUŞ brand experience.