# BOLT'S JOURNAL - CRITICAL PERFORMANCE LEARNINGS

## 2026-02-25 - [React Component Unmounting Anti-Pattern & INP Optimization]
**Learning:** Defining helper render components inside parent components (e.g., `const FilterContent = () => ...`) and rendering them as JSX elements (e.g., `<FilterContent />`) causes complete DOM unmounting/remounting on every parent render cycle. This destroys focus, resets input element states, and results in catastrophic typing lag (high INP) as the entire DOM subtree is torn down and rebuilt.
**Action:** Always invoke internal helper render functions directly as simple function calls (e.g., `{FilterContent()}`) or fully refactor them outside of the parent component to preserve React reconciliation, keep DOM nodes stable, and maintain seamless input focus.

## 2026-02-25 - [De-coupling & Debouncing High-Frequency Search Inputs]
**Learning:** Directly filtering lists or triggering state changes that sync with URL query parameters on every keystroke blocks the main thread during fast typing. This increases INP (Interaction to Next Paint) and degrades UI responsiveness.
**Action:** Decouple the text input's immediate value using a `localSearchQuery` state, and debounce its updates to the filtering state (`searchQuery`) with a short delay (e.g., 200ms) to ensure lightweight, lag-free typing interactions.
