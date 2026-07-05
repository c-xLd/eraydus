# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
## 10_ANIMATION_LIBRARY.md

Version: 1.0

---

# PURPOSE

This document defines every animation, transition, interaction and motion behavior used across the ERAYDUŞ Digital Experience Platform.

Motion is part of the brand identity.

Animations must communicate craftsmanship, precision and luxury.

The website should feel effortless.

Visitors should remember the smoothness of the experience without consciously noticing the animations.

---

# MOTION PHILOSOPHY

Motion should never exist for decoration.

Every animation must have a purpose.

Every transition should improve understanding.

Every interaction should provide visual feedback.

Never surprise the user.

Never interrupt the user.

Never slow down navigation.

Motion must feel calm, confident and premium.

---

# DESIGN REFERENCES

Apple

Apple VisionOS

Tesla

Porsche Design

Nothing

Stripe

Linear

Framer

Vercel

Rimadesio

Boffi

Poliform

---

# PERFORMANCE REQUIREMENTS

Animations must always run at 60 FPS.

Use GPU acceleration whenever possible.

Animate only:

Opacity

Transform

Scale

Rotate

Translate

Blur (sparingly)

Avoid animating:

Width

Height

Top

Left

Margin

Padding

Box Shadow (heavy)

Filter (heavy)

---

# GLOBAL TIMING

Instant

100ms

Fast

180ms

Normal

260ms

Premium

420ms

Storytelling

700ms

Hero Reveal

1200ms

---

# EASING

Only use smooth easing.

Preferred curves:

easeOutQuart

easeInOutQuart

easeOutExpo

easeInOutCubic

Avoid:

Bounce

Elastic

Overshoot

Spring effects that feel playful

---

# PAGE LOAD

Sequence

1. White background

2. Logo fade in

3. Navigation appears

4. Hero video loads

5. Headline reveals line by line

6. Subtitle fades in

7. CTA buttons appear

8. Scroll indicator pulses

Target duration

1.8 seconds

---

# PAGE TRANSITIONS

Every page transition should feel seamless.

Fade

Opacity

Scale 0.98 → 1

Duration

350ms

Scroll position should reset smoothly.

---

# NAVIGATION

Transparent at top.

Glass effect after scroll.

Blur increases gradually.

Logo scales slightly.

Menu items fade.

Mobile menu slides from right.

---

# HERO SECTION

Background video starts silently.

Headline reveals word by word.

Buttons fade upward.

Glass reflections move slowly.

Scroll indicator pulses every 2.5 seconds.

---

# SECTION REVEAL

Each section animates only once.

Animation:

Opacity 0 → 1

TranslateY 40px → 0

Duration

700ms

Delay

80ms between child elements

---

# CARD ANIMATIONS

Hover

Lift 8px

Scale 1.02

Border brightens

Reflection moves

Click

Scale 0.98

Release smoothly

---

# PRODUCT CARD

Hover

Image zoom 1.04

Price fades in

Configure button slides upward

Shadow softens

Glass reflection shifts

---

# IMAGE REVEAL

Lazy loaded.

Fade

Scale

Mask reveal

Never pop into view instantly.

---

# GALLERY

Hover starts silent cinematic video preview.

Click opens fullscreen viewer.

Close animation

Fade + Scale

---

# BUTTONS

Hover

Lift

Soft glow

Reflection movement

Click

Compression

Release

Loading

Spinner

Disabled

Opacity only

---

# FORM ELEMENTS

Focus

Border brightens

Label floats

Helper text appears

Validation

Green check

Red warning

Animated smoothly

---

# CONFIGURATOR

Changing Glass

Glass opacity changes gradually.

Reflection updates.

Refraction changes.

Changing Color

Metal surface morphs.

Changing Dimensions

Model scales smoothly.

Price

Animated counting.

Summary updates without reload.

---

# PRICE PANEL

Price changes

Count animation.

Highlight changed values.

Flash subtle accent.

Never blink.

---

# FAQ

Accordion expands naturally.

Height animation.

Opacity transition.

Chevron rotates 180°.

---

# BLOG

Reading progress bar.

Images zoom slightly on scroll.

Headings reveal softly.

Quote blocks fade.

---

# TESTIMONIALS

Cards slide horizontally.

Customer photos fade.

Video previews autoplay on hover.

---

# BEFORE / AFTER

Slider follows cursor.

Smooth interpolation.

No snapping.

Touch support.

---

# PARALLAX

Use subtle depth.

Maximum movement

40px

Never aggressive.

Applies to:

Hero

Gallery

Project Showcase

Background Images

---

# CURSOR

Desktop only.

Custom cursor.

Hover Product

Expand.

Hover Button

Magnetic.

Hover Gallery

Zoom icon.

Hover Video

Play indicator.

---

# SCROLL PROGRESS

Thin progress line.

Top of page.

Premium easing.

---

# LOADING STATES

Skeleton animations.

Fade.

Shimmer.

No spinning screens.

No blocking overlays.

---

# SUCCESS STATES

Check animation.

Fade.

Confetti is NOT allowed.

Celebrate subtly.

---

# ERROR STATES

Shake animation

Maximum 4px

One time only

Display friendly message

Offer retry

---

# MODALS

Backdrop blur.

Fade in.

Scale

0.95 → 1

Close

Reverse animation.

---

# DRAWERS

Slide smoothly.

Never cover entire screen on desktop.

Respect safe areas on mobile.

---

# MOBILE GESTURES

Swipe gallery.

Pinch zoom.

Drag comparison slider.

Tap animations.

Long press for quick preview.

---

# MICRO INTERACTIONS

Every interactive element provides feedback.

Hover.

Focus.

Tap.

Selection.

Loading.

Completion.

No dead clicks.

---

# REDUCED MOTION

Respect operating system settings.

Disable non-essential animations.

Keep essential transitions.

Maintain accessibility.

---

# FRAMER MOTION GUIDELINES

Create reusable animation presets.

Examples:

fadeUp

fadeDown

fadeLeft

fadeRight

scaleIn

scaleOut

heroReveal

sectionReveal

cardHover

modalOpen

drawerOpen

priceCount

pageTransition

Use variants instead of repeating animation logic.

---

# TAILWIND GUIDELINES

Prefer utility classes.

Avoid inline styles.

Keep transitions consistent.

Centralize animation durations.

Use CSS variables where appropriate.

---

# SHADCN/UI GUIDELINES

Extend default components.

Never use default styling without customization.

Apply ERAYDUŞ design tokens.

Maintain consistent spacing, radius and typography.

---

# QUALITY CHECKLIST

Every animation must:

Be smooth.

Be intentional.

Support keyboard navigation.

Support touch devices.

Respect accessibility.

Run at 60 FPS.

Feel premium.

Never distract from the product.

---

# FINAL PRINCIPLE

Visitors should not remember the animations individually.

They should remember that the entire experience felt exceptionally refined, effortless and luxurious.

Motion is not an effect.

Motion is part of the ERAYDUŞ brand.
