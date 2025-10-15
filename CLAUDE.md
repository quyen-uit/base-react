# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A production-ready React application with TypeScript, featuring authentication, role-based access control, admin dashboard, internationalization, and comprehensive state management using Redux Toolkit with RTK Query.

## Essential Commands

### Development
```bash
npm run dev              # Start dev server on port 3000
npm run build            # TypeScript compile + Vite build
npm run preview          # Preview production build
```

### Testing
```bash
npm test                 # Run tests in watch mode
npm run test:run         # Run tests once (CI mode)
npm run test:run -- <path>  # Run specific test file (e.g., src/features/profile)
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report (70% threshold enforced)
```

### Code Quality
```bash
npm run lint             # Check for linting issues
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier
```

### Git Hooks
Pre-commit hooks via Husky automatically run ESLint and Prettier on staged files.

## Architecture

### State Management Strategy
- **Redux Store** (`src/app/store.ts`): Combines `authSlice` reducer and RTK Query `baseApi` reducer
- **Auth State** (`src/app/authSlice.ts`): Manages user authentication state (user, tokens, isAuthenticated)
- **API Layer** (`src/services/baseApi.ts`): Centralized RTK Query base API with automatic token injection and cache tags
- **API Services**: Individual API slices in `src/services/api/` extend baseApi using `injectEndpoints()`

### Authentication Flow
1. User logs in via `authApi.login` mutation
2. Tokens stored in encrypted localStorage via `storage` utility (`src/utils/storage.ts`)
3. `authSlice.setCredentials` updates Redux state
4. **Two-layer token injection**:
   - RTK Query: `baseApi` prepareHeaders injects token from storage
   - Axios: Request interceptor in `src/services/axios.ts` adds Bearer token
5. **Token refresh**: Axios response interceptor handles 401s, attempts refresh, queues failed requests, auto-logs out on failure

### Routing Architecture
- **Main Layout** (`/`): Public pages + protected user routes
- **Admin Layout** (`/admin`): Nested under ProtectedRoute with `allowedRoles={['admin']}`
- **ProtectedRoute Component**: Checks `auth.isAuthenticated` from Redux, redirects to `/login` if not authenticated, optionally validates roles

### Path Aliases
All imports use `@/` prefix (e.g., `@/components`, `@/features`, `@/services`). Configured in:
- `tsconfig.json` (TypeScript)
- `vite.config.ts` (Vite)
- `vitest.config.ts` (Vitest)

### Feature Organization
Features are self-contained in `src/features/[feature-name]/`:
- Main page component (e.g., `ProfilePage.tsx`)
- Sub-components in `components/` subfolder
- Exported via `index.ts` barrel file
- Co-located tests (e.g., `ProfilePage.test.tsx`)

### API Service Pattern
Each API domain lives in `src/services/api/[domain]/`:
- `[domain]Api.ts`: Defines endpoints using `baseApi.injectEndpoints()`
- `index.ts`: Re-exports API slice and auto-generated hooks
- Tag-based cache invalidation (e.g., `['Products']`, `['Auth']`, `['User']`)

Example:
```typescript
export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({ providesTags: ['Products'] }),
    createProduct: builder.mutation({ invalidatesTags: ['Products'] }),
  }),
});
```

### Dual HTTP Clients
- **RTK Query**: Primary for CRUD operations, automatic caching, React hooks integration
- **Axios** (`src/services/axios.ts`): Used for token refresh logic, includes axios-retry with exponential backoff for 5xx/network errors

### Token Storage Security
`src/utils/storage.ts` provides encrypted localStorage wrapper:
- Tokens XOR-encrypted with key (obfuscation, not cryptographic security)
- `getToken()`, `setToken()`, `getRefreshToken()`, `clear()`
- JWT expiration checking utilities

### Error Handling
- **ErrorBoundary**: Wraps app in `src/main.tsx`, integrates with Sentry
- **Axios Interceptors**: Centralized error handling in `src/services/axios.ts`
- **RTK Query**: Errors accessible in hook results (e.g., `{ error, isError }`)

### Internationalization
- **i18next**: Configured in `src/locales/i18n.ts`
- Languages: `en`, `vi` with translations in `src/locales/[lang]/translation.json`
- Usage: `useTranslation()` hook from `react-i18next`

### Component Organization
Components moved to categorized subdirectories:
- `src/components/ui/`: LoadingSpinner, Skeletons
- `src/components/guards/`: ProtectedRoute
- `src/components/errors/`: ErrorBoundary
Each component has its own folder with component file, tests, and index.ts

### Layouts
- **MainLayout** (`src/layouts/MainLayout/`): Header with auth controls, Sidebar for navigation, uses `<Outlet />` for nested routes
- **AdminLayout** (`src/layouts/AdminLayout.tsx`): Admin-specific shell with different navigation

### Security Features
- Security headers in `vite.config.ts` (CSP, X-Frame-Options, etc.)
- Encrypted token storage
- Automatic token refresh with request queuing
- 30-second axios timeout

### Performance Optimizations
- Code splitting: vendor, redux, mantine chunks (`vite.config.ts` manualChunks)
- RTK Query caching: 60s keepUnusedDataFor, 30s refetchOnMountOrArgChange
- Lazy loading via React Router

## Common Development Tasks

### Adding a New API Endpoint
1. Create/update API slice in `src/services/api/[domain]/[domain]Api.ts`
2. Define types in `src/types/[domain].ts`
3. Use auto-generated hooks (e.g., `useGetProductsQuery`) in components

### Adding a New Protected Route
```typescript
// In src/routes/index.tsx
{
  path: 'new-page',
  element: (
    <ProtectedRoute allowedRoles={['user', 'admin']}> // optional
      <NewPage />
    </ProtectedRoute>
  ),
}
```

### Adding Translations
1. Add keys to `src/locales/en/translation.json` and `src/locales/vi/translation.json`
2. Use in components: `const { t } = useTranslation(); t('your.key')`

### Running Specific Tests
```bash
npm run test:run -- src/features/profile  # Run all profile tests
npm run test:run -- src/features/profile/ChangePasswordModal.test.tsx  # Single file
```

## Important Files

- `src/app/store.ts` - Redux store configuration
- `src/app/authSlice.ts` - Authentication state management
- `src/services/baseApi.ts` - RTK Query base API with global config
- `src/services/axios.ts` - Axios instance with interceptors for token refresh
- `src/utils/storage.ts` - Encrypted localStorage utilities
- `src/routes/index.tsx` - Application routing structure
- `src/types/` - TypeScript type definitions
- `vite.config.ts` - Build config, path aliases, security headers, code splitting

## Environment Variables

Required in `.env`:
```
VITE_API_URL=http://localhost:5000/api  # Backend API base URL
VITE_APP_NAME=React Claude App
```

## Testing Philosophy

- 70% coverage threshold enforced
- Co-located tests with features
- Use `src/tests/test-utils.tsx` for Redux/Router-wrapped renders
- Vitest + React Testing Library + jsdom
