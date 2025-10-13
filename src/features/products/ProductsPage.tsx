import { useState } from 'react';
import {
  Container,
  Title,
  Button,
  Table,
  ActionIcon,
  Group,
  Text,
  Paper,
  LoadingOverlay,
  TextInput,
} from '@mantine/core';
import { IconEdit, IconTrash, IconPlus, IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '@/services';
import { Product, CreateProductDto } from '@/types';
import { ProductModal } from './components/ProductModal';

export const ProductsPage = () => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetProductsQuery({ search });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleCreate = async (values: CreateProductDto) => {
    try {
      await createProduct(values).unwrap();
      notifications.show({
        title: t('common.success'),
        message: t('products.createSuccess'),
        color: 'green',
      });
      setOpened(false);
    } catch (error: any) {
      notifications.show({
        title: t('common.error'),
        message: error?.data?.message || 'Failed to create product',
        color: 'red',
      });
    }
  };

  const handleUpdate = async (values: CreateProductDto) => {
    if (!selectedProduct) return;
    try {
      await updateProduct({ id: selectedProduct.id, ...values }).unwrap();
      notifications.show({
        title: t('common.success'),
        message: t('products.updateSuccess'),
        color: 'green',
      });
      setOpened(false);
      setSelectedProduct(undefined);
    } catch (error: any) {
      notifications.show({
        title: t('common.error'),
        message: error?.data?.message || 'Failed to update product',
        color: 'red',
      });
    }
  };

  const handleDelete = (product: Product) => {
    modals.openConfirmModal({
      title: t('products.delete'),
      children: <Text size="sm">{t('products.deleteConfirm')}</Text>,
      labels: { confirm: t('common.delete'), cancel: t('common.cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteProduct(product.id).unwrap();
          notifications.show({
            title: t('common.success'),
            message: t('products.deleteSuccess'),
            color: 'green',
          });
        } catch (error: any) {
          notifications.show({
            title: t('common.error'),
            message: error?.data?.message || 'Failed to delete product',
            color: 'red',
          });
        }
      },
    });
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
    setSelectedProduct(undefined);
  };

  return (
    <Container size="xl">
      <LoadingOverlay visible={isLoading} />
      <Group justify="space-between" mb="md">
        <Title order={2}>{t('products.title')}</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => setOpened(true)}>
          {t('products.create')}
        </Button>
      </Group>

      <Paper shadow="sm" p="md" mb="md">
        <TextInput
          placeholder={t('common.search')}
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Paper>

      <Paper shadow="sm" p="md">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('products.name')}</Table.Th>
              <Table.Th>{t('products.category')}</Table.Th>
              <Table.Th>{t('products.price')}</Table.Th>
              <Table.Th>{t('products.stock')}</Table.Th>
              <Table.Th>{t('common.actions')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.products?.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{product.category}</Table.Td>
                <Table.Td>${product.price.toFixed(2)}</Table.Td>
                <Table.Td>{product.stock}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon variant="light" color="blue" onClick={() => handleEdit(product)}>
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="red" onClick={() => handleDelete(product)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {!isLoading && (!data?.products || data.products.length === 0) && (
          <Text ta="center" c="dimmed" py="xl">
            No products found
          </Text>
        )}
      </Paper>

      <ProductModal
        opened={opened}
        onClose={handleClose}
        onSubmit={selectedProduct ? handleUpdate : handleCreate}
        product={selectedProduct}
        isLoading={isCreating || isUpdating}
      />
    </Container>
  );
};
