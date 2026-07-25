# Bolt's Performance Journal

This is Bolt's performance journal. Here we record CRITICAL learnings, codebase-specific performance patterns, and unexpected outcomes to build faster, smoother, weightless applications.

## 2026-07-25 - [Debouncing Search Input in Collections List to optimize INP]
**Learning:** In a highly interactive search and filter grid (like `CollectionsClient.tsx`), updating the filter query immediately on every keystroke triggers expensive list re-computations and re-renders on the main thread, resulting in high Interaction to Next Paint (INP) latency.
**Action:** Decouple the text input's immediate value (`localSearchQuery`) from the filtered search query (`searchQuery`), and use a debounced `useEffect` (e.g., 200ms) to update the heavy filtering logic. This ensures instant typing responsiveness and a fluid "Antigravity UX" on all viewports.
