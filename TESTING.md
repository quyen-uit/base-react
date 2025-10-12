# Testing Guide

This project uses **Vitest** for unit and integration testing, along with React Testing Library for component testing.

## Running Tests

```bash
# Run tests in watch mode (development)
npm test

# Run tests once (CI/production)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

```
src/
├── tests/
│   ├── setup.ts          # Global test setup and mocks
│   └── test-utils.tsx    # Custom render utilities with providers
├── components/
│   └── *.test.tsx        # Component tests
├── utils/
│   └── *.test.ts         # Utility function tests
└── app/
    └── *.test.ts         # Redux slice tests
```

## Writing Tests

### Component Tests

Use the `renderWithProviders` utility to render components with all necessary providers (Redux, Router, Mantine):

```typescript
import { renderWithProviders, screen } from '@/tests/test-utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
```

### Redux Tests

Test Redux slices in isolation:

```typescript
import { describe, it, expect } from 'vitest';
import myReducer, { myAction } from './mySlice';

describe('mySlice', () => {
  it('handles myAction', () => {
    const state = myReducer(initialState, myAction());
    expect(state).toEqual(expectedState);
  });
});
```

### Utility Tests

Test utility functions without any special setup:

```typescript
import { describe, it, expect } from 'vitest';
import { myUtility } from './myUtility';

describe('myUtility', () => {
  it('returns correct value', () => {
    expect(myUtility('input')).toBe('output');
  });
});
```

## Test Coverage

The project is configured with coverage thresholds:
- **Lines**: 70%
- **Functions**: 70%
- **Branches**: 70%
- **Statements**: 70%

View coverage reports:
```bash
npm run test:coverage
# Open coverage/index.html in your browser
```

## Mocking

### API Calls

RTK Query endpoints are automatically mocked in tests. You can provide mock data:

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json({ products: [] }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### localStorage

localStorage is automatically mocked in `tests/setup.ts`.

### Environment Variables

Environment variables are mocked in `tests/setup.ts`:

```typescript
vi.mock('import.meta.env', () => ({
  VITE_API_URL: 'http://localhost:5000/api',
  VITE_APP_NAME: 'React Claude App',
}));
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the user sees and does, not internal implementation details.

2. **Use Descriptive Test Names**: Make it clear what's being tested and what the expected outcome is.

3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and assertion phases.

4. **Avoid Testing Third-Party Libraries**: Don't test Mantine components, Redux, or React Router - trust they work.

5. **Keep Tests Simple**: Each test should verify one thing.

6. **Use Test IDs Sparingly**: Prefer semantic queries like `getByRole`, `getByText`, `getByLabelText`.

## Common Patterns

### Testing User Interactions

```typescript
import { renderWithProviders, userEvent } from '@/tests/test-utils';

it('handles button click', async () => {
  const user = userEvent.setup();
  renderWithProviders(<MyComponent />);

  const button = screen.getByRole('button', { name: 'Submit' });
  await user.click(button);

  expect(screen.getByText('Submitted!')).toBeTruthy();
});
```

### Testing Async Operations

```typescript
import { waitFor } from '@testing-library/react';

it('loads data', async () => {
  renderWithProviders(<MyComponent />);

  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeTruthy();
  });
});
```

### Testing Forms

```typescript
it('submits form', async () => {
  const user = userEvent.setup();
  renderWithProviders(<MyForm />);

  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.click(screen.getByRole('button', { name: 'Submit' }));

  expect(screen.getByText('Success!')).toBeTruthy();
});
```

## Troubleshooting

### Tests Fail with "Cannot find module"

Make sure path aliases in `vitest.config.ts` match those in `tsconfig.json`.

### Tests Hang

Check for:
- Missing `await` on async operations
- Infinite loops
- Network requests that aren't mocked

### Coverage Not Generated

Install coverage provider:
```bash
npm install -D @vitest/coverage-v8
```

### Mantine Components Not Rendering

Ensure `MantineProvider` is included in the test wrapper (already configured in `test-utils.tsx`).

## CI/CD Integration

Add to your CI pipeline:

```yaml
# GitHub Actions example
- name: Run tests
  run: npm run test:run

- name: Generate coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```
