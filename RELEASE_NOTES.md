# Release Notes – Codebase Updates (current conversation)

Date: [current]

## Highlights
- Centralized navigation metadata and refactored the sidebar to render from config
- Lazy-loaded routes with Suspense fallbacks for faster initial load
- Vietnamese translations fixed (UTF-8) and new i18n keys added
- Optional MSW mocking added (dev + tests)
- Path alias management simplified with `vite-tsconfig-paths`
- Auth persistence cleaned (no localStorage for user)
- Admin routes re-guarded with `ProtectedRoute` + role check
- Docker support with multi-stage build + SPA-ready Nginx
- CI workflow (GitHub Actions) + Husky hooks
- README updates to reflect the new structure and tooling

## Changes

### Navigation & Routing
- Added `src/routes/meta.tsx` for route metadata (labels, paths, icons, roles).
- Refactored `src/layouts/MainLayout/components/Sidebar/SidebarContent.tsx` to render General/Examples/Applications/Admin from metadata.
- Introduced lazy-loaded pages in `src/routes/index.tsx` with `<Suspense fallback={<LoadingSpinner />}>` wrappers.
- Re-enabled admin role guard in router (`<ProtectedRoute allowedRoles={['admin']}>`).
- Added `COLORS` path and included it in `PROTECTED_ROUTES` in `src/constants/routes.ts`.

### i18n
- Fixed Vietnamese locale file encoding and content: `src/locales/vi/translation.json` (fully rewritten).
- Added keys: `errors.noPermission`, `common.goHome`.
- Updated `ProtectedRoute` to use localized strings and `ROUTES.HOME`.

### Utilities & API
- Added `src/utils/api.ts:getApiMessage` and replaced inline helpers in:
  - `src/features/colors/ColorPage.tsx`
  - `src/features/auth/LoginPage.tsx`
- Kept RTK Query as the single HTTP client; removed Axios dependencies.

### Tooling
- Added `vite-tsconfig-paths` plugin to `vite.config.ts` and `vitest.config.ts` and removed manual alias duplication.
- Cleaned `package.json`: removed `axios` and `axios-retry`; added `msw` and `vite-tsconfig-paths` dev deps.
- Added CI: `.github/workflows/ci.yml` (install, lint, test, build).
- Added Husky hooks: `.husky/pre-commit` (lint-staged), `.husky/commit-msg` (basic length check).

### Auth
- Removed `localStorage` user persistence from `src/app/authSlice.ts`. Session hydrates via `/auth/me` in `App.tsx`.

### MSW (Mocking)
- Added MSW handlers and setup:
  - `src/mocks/handlers.ts`, `src/mocks/browser.ts`, `src/mocks/server.ts`
  - `src/tests/setup.ts` starts/stops server per test lifecycle
- Conditional dev mocking in `src/main.tsx` using `VITE_ENABLE_MSW`.
- Updated `.env.example` with `VITE_ENABLE_MSW=false` default.

### Docker
- Added production Dockerfile (multi-stage Node build + Nginx) and `.dockerignore`.
- Added SPA-ready Nginx config: `docker/nginx.conf` (history API fallback to `index.html`).

### Documentation
- README updates:
  - HTTP client is RTK Query only (removed Axios mentions in key sections).
  - Added “Project Structure (Updated)” section.
  - Added MSW and Docker instructions.

## Breaking/Behavioral Notes
- Admin routes now require `user.role === 'admin'` again; ensure `/auth/me` returns an admin role to access `/admin`.
- If you previously relied on Axios, it has been removed; RTK Query baseQuery handles auth headers and token refresh.
- Vietnamese translations replaced; if you had custom strings, re-apply as needed.

## Post-Update Checklist
- Run: `npm install`
- Dev: `npm run dev` (optional: set `VITE_ENABLE_MSW=true` to mock)
- Lint/Test: `npm run lint` and `npm run test:run`
- Docker: `docker build -t react-shop . && docker run -p 8080:80 react-shop`

## Files Touched (non-exhaustive)
- New: `src/utils/api.ts`, `src/routes/meta.tsx`, `src/mocks/*`, `.github/workflows/ci.yml`, `.husky/*`, `Dockerfile`, `.dockerignore`, `docker/nginx.conf`
- Updated: `src/routes/index.tsx`, `src/layouts/MainLayout/components/Sidebar/SidebarContent.tsx`, `src/components/guards/ProtectedRoute/ProtectedRoute.tsx`, `src/locales/en/translation.json`, `src/locales/vi/translation.json`, `src/main.tsx`, `src/features/colors/ColorPage.tsx`, `src/features/auth/LoginPage.tsx`, `src/app/authSlice.ts`, `vite.config.ts`, `vitest.config.ts`, `package.json`, `.env.example`, `README.md`

