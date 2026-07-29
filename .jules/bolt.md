# Bolt's Performance Journal

## 2026-03-05 - [Helper Render Components & Input Focus Loss / INP Lag]
**Learning:** Defining helper render functions/components inside the main component function scope and rendering them as JSX tags (e.g., `<FilterContent />`) causes React to treat them as entirely new component types on every render. This forces a complete DOM unmount and remount, wiping out input focus and state, causing severe layout thrashing, and destroying Interaction to Next Paint (INP) performance.
**Action:** Always invoke interior helper render functions directly as JavaScript expressions (e.g., `{FilterContent()}`) or refactor them out of the parent component to preserve the DOM structure and elements' state across renders. Combine this with debounced states for text inputs to keep the main thread unblocked during typing.
