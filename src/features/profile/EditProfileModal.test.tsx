import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/test-utils';
import { EditProfileModal } from './EditProfileModal';
import * as profileApi from '@/services/profileApi';

// Mock the profile API
vi.mock('@/services/profileApi', () => ({
  useUpdateProfileMutation: vi.fn(),
}));

// Mock notifications
vi.mock('@mantine/notifications', async () => {
  const actual = await vi.importActual('@mantine/notifications');
  return {
    ...actual,
    notifications: {
      show: vi.fn(),
    },
  };
});

const mockProfile = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  bio: 'Software developer',
  phone: '+1234567890',
  location: 'New York, USA',
  website: 'https://johndoe.com',
  company: 'Tech Corp',
  role: 'user' as const,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-15T00:00:00.000Z',
};

describe('EditProfileModal', () => {
  const mockUpdateProfile = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(profileApi.useUpdateProfileMutation).mockReturnValue([
      mockUpdateProfile,
      { isLoading: false },
    ] as any);
  });

  it('should render with profile data pre-filled', async () => {
    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Software developer')).toBeInTheDocument();
      expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument();
      expect(screen.getByDisplayValue('New York, USA')).toBeInTheDocument();
      expect(screen.getByDisplayValue('https://johndoe.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Tech Corp')).toBeInTheDocument();
    });
  });

  it('should not render when opened is false', () => {
    renderWithProviders(<EditProfileModal opened={false} onClose={mockOnClose} profile={mockProfile} />);

    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
  });

  it('should validate name field - minimum length', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'J');

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('should validate name field - maximum length', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'A'.repeat(101));

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name too long/i)).toBeInTheDocument();
    });
  });

  it('should validate phone number format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    const phoneInput = screen.getByLabelText(/phone/i);
    await user.clear(phoneInput);
    await user.type(phoneInput, 'invalid-phone');

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid phone number/i)).toBeInTheDocument();
    });
  });

  it('should validate website URL', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    const websiteInput = screen.getByLabelText(/website/i);
    await user.clear(websiteInput);
    await user.type(websiteInput, 'not-a-url');

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid url/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    mockUpdateProfile.mockResolvedValue({ data: mockProfile });

    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Smith');

    const bioInput = screen.getByLabelText(/bio/i);
    await user.clear(bioInput);
    await user.type(bioInput, 'Senior Developer');

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        name: 'Jane Smith',
        bio: 'Senior Developer',
        phone: '+1234567890',
        location: 'New York, USA',
        website: 'https://johndoe.com',
        company: 'Tech Corp',
      });
    });
  });

  it('should handle submission error', async () => {
    const user = userEvent.setup();
    mockUpdateProfile.mockRejectedValue({
      data: { message: 'Update failed' },
    });

    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalled();
    });
  });

  it('should allow empty optional fields', async () => {
    const user = userEvent.setup();
    mockUpdateProfile.mockResolvedValue({ data: mockProfile });

    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    const phoneInput = screen.getByLabelText(/phone/i);
    await user.clear(phoneInput);

    const websiteInput = screen.getByLabelText(/website/i);
    await user.clear(websiteInput);

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        name: 'John Doe',
        bio: 'Software developer',
        phone: '',
        location: 'New York, USA',
        website: '',
        company: 'Tech Corp',
      });
    });
  });

  it('should show loading state during submission', async () => {
    vi.mocked(profileApi.useUpdateProfileMutation).mockReturnValue([
      mockUpdateProfile,
      { isLoading: true },
    ] as any);

    renderWithProviders(<EditProfileModal opened={true} onClose={mockOnClose} profile={mockProfile} />);

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    expect(submitButton).toBeDisabled();
  });
});
