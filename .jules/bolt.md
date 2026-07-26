## 2026-03-01 - Decoupled Search Inputs
**Learning:** Large client-side listings (such as product and collections managers) experience layout thrashing, component re-renders, and input lag if list-filtering or SEO score recalculations run synchronously on every keystroke.
**Action:** Decouple the local input state (`localSearchQuery`) from the filter execution state (`searchQuery`) and apply a 200ms debounce using `useEffect`. This ensures smooth native-app typing feedback and significantly reduces performance penalties from complex filter mappings.
