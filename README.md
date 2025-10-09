# React Claude App

A modern, scalable, and maintainable web application built with React, TypeScript, and Vite. This application includes authentication, role-based access control, admin dashboard, internationalization, and more.

## Features

- **Authentication**: Secure login and registration system
- **Role-Based Access Control (RBAC)**: Manage user roles and permissions
- **Admin Dashboard**: Protected admin panel with dedicated layout
- **Client Interface**: Public and protected user-facing pages
- **Theming**: Light and dark mode support with Mantine UI
- **Internationalization**: Multi-language support (English, Vietnamese)
- **Product CRUD**: Full Create, Read, Update, Delete operations for products
- **State Management**: Redux Toolkit with RTK Query for API calls
- **Form Validation**: Zod schema validation with React Hook Form
- **Error Handling**: Global error boundary and toast notifications
- **TypeScript**: Full type safety across the application

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

## Project Structure

```
src/
├── app/                    # Redux store configuration
│   ├── store.ts           # Store setup
│   ├── authSlice.ts       # Auth state slice
│   └── hooks.ts           # Typed Redux hooks
├── components/            # Shared components
│   ├── ErrorBoundary.tsx  # Error boundary component
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── LoadingSpinner.tsx # Loading indicator
├── features/              # Feature-based modules
│   ├── auth/             # Authentication pages
│   ├── home/             # Home page
│   ├── dashboard/        # User dashboard
│   ├── admin/            # Admin pages
│   ├── products/         # Product CRUD
│   └── notfound/         # 404 page
├── hooks/                 # Custom React hooks
├── layouts/               # Layout components
│   ├── MainLayout.tsx    # Main app layout
│   └── AdminLayout.tsx   # Admin panel layout
├── locales/               # i18n translations
│   ├── en/               # English translations
│   ├── vi/               # Vietnamese translations
│   └── i18n.ts           # i18n configuration
├── routes/                # Route definitions
│   └── index.tsx         # Router configuration
├── services/              # API services
│   ├── baseApi.ts        # RTK Query base API
│   ├── authApi.ts        # Auth endpoints
│   ├── productsApi.ts    # Product endpoints
│   └── axios.ts          # Axios instance
├── theme/                 # Mantine theme config
│   └── index.ts          # Theme customization
├── types/                 # TypeScript types
│   ├── auth.ts           # Auth types
│   ├── product.ts        # Product types
│   └── common.ts         # Common types
├── utils/                 # Utility functions
│   ├── storage.ts        # LocalStorage helpers
│   └── permissions.ts    # Permission utilities
├── App.tsx                # Root component
└── main.tsx               # Entry point
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

4. Update `.env` with your API URL:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=React Claude App
```

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

## API Integration

This application uses RTK Query for API calls. The base API URL is configured in `.env`.

### Mock API (Development)

For development without a backend, you can:

1. Use [json-server](https://github.com/typicode/json-server)
2. Use [MSW (Mock Service Worker)](https://mswjs.io/)
3. Modify the API slices to return mock data

### Expected API Endpoints

```
POST   /auth/login          - User login
POST   /auth/register       - User registration
POST   /auth/logout         - User logout
GET    /auth/me             - Get current user

GET    /products            - Get all products
GET    /products/:id        - Get product by ID
POST   /products            - Create product
PUT    /products/:id        - Update product
DELETE /products/:id        - Delete product
```

## User Roles

The application supports role-based access:

- **guest**: Unauthenticated users (public pages only)
- **user**: Authenticated users (access to dashboard and products)
- **admin**: Administrators (full access including admin panel)

## Features in Detail

### Authentication

- Login and registration forms with validation
- JWT token storage in localStorage
- Automatic token injection in API requests
- Protected routes with redirect to login

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

## Development Tips

### Adding a New Feature

1. Create a new folder in `src/features/`
2. Add your components and logic
3. Export from `index.ts`
4. Add routes in `src/routes/index.tsx`
5. Add translations in `src/locales/`

### Adding API Endpoints

1. Create or update API slice in `src/services/`
2. Define TypeScript types in `src/types/`
3. Use the generated hooks in components

### Custom Hooks

Create reusable hooks in `src/hooks/` for shared logic.

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
