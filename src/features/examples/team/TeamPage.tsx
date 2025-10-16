import { Container, Title, Text, SimpleGrid, Card, Avatar, Group, Stack, Badge } from '@mantine/core';
import { IconBrandLinkedin, IconBrandTwitter, IconMail } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO & Founder',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Visionary leader with 15+ years of experience',
    skills: ['Leadership', 'Strategy', 'Innovation'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Tech enthusiast driving digital transformation',
    skills: ['Technology', 'Architecture', 'AI/ML'],
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Full-stack developer passionate about clean code',
    skills: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Creating beautiful and intuitive user experiences',
    skills: ['UI/UX', 'Figma', 'Design Systems'],
  },
];

export const TeamPage = () => {
  const { t } = useTranslation();

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xs">
        {t('examples.team.title')}
      </Title>
      <Text c="dimmed" mb="xl">
        {t('examples.team.description')}
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {teamMembers.map((member) => (
          <Card key={member.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Stack align="center" mt="md">
                <Avatar src={member.avatar} size={100} radius={100} />
              </Stack>
            </Card.Section>

            <Stack gap="xs" mt="md">
              <Text fw={600} ta="center" size="lg">
                {member.name}
              </Text>
              <Text c="dimmed" ta="center" size="sm">
                {member.role}
              </Text>
              <Text size="sm" ta="center" mt="xs">
                {member.bio}
              </Text>

              <Group justify="center" gap="xs" mt="xs">
                {member.skills.map((skill) => (
                  <Badge key={skill} size="sm" variant="light">
                    {skill}
                  </Badge>
                ))}
              </Group>

              <Group justify="center" gap="md" mt="md">
                <IconBrandLinkedin size={20} style={{ cursor: 'pointer' }} />
                <IconBrandTwitter size={20} style={{ cursor: 'pointer' }} />
                <IconMail size={20} style={{ cursor: 'pointer' }} />
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
