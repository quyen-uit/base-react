import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { UserRole } from '@/types';
import { hasRole } from '@/utils';
import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { LoadingSpinner } from '@/components';
import { useTranslation } from 'react-i18next';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { t } = useTranslation();
  const { isAuthenticated, user, initialized } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!initialized) {
    return (
      <Container size="sm" mt="xl">
        <LoadingSpinner />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !hasRole(user.role, allowedRoles)) {
    return (
      <Container size="sm" mt="xl">
        <Stack align="center" gap="md">
          <Title order={1}>{t('errors.unauthorized')}</Title>
          <Text c="dimmed" size="lg">
            You don't have permission to access this page.
          </Text>
          <Button component="a" href="/" variant="filled">
            Go to Home
          </Button>
        </Stack>
      </Container>
    );
  }

  return <>{children}</>;
};
import type { FC, ReactNode } from 'react';
