import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import 'mantine-react-table/styles.css';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconEdit, IconEye, IconTrash, IconUserPlus, IconDownload } from '@tabler/icons-react';

type UserRow = {
  id: number;
  avatarColor: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
  status: 'Active' | 'Invited' | 'Suspended';
  signupDate: string; // ISO date
  activityScore: number; // 0-100
};

const names = [
  'Olivia',
  'Liam',
  'Emma',
  'Noah',
  'Ava',
  'Sophia',
  'Isabella',
  'Mia',
  'Amelia',
  'Harper',
  'Ethan',
  'Logan',
  'Mason',
  'Lucas',
  'Elijah',
];

const surnames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
];

const roles: Array<UserRow['role']> = ['Admin', 'Manager', 'User'];
const statuses: Array<UserRow['status']> = ['Active', 'Invited', 'Suspended'];
const avatarColors = ['#845EF7', '#15AABF', '#FA5252', '#FCC419', '#12B886', '#5C7CFA'];

const makeMockData = (count = 50): UserRow[] => {
  const data: UserRow[] = [];
  for (let i = 1; i <= count; i++) {
    const first = names[Math.floor(Math.random() * names.length)];
    const last = surnames[Math.floor(Math.random() * surnames.length)];
    const full = `${first} ${last}`;
    const role = roles[Math.floor(Math.random() * roles.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const daysAgo = Math.floor(Math.random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    data.push({
      id: i,
      avatarColor: avatarColors[i % avatarColors.length],
      name: full,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      role,
      status,
      signupDate: date.toISOString(),
      activityScore: Math.floor(Math.random() * 101),
    });
  }
  return data;
};

function exportToCsv(rows: UserRow[], filename = 'users.csv') {
  const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Signup Date', 'Activity Score'];
  const csv = [
    headers.join(','),
    ...rows.map((r) =>
      [
        r.id,
        JSON.stringify(r.name),
        r.email,
        r.role,
        r.status,
        new Date(r.signupDate).toLocaleDateString(),
        r.activityScore,
      ].join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function MrtTablePage() {
  const [data, setData] = useState<UserRow[]>(() => makeMockData(60));

  const columns = useMemo<MRT_ColumnDef<UserRow>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
        enableColumnFilter: false,
      },
      {
        id: 'user',
        header: 'User',
        size: 280,
        accessorFn: (row) => row.name,
        Cell: ({ row }) => (
          <Group gap="sm">
            <Avatar size={28} radius="xl" color={row.original.avatarColor}>
              {row.original.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </Avatar>
            <Stack gap={0}>
              <Text fw={600}>{row.original.name}</Text>
              <Text size="xs" c="dimmed">
                {row.original.email}
              </Text>
            </Stack>
          </Group>
        ),
        filterVariant: 'autocomplete',
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 120,
        filterVariant: 'select',
        mantineFilterSelectProps: {
          data: roles,
        },
        Cell: ({ cell }) => <Badge variant="light">{cell.getValue<string>()}</Badge>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        filterVariant: 'select',
        mantineFilterSelectProps: {
          data: statuses,
        },
        Cell: ({ cell }) => {
          const v = cell.getValue<'Active' | 'Invited' | 'Suspended'>();
          const color = v === 'Active' ? 'teal' : v === 'Invited' ? 'yellow' : 'red';
          return <Badge color={color}>{v}</Badge>;
        },
      },
      {
        accessorKey: 'signupDate',
        header: 'Signup',
        size: 120,
        accessorFn: (row) => new Date(row.signupDate),
        Cell: ({ cell }) => (
          <Text size="sm">{new Date(cell.getValue<Date>()).toLocaleDateString()}</Text>
        ),
        filterVariant: 'date-range',
      },
      {
        accessorKey: 'activityScore',
        header: 'Activity',
        size: 110,
        Cell: ({ cell }) => <Badge variant="outline">{cell.getValue<number>()}</Badge>,
        filterVariant: 'range',
      },
    ],
    []
  );

  const table = useMantineReactTable<UserRow>({
    columns,
    data,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableStickyHeader: true,
    enableSorting: true,
    enableRowActions: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableFullScreenToggle: true,
    enableDensityToggle: true,
    positionActionsColumn: 'last',
    initialState: {
      showGlobalFilter: true,
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [{ id: 'signupDate', desc: true }],
      columnVisibility: { id: false },
    },
    renderRowActions: ({ row }) => (
      <Group gap="xs">
        <ActionIcon variant="subtle" color="blue" aria-label="View" onClick={() => alert(`Viewing ${row.original.name}`)}>
          <IconEye size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="grape" aria-label="Edit" onClick={() => alert(`Editing ${row.original.name}`)}>
          <IconEdit size={18} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="red"
          aria-label="Delete"
          onClick={() => setData((prev) => prev.filter((r) => r.id !== row.original.id))}
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Group gap="xs">
        <Button
          leftSection={<IconUserPlus size={16} />}
          onClick={() => {
            const nextId = (data[data.length - 1]?.id ?? 0) + 1;
            const [first] = names;
            const [last] = surnames;
            setData((prev) => [
              {
                id: nextId,
                avatarColor: avatarColors[nextId % avatarColors.length],
                name: `${first} ${last}`,
                email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
                role: 'User',
                status: 'Invited',
                signupDate: new Date().toISOString(),
                activityScore: 50,
              },
              ...prev,
            ]);
          }}
        >
          Add User
        </Button>
        <Button variant="light" leftSection={<IconDownload size={16} />} onClick={() => exportToCsv(table.getPrePaginationRowModel().rows.map((r) => r.original))}>
          Export CSV
        </Button>
      </Group>
    ),
    mantineTableContainerProps: { style: { maxHeight: 520 } },
    mantineTableProps: { striped: 'odd', highlightOnHover: true, withTableBorder: true },
    mantinePaginationProps: { radius: 'md' },
  });

  return (
    <Card shadow="sm" radius="md" withBorder>
      <Stack>
        <div>
          <Title order={2} style={{ lineHeight: 1 }}>
            Beautiful Users Table
          </Title>
          <Text c="dimmed">Built with Mantine React Table and mock data</Text>
        </div>
        <MantineReactTable table={table} />
      </Stack>
    </Card>
  );
}

export default MrtTablePage;
