# React Claude App

A modern, scalable, and maintainable web application built with React, TypeScript, and Vite. This application includes authentication, role-based access control, admin dashboard, internationalization, and more.

## Features

- **Authentication**: Refresh token in httpOnly cookie; access token in Redux (memory only)
- **Role-Based Access Control (RBAC)**: Manage user roles and permissions
- **User Profile Management**: Complete profile system with edit, password change, and avatar upload
- **Admin Dashboard**: Protected admin panel with dedicated layout and analytics
- **Product CRUD**: Full Create, Read, Update, Delete operations for products
- **User Management**: Admin tools for managing users
- **Analytics Dashboard**: Data visualization and insights
- **Theming**: Light and dark mode support with Mantine UI
- **Internationalization**: Multi-language support (English, Vietnamese)
- **State Management**: Redux Toolkit with RTK Query for API calls
- **Form Validation**: Zod schema validation with React Hook Form and Mantine Form
- **Error Handling**: Global error boundary with Sentry integration
- **TypeScript**: Full type safety across the application
- **Testing**: Comprehensive test suite with Vitest (70%+ coverage)
- **Security**: Production-ready security headers, CSP, cookie-based auth
- **Performance**: Code splitting, smart caching, and optimization

## Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### UI & Styling
- **Mantine UI v7** - Component library
- **Tabler Icons** - Icon set

### State Management
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Redux** - React bindings for Redux

### Routing
- **React Router DOM v6** - Client-side routing

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Mantine Form** - Form components

### Internationalization
- **i18next** - i18n framework
- **react-i18next** - React bindings

### HTTP Client
- **Axios** - HTTP requests with interceptors

### Code Quality
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

### Testing
- **Vitest** - Unit and integration testing
- **React Testing Library** - Component testing
- **jsdom** - DOM simulation for tests

### Security & Monitoring
- **Sentry** - Error tracking and performance monitoring
- **axios-retry** - Automatic request retries
- **Cookie-based Auth** - httpOnly refresh cookie; memory access token

## Project Structure

```
src/
├── app/                       # Redux store configuration
│   ├── store.ts              # Store setup
│   ├── authSlice.ts          # Auth state slice
│   └── hooks.ts              # Typed Redux hooks
├── components/               # Shared components (organized by category)
│   ├── ui/                   # UI components
│   │   ├── LoadingSpinner/   # Loading indicator
│   │   └── Skeletons/        # Skeleton loading components
│   ├── guards/               # Route guards
│   │   └── ProtectedRoute/   # Route protection wrapper
│   └── errors/               # Error handling components
│       └── ErrorBoundary/    # Error boundary component
├── constants/                # Application constants
│   ├── api.ts                # API config & endpoints
│   ├── routes.ts             # Route constants
│   ├── permissions.ts        # Permission & role constants
│   └── storage.ts            # 
├── features/                 # Feature-based modules
│   ├── auth/                 # Authentication pages
│   ├── home/                 # Home page
│   ├── dashboard/            # User dashboard
│   ├── profile/              # User profile with modals
│   │   └── components/       # Profile-specific components
│   │       ├── EditProfileModal/
│   │       ├── ChangePasswordModal/
│   │       └── AvatarUploadModal/
│   ├── products/             # Product CRUD
│   │   └── components/       # Product-specific components
│   ├── admin/                # Admin dashboard
│   ├── analytics/            # Analytics page
│   ├── users/                # User management
│   ├── settings/             # Settings page
│   └── notfound/             # 404 page
├── hooks/                    # Custom React hooks
├── layouts/                  # Layout components
│   ├── MainLayout/           # Main app layout with header/sidebar
│   │   └── components/       # Layout sub-components
│   └── AdminLayout.tsx       # Admin panel layout
├── locales/                  # i18n translations
│   ├── en/                   # English translations
│   ├── vi/                   # Vietnamese translations
│   └── i18n.ts               # i18n configuration
├── routes/                   # Route definitions
│   └── index.tsx             # Router configuration
├── services/                 # API services
│   ├── api/                  # API endpoints (organized by domain)
│   │   ├── auth/             # Auth API endpoints
│   │   ├── profile/          # Profile API endpoints
│   │   ├── products/         # Products API endpoints
│   │   └── health/           # Health check endpoints
│   ├── baseApi.ts            # RTK Query base API
│   ├── axios.ts              # Axios instance with interceptors
│   └── sentry.ts             # Sentry configuration
├── theme/                    # Mantine theme config
│   └── index.ts              # Theme customization
├── types/                    # TypeScript types
│   ├── auth.ts               # Auth types
│   ├── profile.ts            # Profile types
│   ├── product.ts            # Product types
│   ├── common.ts             # Common types
│   └── index.ts              # Type exports
├── utils/                    # Utility functions
│   ├── storage.ts            # User storage helpers
│   ├── permissions.ts        # Permission utilities
│   └── logger.ts             # Logging utility
├── tests/                    # Test configuration
│   ├── setup.ts              # Test setup
│   └── test-utils.tsx        # Testing utilities
├── App.tsx                   # Root component
└── main.tsx                  # Entry point
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-claude
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=React Claude App
VITE_SENTRY_DSN=
VITE_SENTRY_ENABLED=false
VITE_ENV=development
```

