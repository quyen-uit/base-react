import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Stack, Group, Button } from '@mantine/core';
import {
  IconCode,
  IconPalette,
  IconCloud,
  IconShieldCheck,
  IconChartBar,
  IconDeviceMobile,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Build modern, responsive web applications with the latest technologies',
    icon: IconCode,
    color: 'blue',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Create beautiful and intuitive user interfaces that delight users',
    icon: IconPalette,
    color: 'pink',
  },
  {
    id: 3,
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure and deployment solutions',
    icon: IconCloud,
    color: 'cyan',
  },
  {
    id: 4,
    title: 'Security',
    description: 'Comprehensive security solutions to protect your applications',
    icon: IconShieldCheck,
    color: 'green',
  },
  {
    id: 5,
    title: 'Analytics',
    description: 'Data-driven insights to help you make better decisions',
    icon: IconChartBar,
    color: 'orange',
  },
  {
    id: 6,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications',
    icon: IconDeviceMobile,
    color: 'violet',
  },
];

export const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xs">
        {t('examples.services.title')}
      </Title>
      <Text c="dimmed" mb="xl">
        {t('examples.services.description')}
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <ThemeIcon size={60} radius="md" variant="light" color={service.color}>
                  <Icon size={30} />
                </ThemeIcon>

                <div>
                  <Text fw={600} size="lg" mb="xs">
                    {service.title}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {service.description}
                  </Text>
                </div>

                <Group justify="flex-end">
                  <Button variant="light" color={service.color} size="sm">
                    Learn More
                  </Button>
                </Group>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};
