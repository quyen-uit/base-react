import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { useAppDispatch } from '../../app/hooks';
import { setCredentials } from '../../app/authSlice';
import { useRegisterMutation } from '@/services';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [apiError, setApiError] = useState<string>('');

  const form = useForm({
    validate: zodResolver(registerSchema),
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setApiError('');
      const { confirmPassword, ...registerData } = values;
      const response = await register(registerData).unwrap();
      dispatch(setCredentials(response));
      notifications.show({
        title: t('common.success'),
        message: t('auth.registerSuccess'),
        color: 'green',
      });
      navigate('/dashboard');
    } catch (error: any) {
      const message = error?.data?.message || 'Registration failed';
      setApiError(message);
      notifications.show({
        title: t('common.error'),
        message,
        color: 'red',
      });
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">{t('auth.registerTitle')}</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {t('auth.registerSubtitle')}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {apiError && (
              <Text c="red" size="sm">
                {apiError}
              </Text>
            )}
            <TextInput label={t('auth.name')} placeholder="John Doe" required {...form.getInputProps('name')} />
            <TextInput
              label={t('auth.email')}
              placeholder="you@example.com"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label={t('auth.password')}
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label={t('auth.confirmPassword')}
              placeholder="Confirm password"
              required
              {...form.getInputProps('confirmPassword')}
            />
            <Button type="submit" fullWidth loading={isLoading}>
              {t('auth.register')}
            </Button>
          </Stack>
        </form>

        <Text c="dimmed" size="sm" ta="center" mt={20}>
          {t('auth.haveAccount')}{' '}
          <Anchor size="sm" component={Link} to="/login">
            {t('auth.login')}
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
};