## Authentication

- Refresh token is stored as an httpOnly, Secure cookie set by the backend.
- Access token is kept only in memory (Redux). It is attached to requests via the `Authorization: Bearer <token>` header by RTK Query and Axios.
- Axios is configured with `withCredentials: true` so cookies are sent automatically. On 401, it calls `/auth/refresh`, updates the token in Redux, and retries the original request.
- On app start, the app calls `/auth/me` to hydrate the current user and gate protected routes until initialization completes.
- No tokens are stored in `localStorage`.

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Linting & Formatting

Lint code:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

Format code:
```bash
npm run format
```

### Testing

Run tests in watch mode:
```bash
npm test
```

Run tests once (CI):
```bash
npm run test:run
```

Run tests with UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run test:coverage
```

For detailed testing documentation, see [TESTING.md](./TESTING.md).

## Production Ready Features

This boilerplate includes comprehensive production-ready features:

### Security
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Encrypted token storage with refresh mechanism
- ✅ Automatic token refresh on expiry
- ✅ Request authentication with JWT

### Performance
- ✅ Code splitting (vendor, redux, mantine chunks)
- ✅ Smart API caching with RTK Query
- ✅ Bundle optimization (~700KB total, ~180KB gzipped)
- ✅ Lazy loading and suspense

### Reliability
- ✅ Automatic retry logic for failed requests
- ✅ Request queuing and cancellation
- ✅ Error boundary with Sentry integration
- ✅ Health check monitoring

### Developer Experience
- ✅ 70%+ test coverage enforcement
- ✅ Pre-commit hooks (lint + format)
- ✅ Structured logging utility
- ✅ Skeleton loading components
- ✅ Organized component structure by category
- ✅ Centralized constants management

## Architecture Highlights

### Organized Code Structure

The project follows a clean, scalable architecture:
- **Feature-based organization**: Each feature is self-contained with its components and tests
- **Domain-driven API services**: API endpoints organized by domain in `services/api/`
- **Centralized constants**: All configuration in `src/constants/`
- **Component categorization**: UI, guards, and error components separated logically

### Dual HTTP Client Strategy

- **RTK Query**: Primary client for CRUD operations with automatic caching and React hooks
- **Axios**: Used for token refresh logic with automatic retry and request queuing

### Authentication Architecture

- **Token storage**: Access token in Redux (memory); refresh token in httpOnly cookie
- **Header injection**: Authorization attached by RTK Query `prepareHeaders` and Axios interceptors from Redux state
- **Smart refresh**: Automatic token refresh on 401 with request queuing to prevent race conditions
- **State management**: Redux slice for auth state; no localStorage persistence

## API Integration

This application uses RTK Query for API calls. The base API URL is configured in `.env`.

### Mock API (Development)

For development without a backend, you can:

1. Use [json-server](https://github.com/typicode/json-server)
2. Use [MSW (Mock Service Worker)](https://mswjs.io/)
3. Modify the API slices to return mock data

### Expected API Endpoints

```
# Authentication
POST   /auth/login          - User login
POST   /auth/register       - User registration
POST   /auth/logout         - User logout
POST   /auth/refresh        - Refresh access token

