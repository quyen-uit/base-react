import { Modal, PasswordInput, Button, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { z } from 'zod';
import { ChangePasswordData } from '@/types';
import { useChangePasswordMutation } from '@/services';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

interface ChangePasswordModalProps {
  opened: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({ opened, onClose }: ChangePasswordModalProps) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<ChangePasswordData>({
    validate: zodResolver(changePasswordSchema),
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (values: ChangePasswordData) => {
    try {
      await changePassword(values).unwrap();

      notifications.show({
        title: 'Success',
        message: 'Password changed successfully',
        color: 'green',
        icon: <IconCheck />,
      });

      form.reset();
      onClose();
    } catch (error: unknown) {
      const message = (error as { data?: { message?: string } })?.data?.message || 'Failed to change password';
      notifications.show({
        title: 'Error',
        message,
        color: 'red',
        icon: <IconAlertCircle />,
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Change Password" size="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Your new password must be different from previously used passwords and meet our security requirements.
          </Text>

          <PasswordInput
            label="Current Password"
            placeholder="Enter current password"
            required
            {...form.getInputProps('currentPassword')}
          />

          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            required
            description="Must be at least 8 characters with uppercase, lowercase, and number"
            {...form.getInputProps('newPassword')}
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            required
            {...form.getInputProps('confirmPassword')}
          />

          <Button type="submit" loading={isLoading} fullWidth>
            Change Password
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
