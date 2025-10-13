import { Container, Paper, Avatar, Group, Text, Stack, Button, Badge, Grid, Skeleton } from '@mantine/core';
import { IconEdit, IconKey, IconMail, IconPhone, IconMapPin, IconWorld, IconBuilding } from '@tabler/icons-react';
import { useState } from 'react';
import { useGetProfileQuery } from '@/services';
import { EditProfileModal } from './components/EditProfileModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { AvatarUploadModal } from './components/AvatarUploadModal';

export const ProfilePage = () => {
  const { data: profile, isLoading } = useGetProfileQuery();
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [passwordModalOpened, setPasswordModalOpened] = useState(false);
  const [avatarModalOpened, setAvatarModalOpened] = useState(false);

  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" radius="md">
          <Stack align="center" gap="xl">
            <Skeleton height={120} circle />
            <Skeleton height={32} width={200} />
            <Skeleton height={20} width={150} />
            <Stack gap="md" w="100%">
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
            </Stack>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" radius="md">
          <Text c="dimmed" ta="center">
            Profile not found
          </Text>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Container size="md" py="xl">
        <Paper shadow="sm" p="xl" radius="md">
          {/* Header Section */}
          <Stack align="center" gap="lg" mb="xl">
            <Avatar
              src={profile.avatar}
              size={120}
              radius={120}
              alt={profile.name}
              style={{ cursor: 'pointer' }}
              onClick={() => setAvatarModalOpened(true)}
            />
            <Stack align="center" gap="xs">
              <Text size="xl" fw={600}>
                {profile.name}
              </Text>
              <Badge color={profile.role === 'admin' ? 'red' : 'blue'} variant="light">
                {profile.role.toUpperCase()}
              </Badge>
            </Stack>
            <Group>
              <Button leftSection={<IconEdit size={16} />} onClick={() => setEditModalOpened(true)}>
                Edit Profile
              </Button>
              <Button
                leftSection={<IconKey size={16} />}
                variant="light"
                onClick={() => setPasswordModalOpened(true)}
              >
                Change Password
              </Button>
            </Group>
          </Stack>

          {/* Information Grid */}
          <Grid gutter="md">
            <Grid.Col span={12}>
              <Paper withBorder p="md" radius="md">
                <Group gap="xs" mb="xs">
                  <IconMail size={18} />
                  <Text size="sm" fw={500}>
                    Email
                  </Text>
                </Group>
                <Text c="dimmed">{profile.email}</Text>
              </Paper>
            </Grid.Col>

            {profile.bio && (
              <Grid.Col span={12}>
                <Paper withBorder p="md" radius="md">
                  <Text size="sm" fw={500} mb="xs">
                    Bio
                  </Text>
                  <Text c="dimmed">{profile.bio}</Text>
                </Paper>
              </Grid.Col>
            )}

            {profile.phone && (
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Paper withBorder p="md" radius="md">
                  <Group gap="xs" mb="xs">
                    <IconPhone size={18} />
                    <Text size="sm" fw={500}>
                      Phone
                    </Text>
                  </Group>
                  <Text c="dimmed">{profile.phone}</Text>
                </Paper>
              </Grid.Col>
            )}

            {profile.location && (
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Paper withBorder p="md" radius="md">
                  <Group gap="xs" mb="xs">
                    <IconMapPin size={18} />
                    <Text size="sm" fw={500}>
                      Location
                    </Text>
                  </Group>
                  <Text c="dimmed">{profile.location}</Text>
                </Paper>
              </Grid.Col>
            )}

            {profile.website && (
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Paper withBorder p="md" radius="md">
                  <Group gap="xs" mb="xs">
                    <IconWorld size={18} />
                    <Text size="sm" fw={500}>
                      Website
                    </Text>
                  </Group>
                  <Text
                    c="blue"
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open(profile.website, '_blank')}
                  >
                    {profile.website}
                  </Text>
                </Paper>
              </Grid.Col>
            )}

            {profile.company && (
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Paper withBorder p="md" radius="md">
                  <Group gap="xs" mb="xs">
                    <IconBuilding size={18} />
                    <Text size="sm" fw={500}>
                      Company
                    </Text>
                  </Group>
                  <Text c="dimmed">{profile.company}</Text>
                </Paper>
              </Grid.Col>
            )}
          </Grid>

          {/* Footer Info */}
          <Stack gap="xs" mt="xl" pt="xl" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
            <Text size="xs" c="dimmed">
              Member since: {new Date(profile.createdAt).toLocaleDateString()}
            </Text>
            <Text size="xs" c="dimmed">
              Last updated: {new Date(profile.updatedAt).toLocaleDateString()}
            </Text>
          </Stack>
        </Paper>
      </Container>

      {/* Modals */}
      <EditProfileModal opened={editModalOpened} onClose={() => setEditModalOpened(false)} profile={profile} />
      <ChangePasswordModal opened={passwordModalOpened} onClose={() => setPasswordModalOpened(false)} />
      <AvatarUploadModal
        opened={avatarModalOpened}
        onClose={() => setAvatarModalOpened(false)}
        currentAvatar={profile.avatar}
      />
    </>
  );
};
