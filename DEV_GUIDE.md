# Development Guide

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=React Claude App
```

### 3. Start Mock Backend (Optional)

For development without a real backend:

```bash
# Install json-server globally
npm install -g json-server

# Run the mock server
json-server --watch db.json --port 5000 --routes routes.json
```

The mock API will be available at `http://localhost:5000/api`

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Default Login Credentials

### Admin User
- Email: `admin@example.com`
- Password: `admin123`
- Role: admin

### Regular User
- Email: `user@example.com`
- Password: `user123`
- Role: user

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## Project Architecture

### Feature-Based Structure

The project follows a feature-based architecture:

```
src/
├── features/          # Feature modules
│   ├── auth/         # Authentication
│   ├── products/     # Product management
│   ├── dashboard/    # User dashboard
│   └── admin/        # Admin panel
├── app/              # Redux store
├── services/         # API services
├── components/       # Shared components
├── layouts/          # Layout components
└── routes/           # Route configuration
```

### State Management

- **Redux Toolkit** for global state
- **RTK Query** for API calls and caching
- Local component state with `useState` for UI state

### Routing

React Router v6 with:
- Public routes (home, login, register)
- Protected routes (dashboard, products)
- Admin routes (admin panel)

### API Integration

RTK Query handles:
- Automatic caching
- Request deduplication
- Optimistic updates
- Cache invalidation

## Adding New Features

### 1. Create Feature Module

```bash
mkdir -p src/features/my-feature
```

### 2. Add Components

```typescript
// src/features/my-feature/MyFeaturePage.tsx
export const MyFeaturePage = () => {
  return <div>My Feature</div>;
};
```

### 3. Add Routes

```typescript
// src/routes/index.tsx
{
  path: 'my-feature',
  element: <MyFeaturePage />,
}
```

### 4. Add API Endpoints

```typescript
// src/services/myFeatureApi.ts
export const myFeatureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => '/my-feature',
    }),
  }),
});
```

### 5. Add Types

```typescript
// src/types/myFeature.ts
export interface MyFeatureType {
  id: string;
  name: string;
}
```

### 6. Add Translations

```json
// src/locales/en/translation.json
{
  "myFeature": {
    "title": "My Feature",
    "description": "Feature description"
  }
}
```

## Styling

### Mantine UI

The app uses Mantine UI v7 for components. Customize the theme in `src/theme/index.ts`:

```typescript
export const theme: MantineThemeOverride = {
  primaryColor: 'blue',
  // Add your customizations
};
```

### Color Scheme

Light and dark modes are supported out of the box. Users can toggle via the header.

## Testing

### Unit Tests (To Be Added)

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### E2E Tests (To Be Added)

```bash
npm install --save-dev playwright
```

## Deployment

### Build

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Environment Variables

Make sure to set environment variables in your deployment platform:
- `VITE_API_URL` - Your production API URL

## Best Practices

### Code Organization

- Keep components small and focused
- Use custom hooks for shared logic
- Colocate related files in feature folders
- Export from index.ts files

### TypeScript

- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type when possible
- Use type inference when obvious

### Performance

- Lazy load routes with `React.lazy()`
- Use `memo` for expensive components
- Implement virtual scrolling for long lists
- Optimize images and assets

### Security

- Never commit `.env` files
- Validate all user input
- Sanitize data before rendering
- Use HTTPS in production
- Implement CSRF protection

## Troubleshooting

### Port Already in Use

Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001,
},
```

### Module Not Found

Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

Check TypeScript errors:
```bash
npx tsc --noEmit
```

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Mantine UI](https://mantine.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Vite](https://vitejs.dev)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and formatting
6. Submit a pull request

## License

MIT
