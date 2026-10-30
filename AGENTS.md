# Wanderlust

Single Next.js 16.4.3 (App Router, `src/` layout) + React 19 app. No monorepo, no tests, no CI.

Real app code is only `src/app/layout.tsx` and `src/app/page.tsx` (a 7-line stub). Everything under `src/components/ui/` (~63 files), `src/hooks/`, and `src/lib/` is an installed shadcn/shiki UI kit — none of it is wired into the app yet, so don't assume a component is used just because it exists.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- Dev: `npm run dev` (Turbopack). Build: `npm run build` (Turbopack; also runs TypeScript). Lint: `npm run lint` (bare `eslint`, flat config in `eslint.config.mjs`).
- No typecheck script — run `npx tsc --noEmit` yourself. It only passes after `next build` or `next dev` has run once: `next-env.d.ts` imports `.next/types/routes.d.ts`, which doesn't exist on a fresh clone, and layouts/pages use generated globals like `LayoutProps<"/">` instead of hand-written prop types.
- No test framework installed — don't invent one; verify with `npx tsc --noEmit` + `npm run build`.
- `npm run lint` currently exits 1 with 2 **pre-existing** errors (`react-hooks/set-state-in-effect`) in generated files `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Don't treat those as your regression — just don't add new ones.

## Gotchas

- **Shadcn components are Base UI, not Radix.** Files in `src/components/ui/` import primitives from `@base-ui/react/*` (`@base-ui/react/avatar`, `/merge-props`, `/use-render`), not from any radix packages; there is no `radix-ui` dependency.
- These components use the npm `cn` package (`import { cn } from "cn"`) with `cva` for variants; `src/lib/utils.ts` merely re-exports it, so `@/lib/utils` also resolves. Follow the direct `cn` pattern in new `components/ui` files.
- Add new shadcn components via `npx shadcn add <component>` (style `base-luma` in `components.json`; `shadcn` is a local dependency) rather than hand-rolling.
- **Tailwind v4 — no config file.** `src/app/globals.css` holds the `@import "tailwindcss"`, `@import "shadcn/tailwind.css"`, design tokens, and the `@theme inline` block; style there, not in a nonexistent `tailwind.config.*`. CSS is compiled by the `@tailwindcss/turbopack` rule in `next.config.ts`.
- Path alias is `@/*` → `src/*` (`tsconfig.json` paths).
- `reactCompiler: true` is on in `next.config.ts`: avoid manual `useMemo`/`useCallback`/memoization patterns; components are auto-memoized by `babel-plugin-react-compiler`.