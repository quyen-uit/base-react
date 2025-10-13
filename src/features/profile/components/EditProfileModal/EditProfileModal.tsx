import { Modal, TextInput, Textarea, Button, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { z } from 'zod';
import { Profile, UpdateProfileData } from '@/types';
import { useUpdateProfileMutation } from '@/services';

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional().or(z.literal('')),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  location: z.string().max(100, 'Location too long').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  company: z.string().max(100, 'Company name too long').optional().or(z.literal('')),
});

interface EditProfileModalProps {
  opened: boolean;
  onClose: () => void;
  profile: Profile;
}

export const EditProfileModal = ({ opened, onClose, profile }: EditProfileModalProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<UpdateProfileData>({
    validate: zodResolver(updateProfileSchema),
    initialValues: {
      name: profile.name,
      bio: profile.bio || '',
      phone: profile.phone || '',
      location: profile.location || '',
      website: profile.website || '',
      company: profile.company || '',
    },
  });

  const handleSubmit = async (values: UpdateProfileData) => {
    try {
      // Remove empty strings
      const cleanedValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== '')
      ) as UpdateProfileData;

      await updateProfile(cleanedValues).unwrap();

      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green',
      });

      onClose();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error?.data?.message || 'Failed to update profile',
        color: 'red',
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Profile" size="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            {...form.getInputProps('name')}
          />

          <Textarea
            label="Bio"
            placeholder="Tell us about yourself"
            minRows={3}
            maxRows={5}
            {...form.getInputProps('bio')}
          />

          <TextInput
            label="Phone"
            placeholder="+1 (555) 123-4567"
            {...form.getInputProps('phone')}
          />

          <TextInput
            label="Location"
            placeholder="City, Country"
            {...form.getInputProps('location')}
          />

          <TextInput
            label="Website"
            placeholder="https://yourwebsite.com"
            {...form.getInputProps('website')}
          />

          <TextInput
            label="Company"
            placeholder="Your company"
            {...form.getInputProps('company')}
          />

          <Button type="submit" loading={isLoading} fullWidth>
            Save Changes
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
