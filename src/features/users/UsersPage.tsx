import { Container, Paper, Text, Group, Button, Table, Avatar, Badge, ActionIcon, TextInput, Select, Stack } from '@mantine/core';
import { IconSearch, IconEdit, IconTrash, IconUserPlus } from '@tabler/icons-react';
import { useState } from 'react';

export const UsersPage = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>('all');

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      lastActive: '1 day ago',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'user',
      status: 'inactive',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      lastActive: '1 week ago',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      role: 'guest',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastActive: '5 hours ago',
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'user',
      status: 'active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      lastActive: '3 hours ago',
    },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'red';
      case 'user':
        return 'blue';
      case 'guest':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' ? 'green' : 'gray';
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const rows = filteredUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar src={user.avatar} size={36} radius="xl" />
          <div>
            <Text size="sm" fw={500}>
              {user.name}
            </Text>
            <Text size="xs" c="dimmed">
              {user.email}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color={getRoleBadgeColor(user.role)} variant="light">
          {user.role.toUpperCase()}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusBadgeColor(user.status)} variant="dot">
          {user.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {user.lastActive}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="flex-end">
          <ActionIcon variant="subtle" color="blue">
            <IconEdit size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Page Header */}
        <Group justify="space-between">
          <div>
            <Text size="xl" fw={700}>
              User Management
            </Text>
            <Text size="sm" c="dimmed">
              Manage your application users and their permissions
            </Text>
          </div>
          <Button leftSection={<IconUserPlus size={18} />}>
            Add User
          </Button>
        </Group>

        {/* Filters */}
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group>
            <TextInput
              placeholder="Search users..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              style={{ flex: 1 }}
            />
            <Select
              placeholder="Filter by role"
              value={roleFilter}
              onChange={setRoleFilter}
              data={[
                { value: 'all', label: 'All Roles' },
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'guest', label: 'Guest' },
              ]}
              style={{ width: 200 }}
            />
          </Group>
        </Paper>

        {/* Users Table */}
        <Paper shadow="sm" radius="md" withBorder>
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="md" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Last Active</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Paper>

        {/* Stats */}
        <Group grow>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Total Users
            </Text>
            <Text size="xl" fw={700} mt="xs">
              {users.length}
            </Text>
          </Paper>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Active Users
            </Text>
            <Text size="xl" fw={700} mt="xs">
              {users.filter((u) => u.status === 'active').length}
            </Text>
          </Paper>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Admins
            </Text>
            <Text size="xl" fw={700} mt="xs">
              {users.filter((u) => u.role === 'admin').length}
            </Text>
          </Paper>
        </Group>
      </Stack>
    </Container>
  );
};
