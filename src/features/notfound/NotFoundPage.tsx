import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container size="sm" mt="xl">
      <Stack align="center" gap="md">
        <Title order={1}>404</Title>
        <Text c="dimmed" size="lg">
          {t('errors.notFound')}
        </Text>
        <Button onClick={() => navigate('/')} variant="filled">
          Go to Home
        </Button>
      </Stack>
    </Container>
  );
};
