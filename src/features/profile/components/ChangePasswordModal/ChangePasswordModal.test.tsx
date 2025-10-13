import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/test-utils';
import { ChangePasswordModal } from './ChangePasswordModal';
import * as profileApi from '@/services';

// Mock the profile API
vi.mock('@/services', () => ({
  useChangePasswordMutation: vi.fn(),
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

describe('ChangePasswordModal', () => {
  const mockChangePassword = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(profileApi.useChangePasswordMutation).mockReturnValue([
      mockChangePassword,
      { isLoading: false },
    ] as any);
  });

  it('should render form fields', async () => {
    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/^current password$/i)).toBeInTheDocument();
      expect(screen.getAllByLabelText(/new password/i)[0]).toBeInTheDocument();
      expect(screen.getByLabelText(/^confirm new password$/i)).toBeInTheDocument();
    });
  });

  it('should not render when opened is false', () => {
    renderWithProviders(<ChangePasswordModal opened={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Change Password')).not.toBeInTheDocument();
  });

  it('should validate current password is required', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/current password is required/i)).toBeInTheDocument();
    });
  });

  it('should validate new password minimum length', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'OldPass123');
    await user.type(newPasswordInput, 'Short1');
    await user.type(confirmPasswordInput, 'Short1');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });

  it('should validate new password contains uppercase letter', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'OldPass123');
    await user.type(newPasswordInput, 'lowercase123');
    await user.type(confirmPasswordInput, 'lowercase123');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password must contain at least one uppercase letter/i)).toBeInTheDocument();
    });
  });

  it('should validate new password contains lowercase letter', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'OldPass123');
    await user.type(newPasswordInput, 'UPPERCASE123');
    await user.type(confirmPasswordInput, 'UPPERCASE123');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password must contain at least one lowercase letter/i)).toBeInTheDocument();
    });
  });

  it('should validate new password contains number', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'OldPass123');
    await user.type(newPasswordInput, 'NoNumbers');
    await user.type(confirmPasswordInput, 'NoNumbers');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password must contain at least one number/i)).toBeInTheDocument();
    });
  });

  it('should validate passwords match', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'OldPass123');
    await user.type(newPasswordInput, 'NewPass123');
    await user.type(confirmPasswordInput, 'DifferentPass123');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('should validate new password differs from current password', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'SamePass123');
    await user.type(newPasswordInput, 'SamePass123');
    await user.type(confirmPasswordInput, 'SamePass123');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/new password must be different from current password/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    mockChangePassword.mockResolvedValue({ data: { success: true } });

    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'OldPass123');
    await user.type(newPasswordInput, 'NewPass456');
    await user.type(confirmPasswordInput, 'NewPass456');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledWith({
        currentPassword: 'OldPass123',
        newPassword: 'NewPass456',
        confirmPassword: 'NewPass456',
      });
    });
  });

  it('should handle submission error', async () => {
    const user = userEvent.setup();
    mockChangePassword.mockRejectedValue({
      data: { message: 'Current password is incorrect' },
    });

    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'WrongPass123');
    await user.type(newPasswordInput, 'NewPass456');
    await user.type(confirmPasswordInput, 'NewPass456');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalled();
    });
  });

  it('should show loading state during submission', async () => {
    vi.mocked(profileApi.useChangePasswordMutation).mockReturnValue([
      mockChangePassword,
      { isLoading: true },
    ] as any);

    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /change password/i });
    expect(submitButton).toBeDisabled();
  });

  it('should reset form on successful submission', async () => {
    const user = userEvent.setup();
    mockChangePassword.mockResolvedValue({ data: { success: true } });

    renderWithProviders(<ChangePasswordModal opened={true} onClose={mockOnClose} />);

    const currentPasswordInput = screen.getByLabelText(/^current password$/i);
    const newPasswordInput = screen.getAllByLabelText(/new password/i)[0]; // First one is "New Password"
    const confirmPasswordInput = screen.getByLabelText(/^confirm new password$/i);

    await user.type(currentPasswordInput, 'OldPass123');
    await user.type(newPasswordInput, 'NewPass456');
    await user.type(confirmPasswordInput, 'NewPass456');

    const submitButton = screen.getByRole('button', { name: /change password/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
