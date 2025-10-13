import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/test-utils';
import { ProfilePage } from './ProfilePage';
import * as profileApi from '@/services';

// Mock the profile API
vi.mock('@/services', () => ({
  useGetProfileQuery: vi.fn(),
  useUpdateProfileMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  useChangePasswordMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  useUploadAvatarMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
  useDeleteAvatarMutation: vi.fn(() => [vi.fn(), { isLoading: false }]),
}));

const mockProfile = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  bio: 'Software developer',
  phone: '+1234567890',
  location: 'New York, USA',
  website: 'https://johndoe.com',
  company: 'Tech Corp',
  role: 'user' as const,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-15T00:00:00.000Z',
};

describe('ProfilePage', () => {
  it('should show loading skeleton when data is loading', () => {
    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    // Check for skeleton elements
    expect(document.querySelector('.mantine-Skeleton-root')).toBeInTheDocument();
  });

  it('should show "Profile not found" when profile is null', async () => {
    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('Profile not found')).toBeInTheDocument();
    });
  });

  it('should render profile information correctly', async () => {
    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('USER')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('Software developer')).toBeInTheDocument();
      expect(screen.getByText('+1234567890')).toBeInTheDocument();
      expect(screen.getByText('New York, USA')).toBeInTheDocument();
      expect(screen.getByText('https://johndoe.com')).toBeInTheDocument();
      expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    });
  });

  it('should show admin badge for admin role', async () => {
    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: { ...mockProfile, role: 'admin' as const },
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('ADMIN')).toBeInTheDocument();
    });
  });

  it('should open edit profile modal when clicking Edit Profile button', async () => {
    const user = userEvent.setup();
    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', { name: /edit profile/i });
    await user.click(editButton);

    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
  });

  it('should open change password modal when clicking Change Password button', async () => {
    const user = userEvent.setup();
    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('Change Password')).toBeInTheDocument();
    });

    const passwordButton = screen.getByRole('button', { name: /change password/i });
    await user.click(passwordButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
    });
  });

  it('should open avatar modal when clicking avatar', async () => {
    const user = userEvent.setup();
    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      const avatar = document.querySelector('.mantine-Avatar-root');
      expect(avatar).toBeInTheDocument();
    });

    const avatar = document.querySelector('.mantine-Avatar-root') as HTMLElement;
    await user.click(avatar);

    await waitFor(() => {
      expect(screen.getByText('Update Avatar')).toBeInTheDocument();
    });
  });

  it('should show member since and last updated dates', async () => {
    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText(/member since:/i)).toBeInTheDocument();
      expect(screen.getByText(/last updated:/i)).toBeInTheDocument();
    });
  });

  it('should not render optional fields when they are missing', async () => {
    const minimalProfile = {
      id: '1',
      email: 'jane@example.com',
      name: 'Jane Doe',
      role: 'user' as const,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-15T00:00:00.000Z',
    };

    vi.mocked(profileApi.useGetProfileQuery).mockReturnValue({
      data: minimalProfile,
      isLoading: false,
      isError: false,
      error: undefined,
    } as any);

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    // These fields should not be present
    expect(screen.queryByText('Bio')).not.toBeInTheDocument();
    expect(screen.queryByText('Phone')).not.toBeInTheDocument();
    expect(screen.queryByText('Location')).not.toBeInTheDocument();
    expect(screen.queryByText('Website')).not.toBeInTheDocument();
    expect(screen.queryByText('Company')).not.toBeInTheDocument();
  });
});
