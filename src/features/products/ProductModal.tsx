import { Modal, TextInput, Textarea, NumberInput, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Product, CreateProductDto } from '@/types';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  stock: z.number().min(0, 'Stock must be positive'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

interface ProductModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: CreateProductDto) => void;
  product?: Product;
  isLoading?: boolean;
}

export const ProductModal = ({
  opened,
  onClose,
  onSubmit,
  product,
  isLoading,
}: ProductModalProps) => {
  const { t } = useTranslation();

  const form = useForm({
    validate: zodResolver(productSchema),
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || '',
      stock: product?.stock || 0,
      imageUrl: product?.imageUrl || '',
    },
  });

  const handleSubmit = (values: any) => {
    onSubmit(values as CreateProductDto);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={product ? t('products.edit') : t('products.create')}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label={t('products.name')}
            placeholder="Product name"
            required
            {...form.getInputProps('name')}
          />
          <Textarea
            label={t('products.description')}
            placeholder="Product description"
            required
            minRows={3}
            {...form.getInputProps('description')}
          />
          <NumberInput
            label={t('products.price')}
            placeholder="0.00"
            required
            min={0}
            decimalScale={2}
            {...form.getInputProps('price')}
          />
          <TextInput
            label={t('products.category')}
            placeholder="Category"
            required
            {...form.getInputProps('category')}
          />
          <NumberInput
            label={t('products.stock')}
            placeholder="0"
            required
            min={0}
            {...form.getInputProps('stock')}
          />
          <TextInput
            label={t('products.imageUrl')}
            placeholder="https://example.com/image.jpg"
            {...form.getInputProps('imageUrl')}
          />
          <Button type="submit" fullWidth loading={isLoading}>
            {product ? t('common.save') : t('common.create')}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
