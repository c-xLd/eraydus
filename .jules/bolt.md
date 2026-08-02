## 2026-03-01 - [Avoid Nested Helper Components Rendered as JSX Tags]
**Learning:** Defining helper render functions inside React/Next.js components and rendering them as JSX tags (e.g., `<FilterContent />`) causes React to see a completely new component type on every parent render. This triggers complete DOM subtree unmounting and remounting, resulting in lost input focus, reset state, and severe layout thrashing.
**Action:** Inline the JSX directly or invoke the helper directly as a function `{FilterContent()}` instead of as a tag `<FilterContent />`.
