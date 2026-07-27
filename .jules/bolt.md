# Bolt's Performance Journal

## 2025-07-27 - [Debounced Search Filtering & Component Recreation Anti-Pattern]
**Learning:** In Next.js client-side lists/katalogs, binding search inputs directly to both `URLSearchParams` (via instantaneous `router.replace`) and component state causes severe layout thrashing and typing lag (ruining INP). Furthermore, nesting a helper render component (like `FilterContent`) inside a parent client component and rendering it as `<FilterContent />` instead of calling it as a function `{FilterContent()}` causes React to recreate the component type on every render. This forces React to unmount/remount the DOM, losing input focus and causing severe performance degradation.
**Action:** Decouple search input into `localSearchQuery` and `searchQuery`, applying a 300ms debounce before updating URL params and filtering. Additionally, invoke nested render functions directly as `{FilterContent()}` to prevent unmounting and maintain DOM/focus state.
