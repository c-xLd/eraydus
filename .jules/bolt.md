# Bolt's Performance Journal

## 2026-08-05 - [Admin Dashboard Search Input Debouncing]
**Learning:** Bind-directly client filtering input is a heavy bottleneck on search inputs in massive client components, degrading Interaction to Next Paint (INP) and causing visible typing lag. Decoupling the input state via `localSearchQuery` and debouncing updates via `useEffect` with a 200ms delay provides a completely fluid typing experience.
**Action:** Always decouple text search input from heavy list-filtering/computational logic, using a local state and debouncing mechanism to process filter criteria.
