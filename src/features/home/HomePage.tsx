import { Container, Title, Text, Button, SimpleGrid, Card, Stack } from '@mantine/core';
import { IconLock, IconShield, IconPalette, IconWorld } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';

export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state: any) => state.auth);

  const features = [
    {
      icon: <IconLock size={40} />,
      title: t('home.features.auth.title'),
      description: t('home.features.auth.description'),
    },
    {
      icon: <IconShield size={40} />,
      title: t('home.features.rbac.title'),
      description: t('home.features.rbac.description'),
    },
    {
      icon: <IconPalette size={40} />,
      title: t('home.features.theme.title'),
      description: t('home.features.theme.description'),
    },
    {
      icon: <IconWorld size={40} />,
      title: t('home.features.i18n.title'),
      description: t('home.features.i18n.description'),
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack align="center" gap="xl" mb="xl">
        <Title order={1} ta="center" size={48}>
          {t('home.welcome')}
        </Title>
        <Text size="xl" c="dimmed" ta="center" maw={600}>
          {t('home.subtitle')}
        </Text>
        <Button
          size="lg"
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
        >
          {t('home.getStarted')}
        </Button>
      </Stack>

      <Title order={2} ta="center" mb="xl">
        {t('home.features.title')}
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {features.map((feature, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack align="center" gap="md">
              {feature.icon}
              <Title order={3} size="h4" ta="center">
                {feature.title}
              </Title>
              <Text size="sm" c="dimmed" ta="center">
                {feature.description}
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
