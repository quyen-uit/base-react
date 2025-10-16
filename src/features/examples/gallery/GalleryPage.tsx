import { Container, Title, Text, SimpleGrid, Card, Image, Badge, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const galleryItems = [
  {
    id: 1,
    title: 'Mountain Landscape',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'City Skyline',
    category: 'Urban',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Ocean View',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Forest Path',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Modern Architecture',
    category: 'Urban',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    title: 'Desert Dunes',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
  },
];

export const GalleryPage = () => {
  const { t } = useTranslation();

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xs">
        {t('examples.gallery.title')}
      </Title>
      <Text c="dimmed" mb="xl">
        {t('examples.gallery.description')}
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {galleryItems.map((item) => (
          <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={item.image} height={200} alt={item.title} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{item.title}</Text>
              <Badge color="blue" variant="light">
                {item.category}
              </Badge>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
