# Bolt's Performance Journal

## 2025-02-15 - Initial setup
**Learning:** Establishing the journal.
**Action:** Always maintain and consult this journal for codebase-specific optimizations.

## 2025-02-15 - Inline Component Rendering Anti-pattern in Product Filters
**Learning:** Defining helper components inline and rendering them via JSX tags (e.g., `const FilterContent = () => ...` and `<FilterContent />`) causes React to treat the component as a completely new type on every render. This triggers complete DOM unmounting and remounting of the entire subtree on every single filter selection or slider movement. This destroys focus, resets local input states, causes heavy layout thrashing, and severely degrades Interaction to Next Paint (INP) metrics.
**Action:** Return JSX directly from parent components, or call the helper function directly (e.g., `{renderFilterContent()}`), or define the subcomponent completely outside of the parent component to preserve stable component references.
