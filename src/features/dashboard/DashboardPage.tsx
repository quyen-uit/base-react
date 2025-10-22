import { Container, Title, Text, SimpleGrid, Paper, Group, ThemeIcon } from '@mantine/core';
import { IconUsers, IconPackage, IconCurrencyDollar, IconShoppingCart } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    {
      title: t('dashboard.stats.totalProducts'),
      value: '156',
      icon: <IconPackage size={24} />,
      color: 'blue',
    },
    {
      title: t('dashboard.stats.totalUsers'),
      value: '1,234',
      icon: <IconUsers size={24} />,
      color: 'teal',
    },
    {
      title: t('dashboard.stats.revenue'),
      value: '$45,678',
      icon: <IconCurrencyDollar size={24} />,
      color: 'green',
    },
    {
      title: t('dashboard.stats.orders'),
      value: '89',
      icon: <IconShoppingCart size={24} />,
      color: 'orange',
    },
  ];

  return (
    <Container size="xl">
      <Title order={1} mb="md">
        {t('dashboard.welcome')}, {user?.name}!
      </Title>
      <Text c="dimmed" mb="xl">
        Here's what's happening with your account today.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {stats.map((stat, index) => (
          <Paper key={index} shadow="sm" p="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm" mb="xs">
                  {stat.title}
                </Text>
                <Text size="xl" fw={700}>
                  {stat.value}
                </Text>
              </div>
              <ThemeIcon color={stat.color} size="xl" radius="md" variant="light">
                {stat.icon}
              </ThemeIcon>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
};
