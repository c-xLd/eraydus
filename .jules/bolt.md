# Bolt's Journal

## 2026-03-24 - Initial Setup
**Learning:** Found that ESLint configs importing `defineConfig` or `globalIgnores` from `eslint/config` causes a module resolution error with ESLint v9 in this package layout, as noted in memory.
**Action:** Keep ESLint config flat without those imports if modifications are required, or resolve issues directly in code without changing the config unnecessarily.
