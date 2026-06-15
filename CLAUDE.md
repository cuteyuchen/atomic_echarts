# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

atomic-echarts is a Vue 3 composable (hook) library for ECharts, focused on hydrology and meteorology chart visualizations (water levels, flow rates, rainfall, river cross-sections). Published as an npm package with `vue ^3.0.0` and `echarts ^6.0.0` as peer dependencies.

## Common Commands

```bash
npm run dev              # Start example app dev server at http://localhost:3000
npm run build            # Compile TypeScript (tsc) to dist/
npm run publish-flat     # Build + flatten to temp-publish/ + npm publish
npm run publish-flat-dry # Same as above with --dry-run
```

No test framework, linter, or formatter is configured.

## Build System

The library uses **`tsc` directly** (not Vite library mode). `vite.config.ts` only serves the example app rooted at `example/`. The publish strategy uses a flat-publish pattern: `scripts/prepare-publish.cjs` copies `dist/` into `temp-publish/` with corrected entry paths so consumers import from `atomic-echarts` without a `dist/` prefix.

## Architecture

Three-layer composable design:

1. **Types** (`src/types/index.ts`) — Central type definitions extending ECharts types with domain-specific fields (`commonOptions` adds `textColor`, `lineColor`, `theme`).
2. **Config** (`src/config/`) — Stateless factory functions producing ECharts option fragments. Series, axes, and marks are composed independently.
3. **Hooks** (`src/hooks/`) — Higher-level composables wiring configs into complete chart options. Each hook returns `{ getEchartsOptions }`.

### Reactive Theme System

- `ECHART_COLOR` is a Vue `reactive()` object holding per-theme color palettes (light/dark).
- `setGlobalColor()` mutates it via `Object.assign`; all dependent charts update automatically.
- `useEchartsThemeColor()` returns `computed()` refs tracking current theme colors.
- All hooks accept `Theme | Ref<Theme>` — passing a `Ref` keeps colors reactive.

### Deep Merge

- `mergeDeep()` — standard recursive merge (arrays replaced entirely).
- `mergeEchartsOption()` — ECharts-aware merge where arrays are merged **by index** (so `series[0]` in custom options merges with `series[0]` in defaults, not replaces the whole array).

## Key Conventions

- Hooks: `use*Echarts` naming (Vue composable convention).
- Config factories: `useGet*` / `useCommon*` naming.
- Constants: UPPER_SNAKE_CASE (`LIGHT_COLOR`, `ECHART_COLOR`).
- All code comments and documentation are in Chinese (Simplified).
- Domain-specific string literals use Chinese (series names: `'水位'`, `'流量'`, `'降雨'`).
- Example components in `example/components/` follow an identical pattern: accept `theme` prop → call hook → `onMounted` + `watchEffect` for reactive chart lifecycle.

## Path Aliases

In development, `vite.config.ts` maps:
- `@` → `src/`
- `atomic-echarts` → `src/index.ts`

The example app's `tsconfig.json` extends the root and adds the same `atomic-echarts` alias.
