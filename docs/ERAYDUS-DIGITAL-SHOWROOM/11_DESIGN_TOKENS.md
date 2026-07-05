# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
## 11_DESIGN_TOKENS.md

Version: 1.0

---

# PURPOSE

This document defines the single source of truth for all visual design tokens used across the ERAYDUŞ Digital Experience Platform.

Every page.

Every component.

Every animation.

Every spacing.

Every color.

Every shadow.

Everything must use these tokens.

Hardcoded values should be avoided unless absolutely necessary.

---

# DESIGN PHILOSOPHY

Luxury through simplicity.

Architecture through precision.

Premium through consistency.

Whitespace is a design element.

Glass is a brand element.

Motion is a communication tool.

---

# COLOR TOKENS

## Neutral

--background: #FFFFFF

--background-secondary: #F8F8F6

--surface: #F2F2F2

--surface-elevated: #FCFCFC

--surface-dark: #111111

--surface-black: #090909

---

## Typography

--text-primary: #111111

--text-secondary: #5F6368

--text-muted: #8B9098

--text-inverse: #FFFFFF

---

## Borders

--border-light: #ECECEC

--border-default: #DDDDDD

--border-dark: #BFBFBF

---

## Premium Accent

--accent-black: #111111

--accent-white: #FFFFFF

--accent-champagne: #C9A86A

--accent-platinum: #BFC5CB

--accent-bronze: #8F6B4F

--accent-glass: rgba(255,255,255,0.55)

---

## Status

--success

--warning

--danger

--info

Keep these soft.

Never use highly saturated colors.

---

# TYPOGRAPHY

Primary Font

Geist

Fallback

Inter

System UI

---

# Font Weights

300

400

500

600

700

---

# Font Scale

Display XL

96px

Display L

72px

Display

64px

Heading XL

56px

Heading L

48px

Heading M

40px

Heading S

32px

Title

24px

Subtitle

20px

Body Large

18px

Body

16px

Caption

14px

Label

12px

---

# LINE HEIGHT

Display

1.0

Heading

1.1

Body

1.7

Caption

1.5

---

# LETTER SPACING

Large Headlines

-0.03em

Titles

-0.02em

Body

0

Buttons

0.02em

---

# SPACING SCALE

4

8

12

16

20

24

32

40

48

56

64

80

96

120

160

200

240

320

Never invent spacing values.

---

# BORDER RADIUS

XS

8px

Small

12px

Medium

20px

Large

28px

XL

36px

Pill

999px

---

# SHADOW TOKENS

Soft

Cards

Floating Panels

Dialogs

Navigation

Image Overlay

Glass

Luxury Elevation

Use layered shadows.

Avoid hard shadows.

---

# GLASS TOKENS

Background Blur

12px

Glass Opacity

55%

Border Opacity

18%

Reflection Opacity

8%

Use glass sparingly.

Premium.

Never excessive.

---

# BLUR

Small

8px

Medium

16px

Large

24px

Hero Overlay

40px

---

# OPACITY

Disabled

40%

Muted

60%

Overlay

75%

Glass

55%

---

# GRID

Desktop

12 Columns

Container

1440px

Content Width

1320px

Tablet

8 Columns

Mobile

4 Columns

---

# BREAKPOINTS

360

480

640

768

1024

1280

1440

1600

1920

2560

---

# Z INDEX

Base

0

Dropdown

100

Sticky

200

Navbar

300

Drawer

400

Modal

500

Toast

600

Fullscreen

999

---

# ICON SIZE

XS

16

S

20

M

24

L

32

XL

48

XXL

64

---

# BUTTON SIZE

Small

40px

Medium

48px

Large

56px

Hero

64px

---

# INPUT SIZE

Height

56px

Padding

20px

Radius

20px

---

# CARD TOKENS

Product Card

Large

Floating

Glass Border

Rounded

32px

Collection Card

Editorial Layout

Feature Card

Minimal

Review Card

Soft Background

Blog Card

Magazine Style

---

# IMAGE RATIO

Square

1:1

Portrait

4:5

Landscape

16:9

Hero

21:9

Gallery

3:2

---

# ANIMATION TOKENS

Instant

100ms

Fast

180ms

Default

260ms

Premium

420ms

Reveal

700ms

Hero

1200ms

---

# EASING

Use only

easeOutQuart

easeOutExpo

easeInOutQuart

easeInOutCubic

---

# CURSOR

Default

Arrow

Interactive

Pointer

Gallery

Zoom

Video

Play

Configurator

Crosshair

---

# LOADING

Skeleton

Fade

Shimmer

Never spinner-only.

---

# RESPONSIVE RULES

Desktop First

Fluid Containers

Clamp Typography

Flexible Grid

Touch Friendly

Safe Area Support

---

# DARK MODE

Do not invert colors.

Design dark mode independently.

Use:

Deep charcoal backgrounds.

Soft white typography.

Reduced contrast.

Premium glass.

Minimal glow.

---

# ACCESSIBILITY TOKENS

Minimum touch area

44px

Minimum contrast

WCAG AA

Visible focus ring

Required

Keyboard navigation

Required

Reduced motion

Supported

---

# COMPONENT RULES

Every component must consume these tokens.

Never hardcode:

Colors

Radius

Spacing

Typography

Shadows

Animation Duration

Opacity

Blur

Transitions

---

# DEVELOPMENT RULES

Use CSS Variables.

Expose tokens to Tailwind.

Keep naming semantic.

Centralize updates.

Avoid duplicate values.

Support future themes.

Support white-label architecture.

---

# FUTURE EXPANSION

Prepare token system for:

AR Configurator

3D Viewer

Dealer Portal

Architect Portal

Multi-language

Multi-brand

Native Mobile App

Apple Vision Pro

---

# FINAL PRINCIPLE

The Design Token System is the foundation of the entire ERAYDUŞ ecosystem.

Changing a token should update the experience consistently across every page, every component and every interaction.

The platform must feel like one carefully crafted premium product—not a collection of unrelated pages.