import { useMemo, useState } from 'react';
import { ActionIcon, Button, Container, Group, Modal, Paper, Stack, Text, Title, Textarea, Badge } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconEdit, IconTrash, IconUpload } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import type { PaginationState, SortingState, ColumnFiltersState, Updater } from '@tanstack/react-table';
import 'mantine-react-table/styles.css';
import {
  useSearchColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
  useCreateManyColorsMutation,
} from '@/services/api/colors';
import type { ColorDto, ColorSpecParams, CreateColorDto } from '@/types';
import { ColorForm } from './ColorForm';
import { getApiMessage } from '@/utils/api';

const defaultParams: ColorSpecParams = {
  pageNumber: 1,
  pageSize: 6,
  sort: 'name_asc',
  filter: {},
};

export function ColorPage() {
  const [params, setParams] = useState<ColorSpecParams>(defaultParams);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<null | ColorDto>(null);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const { data, isFetching } = useSearchColorsQuery(params);

  const [createColor, { isLoading: creating }] = useCreateColorMutation();
  const [updateColor, { isLoading: updating }] = useUpdateColorMutation();
  const [deleteColor] = useDeleteColorMutation();
  const [createMany, { isLoading: creatingMany }] = useCreateManyColorsMutation();

  // Mantine React Table columns
  const columns = useMemo<MRT_ColumnDef<ColorDto>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 300,
        Cell: ({ row }) => (
          <Group gap="sm">
            <span
              style={{
                display: 'inline-block',
                width: 20,
                height: 20,
                borderRadius: 4,
                backgroundColor: row.original.hexCode,
                border: '1px solid var(--mantine-color-gray-4)',
              }}
            />
            <Text fw={500}>{row.original.name}</Text>
          </Group>
        ),
        filterFn: 'contains',
      },
      {
        accessorKey: 'hexCode',
        header: 'Hex',
        size: 160,
        Cell: ({ cell }) => <Badge variant="light">{cell.getValue<string>()}</Badge>,
        filterFn: 'contains',
      },
    ],
    []
  );

  // Table state for manual server-side features
  const [pageIndex, setPageIndex] = useState((params.pageNumber ?? 1) - 1);
  const [pageSize, setPageSize] = useState(params.pageSize ?? 6);
  const [sorting, setSorting] = useState<SortingState>(
    params.sort === 'name_desc' ? [{ id: 'name', desc: true }] : [{ id: 'name', desc: false }]
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    ...(params.filter?.name ? [{ id: 'name', value: params.filter.name }] : []),
    ...(params.filter?.hexCode ? [{ id: 'hexCode', value: params.filter.hexCode }] : []),
  ]);

  // Sync API params when table state changes
  const syncParams = (next: {
    pageIndex?: number;
    pageSize?: number;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
  }) => {
    const pi = next.pageIndex ?? pageIndex;
    const ps = next.pageSize ?? pageSize;
    const so = next.sorting ?? sorting;
    const cf = next.columnFilters ?? columnFilters;

    const firstSort = so[0];
    const sort: 'name_asc' | 'name_desc' = firstSort && firstSort.id === 'name' && firstSort.desc ? 'name_desc' : 'name_asc';

    const filter: Record<string, string> = {};
    cf.forEach((f) => {
      if (f.id === 'name' && typeof f.value === 'string') filter.name = f.value;
      if (f.id === 'hexCode' && typeof f.value === 'string') filter.hexCode = f.value;
    });

    setParams({
      pageNumber: pi + 1,
      pageSize: ps,
      sort,
      filter,
    });
  };

  const table = useMantineReactTable<ColorDto>({
    columns,
    data: data?.data ?? [],
    state: {
      isLoading: isFetching,
      pagination: { pageIndex, pageSize },
      sorting,
      columnFilters,
    },
    onPaginationChange: (updater: Updater<PaginationState>) => {
      const next = typeof updater === 'function' ? (updater as (old: PaginationState) => PaginationState)({ pageIndex, pageSize }) : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
      syncParams({ pageIndex: next.pageIndex, pageSize: next.pageSize });
    },
    onSortingChange: (updater: Updater<SortingState>) => {
      const next = typeof updater === 'function' ? (updater as (old: SortingState) => SortingState)(sorting) : updater;
      setSorting(next);
      syncParams({ sorting: next });
    },
    onColumnFiltersChange: (updater: Updater<ColumnFiltersState>) => {
      const next = typeof updater === 'function' ? (updater as (old: ColumnFiltersState) => ColumnFiltersState)(columnFilters) : updater;
      setColumnFilters(next);
      syncParams({ columnFilters: next });
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: data?.pageCount ?? 0,
    enableColumnFilters: true,
    enableGlobalFilter: false,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Group gap="xs">
        <ActionIcon variant="subtle" onClick={() => setEditOpen(row.original)} aria-label="Edit">
          <IconEdit size={18} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() =>
            modals.openConfirmModal({
              title: 'Delete Color',
              children: <Text>Are you sure you want to delete {row.original.name}?</Text>,
              labels: { confirm: 'Delete', cancel: 'Cancel' },
              confirmProps: { color: 'red' },
              onConfirm: async () => {
                try {
                  await deleteColor(row.original.id).unwrap();
                  notifications.show({ color: 'green', message: 'Deleted' });
                } catch (e: unknown) {
                  notifications.show({ color: 'red', message: getApiMessage(e, 'Delete failed') });
                }
              },
            })
          }
          aria-label="Delete"
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    ),
    renderTopToolbarCustomActions: () => (
      <Group gap="xs">
        <Button leftSection={<IconUpload size={16} />} variant="light" onClick={() => setBulkOpen(true)}>
          Bulk Create
        </Button>
        <Button leftSection={<IconPlus size={16} />} onClick={() => setCreateOpen(true)}>
          New Color
        </Button>
      </Group>
    ),
    mantineTableContainerProps: { style: { maxHeight: 520 } },
    mantineTableProps: { striped: 'odd', highlightOnHover: true, withTableBorder: true },
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Colors</Title>
            <Text c="dimmed">Manage color records</Text>
          </div>
          <Group>
            <Button leftSection={<IconUpload size={16} />} variant="light" onClick={() => setBulkOpen(true)}>
              Bulk Create
            </Button>
            <Button leftSection={<IconPlus size={16} />} onClick={() => setCreateOpen(true)}>
              New Color
            </Button>
          </Group>
        </Group>

        <Paper withBorder radius="md" p={0}>
          <MantineReactTable table={table} />
        </Paper>

        {/* Create Modal */}
        <Modal opened={createOpen} onClose={() => setCreateOpen(false)} title="Create Color">
          <ColorForm
            onSubmit={async (values) => {
              try {
                await createColor(values as CreateColorDto).unwrap();
                notifications.show({ color: 'green', message: 'Created' });
                setCreateOpen(false);
              } catch (e: unknown) {
                notifications.show({ color: 'red', message: getApiMessage(e, 'Create failed') });
              }
            }}
            loading={creating}
            submitLabel="Create"
          />
        </Modal>

        {/* Edit Modal */}
        <Modal opened={!!editOpen} onClose={() => setEditOpen(null)} title="Edit Color">
          {editOpen && (
            <ColorForm
              defaultValues={editOpen}
              onSubmit={async (values) => {
                try {
                  await updateColor({ ...values, id: editOpen.id }).unwrap();
                  notifications.show({ color: 'green', message: 'Updated' });
                  setEditOpen(null);
                } catch (e: unknown) {
                  notifications.show({ color: 'red', message: getApiMessage(e, 'Update failed') });
                }
              }}
              loading={updating}
              submitLabel="Update"
            />
          )}
        </Modal>

        {/* Bulk Create Modal */}
        <Modal opened={bulkOpen} onClose={() => setBulkOpen(false)} title="Bulk Create Colors">
          <Stack>
            <Text c="dimmed" size="sm">
              Paste a JSON array of items with name and hexCode fields.
            </Text>
            <Textarea minRows={8} value={bulkText} onChange={(e) => setBulkText(e.currentTarget.value)} />
            <Group justify="flex-end">
              <Button
                loading={creatingMany}
                onClick={async () => {
                  try {
                    const parsed = JSON.parse(bulkText) as CreateColorDto[];
                    if (!Array.isArray(parsed)) throw new Error('Not an array');
                    await createMany(parsed).unwrap();
                    notifications.show({ color: 'green', message: 'Bulk created' });
                    setBulkOpen(false);
                    setBulkText('');
                  } catch (e: unknown) {
                    notifications.show({ color: 'red', message: getApiMessage(e, 'Bulk failed') });
                  }
                }}
              >
                Create
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}

export default ColorPage;
