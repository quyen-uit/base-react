import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '@/tests/test-utils';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<LoadingSpinner />);
    expect(container).toBeTruthy();
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with proper structure', () => {
    const result = renderWithProviders(<LoadingSpinner />);
    expect(result.container.firstChild).toBeTruthy();
  });
});