# Profile
GET    /profile             - Get current user profile
PUT    /profile             - Update user profile
POST   /profile/avatar      - Upload profile avatar
PUT    /profile/password    - Change password

# Products
GET    /products            - Get all products
GET    /products/:id        - Get product by ID
POST   /products            - Create product
PUT    /products/:id        - Update product
DELETE /products/:id        - Delete product

# Health
GET    /health              - Health check endpoint
```

## User Roles

The application supports role-based access:

- **guest**: Unauthenticated users (public pages only)
- **user**: Authenticated users (access to dashboard and products)
- **admin**: Administrators (full access including admin panel)

## Features in Detail

### Authentication

- Login and registration forms with Zod validation
- Access token in Redux (memory); refresh token in httpOnly cookie
- Automatic token injection in API requests (RTK Query + Axios)
- Automatic token refresh on 401 with request queuing
- Protected routes with redirect to login
- Role-based access control

### User Profile

- View and edit profile information
- Change password with validation
- Upload and update profile avatar
- Form validation with Zod schemas
- Modal-based UI for better UX

### Internationalization

Toggle between English and Vietnamese using the language selector in the header. Translations are stored in `src/locales/`.

To add a new language:
1. Create a new folder in `src/locales/` (e.g., `fr/`)
2. Add `translation.json` with translations
3. Update `src/locales/i18n.ts` to include the new language

### Theming

Toggle between light and dark mode using the theme switcher in the header. Theme preference is saved in localStorage.

Customize the theme in `src/theme/index.ts`.

### Product CRUD

Full CRUD operations for products with:
- Data table with search functionality
- Create/Edit modal forms
- Delete confirmation
- Form validation with Zod
- Real-time updates with RTK Query cache invalidation

### Admin Features

- Dedicated admin layout with different navigation
- Analytics dashboard
- User management
- Settings management
- Role-based route protection

## Development Tips

### Adding a New Feature

1. Create a new folder in `src/features/[feature-name]/`
2. Add your page component and sub-components in `components/` folder
3. Export from `index.ts`
4. Add routes in `src/routes/index.tsx`
5. Add translations in `src/locales/en/` and `src/locales/vi/`
6. Write tests co-located with components

### Adding API Endpoints

1. Create or update API slice in `src/services/api/[domain]/`
2. Use `baseApi.injectEndpoints()` pattern
3. Define TypeScript types in `src/types/[domain].ts`
4. Export auto-generated hooks from `index.ts`
5. Use the hooks in components (e.g., `useGetProfileQuery()`)

### Using Constants

The project uses centralized constants:
- **API endpoints**: `src/constants/api.ts` (API_CONFIG, API_ENDPOINTS)
- **Routes**: `src/constants/routes.ts` (ROUTES, PUBLIC_ROUTES, etc.)
- **Permissions**: `src/constants/permissions.ts` (PERMISSIONS, ROLES)
- **Storage keys**: `src/constants/storage.ts`

### Component Organization

Components are organized by category:
- **UI components**: `src/components/ui/` (LoadingSpinner, Skeletons)
- **Guards**: `src/components/guards/` (ProtectedRoute)
- **Error handling**: `src/components/errors/` (ErrorBoundary)
- **Feature components**: Within each feature's `components/` folder

Each component has its own folder with:
- Component file (e.g., `LoadingSpinner.tsx`)
- Test file (e.g., `LoadingSpinner.test.tsx`)
- Index file for exports (`index.ts`)

### Custom Hooks

Create reusable hooks in `src/hooks/` for shared logic. The project includes:
- `useRedux.ts` - Typed Redux hooks (useAppDispatch, useAppSelector)

## Troubleshooting

### Port Already in Use

Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3001,
},
```

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

Ensure TypeScript version is up to date:
```bash
npm install typescript@latest
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and Mantine UI


