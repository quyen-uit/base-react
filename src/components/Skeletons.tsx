import { Skeleton, Stack, Card, Group } from '@mantine/core';

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <Stack gap="sm">
      {Array.from({ length: rows }).map((_, index) => (
        <Card key={index} padding="md" radius="md">
          <Group justify="space-between">
            <Skeleton height={20} width="30%" />
            <Skeleton height={20} width="20%" />
            <Skeleton height={20} width="15%" />
            <Skeleton height={32} width={80} />
          </Group>
        </Card>
      ))}
    </Stack>
  );
};

export const CardSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <Group gap="md">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} padding="lg" radius="md" withBorder style={{ width: 300 }}>
          <Skeleton height={150} mb="md" />
          <Skeleton height={20} width="70%" mb="sm" />
          <Skeleton height={15} width="90%" mb="xs" />
          <Skeleton height={15} width="60%" />
        </Card>
      ))}
    </Group>
  );
};

export const FormSkeleton = () => {
  return (
    <Stack gap="md">
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={100} />
      <Skeleton height={40} width={120} />
    </Stack>
  );
};

export const ProfileSkeleton = () => {
  return (
    <Stack gap="md" align="center">
      <Skeleton height={120} circle />
      <Skeleton height={24} width={200} />
      <Skeleton height={16} width={150} />
      <Stack gap="xs" w="100%">
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} width="80%" />
      </Stack>
    </Stack>
  );
};
