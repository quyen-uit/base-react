import { Container, Grid, Paper, Text, Group, RingProgress, Stack, SimpleGrid, Card, Badge } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown, IconUsers, IconShoppingCart, IconCoin, IconChartBar } from '@tabler/icons-react';

export const AnalyticsPage = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      trend: 'up',
      icon: IconCoin,
      color: 'teal',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: IconShoppingCart,
      color: 'blue',
    },
    {
      title: 'Active Users',
      value: '8,549',
      change: '-2.1%',
      trend: 'down',
      icon: IconUsers,
      color: 'violet',
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+0.5%',
      trend: 'up',
      icon: IconChartBar,
      color: 'orange',
    },
  ];

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Page Header */}
        <Group justify="space-between">
          <div>
            <Text size="xl" fw={700}>
              Analytics Dashboard
            </Text>
            <Text size="sm" c="dimmed">
              Overview of your business metrics and performance
            </Text>
          </div>
        </Group>

        {/* Stats Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {stats.map((stat) => (
            <Card key={stat.title} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <stat.icon size={32} stroke={1.5} color={`var(--mantine-color-${stat.color}-6)`} />
                <Badge
                  color={stat.trend === 'up' ? 'green' : 'red'}
                  variant="light"
                  leftSection={
                    stat.trend === 'up' ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />
                  }
                >
                  {stat.change}
                </Badge>
              </Group>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb="xs">
                {stat.title}
              </Text>
              <Text size="xl" fw={700}>
                {stat.value}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* Charts Section */}
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper shadow="sm" p="xl" radius="md" withBorder>
              <Text size="lg" fw={600} mb="md">
                Revenue Overview
              </Text>
              <Stack align="center" justify="center" h={300}>
                <IconChartBar size={64} stroke={1} color="var(--mantine-color-gray-4)" />
                <Text c="dimmed" size="sm">
                  Chart visualization would go here
                </Text>
                <Text c="dimmed" size="xs">
                  (Integrate with recharts, chart.js, or other charting library)
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper shadow="sm" p="xl" radius="md" withBorder h="100%">
              <Text size="lg" fw={600} mb="md">
                Sales Distribution
              </Text>
              <Stack align="center" gap="lg" pt="md">
                <RingProgress
                  size={180}
                  thickness={20}
                  sections={[
                    { value: 40, color: 'blue', tooltip: 'Electronics - 40%' },
                    { value: 25, color: 'teal', tooltip: 'Clothing - 25%' },
                    { value: 20, color: 'orange', tooltip: 'Food - 20%' },
                    { value: 15, color: 'violet', tooltip: 'Others - 15%' },
                  ]}
                  label={
                    <Text size="xs" ta="center" fw={600}>
                      100%
                    </Text>
                  }
                />
                <Stack gap="xs" w="100%">
                  <Group justify="space-between">
                    <Group gap="xs">
                      <div style={{ width: 12, height: 12, backgroundColor: 'var(--mantine-color-blue-6)', borderRadius: 2 }} />
                      <Text size="sm">Electronics</Text>
                    </Group>
                    <Text size="sm" fw={600}>40%</Text>
                  </Group>
                  <Group justify="space-between">
                    <Group gap="xs">
                      <div style={{ width: 12, height: 12, backgroundColor: 'var(--mantine-color-teal-6)', borderRadius: 2 }} />
                      <Text size="sm">Clothing</Text>
                    </Group>
                    <Text size="sm" fw={600}>25%</Text>
                  </Group>
                  <Group justify="space-between">
                    <Group gap="xs">
                      <div style={{ width: 12, height: 12, backgroundColor: 'var(--mantine-color-orange-6)', borderRadius: 2 }} />
                      <Text size="sm">Food</Text>
                    </Group>
                    <Text size="sm" fw={600}>20%</Text>
                  </Group>
                  <Group justify="space-between">
                    <Group gap="xs">
                      <div style={{ width: 12, height: 12, backgroundColor: 'var(--mantine-color-violet-6)', borderRadius: 2 }} />
                      <Text size="sm">Others</Text>
                    </Group>
                    <Text size="sm" fw={600}>15%</Text>
                  </Group>
                </Stack>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Recent Activity */}
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Text size="lg" fw={600} mb="md">
            Recent Activity
          </Text>
          <Stack gap="md">
            {[
              { action: 'New order received', time: '2 minutes ago', user: 'John Doe', badge: 'success' },
              { action: 'Product updated', time: '15 minutes ago', user: 'Jane Smith', badge: 'info' },
              { action: 'User registered', time: '1 hour ago', user: 'Mike Johnson', badge: 'success' },
              { action: 'Payment failed', time: '2 hours ago', user: 'Sarah Williams', badge: 'error' },
            ].map((activity, index) => (
              <Group key={index} justify="space-between" wrap="nowrap">
                <Group gap="md" wrap="nowrap">
                  <Badge
                    color={
                      activity.badge === 'success'
                        ? 'green'
                        : activity.badge === 'error'
                        ? 'red'
                        : 'blue'
                    }
                    variant="dot"
                  />
                  <div>
                    <Text size="sm" fw={500}>
                      {activity.action}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {activity.user}
                    </Text>
                  </div>
                </Group>
                <Text size="xs" c="dimmed">
                  {activity.time}
                </Text>
              </Group>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
