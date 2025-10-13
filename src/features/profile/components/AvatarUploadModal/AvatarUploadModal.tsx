import { Modal, Avatar, Stack, Button, FileButton, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { IconUpload, IconTrash, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useUploadAvatarMutation, useDeleteAvatarMutation } from '@/services';

interface AvatarUploadModalProps {
  opened: boolean;
  onClose: () => void;
  currentAvatar?: string;
}

export const AvatarUploadModal = ({ opened, onClose, currentAvatar }: AvatarUploadModalProps) => {
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const [deleteAvatar, { isLoading: isDeleting }] = useDeleteAvatarMutation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      notifications.show({
        title: 'Error',
        message: 'File size must be less than 5MB',
        color: 'red',
        icon: <IconAlertCircle />,
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      notifications.show({
        title: 'Error',
        message: 'Only image files are allowed',
        color: 'red',
        icon: <IconAlertCircle />,
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      await uploadAvatar(formData).unwrap();

      notifications.show({
        title: 'Success',
        message: 'Avatar updated successfully',
        color: 'green',
        icon: <IconCheck />,
      });

      // Cleanup
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
      onClose();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Failed to upload avatar',
        color: 'red',
        icon: <IconAlertCircle />,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAvatar().unwrap();

      notifications.show({
        title: 'Success',
        message: 'Avatar removed successfully',
        color: 'green',
        icon: <IconCheck />,
      });

      setPreviewUrl(null);
      setSelectedFile(null);
      onClose();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Failed to remove avatar',
        color: 'red',
        icon: <IconAlertCircle />,
      });
    }
  };

  const handleClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Update Avatar" size="md">
      <Stack gap="lg" align="center">
        {/* Avatar Preview */}
        <Avatar src={previewUrl || currentAvatar} size={150} radius={150} alt="Avatar preview" />

        {/* File Info */}
        {selectedFile && (
          <Text size="sm" c="dimmed">
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
          </Text>
        )}

        {/* Actions */}
        <Stack gap="sm" w="100%">
          <FileButton onChange={handleFileSelect} accept="image/*">
            {(props) => (
              <Button {...props} leftSection={<IconUpload size={16} />} variant="light" fullWidth>
                Choose Image
              </Button>
            )}
          </FileButton>

          {selectedFile && (
            <Button onClick={handleUpload} loading={isUploading} fullWidth>
              Upload Avatar
            </Button>
          )}

          {currentAvatar && !selectedFile && (
            <Button
              onClick={handleDelete}
              loading={isDeleting}
              color="red"
              variant="light"
              leftSection={<IconTrash size={16} />}
              fullWidth
            >
              Remove Avatar
            </Button>
          )}
        </Stack>

        {/* Guidelines */}
        <Stack gap="xs" w="100%">
          <Text size="xs" fw={500}>
            Guidelines:
          </Text>
          <Text size="xs" c="dimmed">
            • Image must be less than 5MB
          </Text>
          <Text size="xs" c="dimmed">
            • Accepted formats: JPG, PNG, GIF, WebP
          </Text>
          <Text size="xs" c="dimmed">
            • Square images work best (1:1 ratio)
          </Text>
        </Stack>
      </Stack>
    </Modal>
  );
};
