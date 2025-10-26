import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Stack, TextInput, ColorInput } from '@mantine/core';
import type { CreateColorDto } from '@/types';

const colorSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Name is required').max(20, 'Max 20 characters'),
  hexCode: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Must be #RGB or #RRGGBB'),
});

export type ColorFormValues = z.infer<typeof colorSchema>;

interface ColorFormProps {
  defaultValues?: Partial<CreateColorDto>;
  onSubmit: (values: CreateColorDto) => void | Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}

export function ColorForm({ defaultValues, onSubmit, submitLabel = 'Save', loading }: ColorFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      id: defaultValues?.id,
      name: defaultValues?.name ?? '',
      hexCode: defaultValues?.hexCode ?? '#000000',
    },
  });
  const hex = useWatch({ control, name: 'hexCode' });

  return (
    <form onSubmit={handleSubmit((v) => onSubmit(v))}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="e.g. Red"
          {...register('name')}
          error={errors.name?.message}
          withAsterisk
        />
        <Group align="end" grow>
          <TextInput
            label="Hex Code"
            placeholder="#FF0000"
            {...register('hexCode')}
            error={errors.hexCode?.message}
            withAsterisk
          />
          <ColorInput
            label="Pick"
            format="hex"
            withPicker
            onChange={(val: string) => setValue('hexCode', val || '#000000', { shouldValidate: true })}
            value={hex}
          />
        </Group>
        <Group justify="flex-end">
          <Button type="submit" loading={loading}>
            {submitLabel}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
