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
import { useLoginMutation } from '@/services';
import { getApiMessage } from '@/utils/api';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState<string>('');

  const form = useForm({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setApiError('');
      const response = await login(values).unwrap();
      dispatch(setCredentials(response));
      notifications.show({
        title: t('common.success'),
        message: t('auth.loginSuccess'),
        color: 'green',
      });
      navigate('/dashboard');
    } catch (error: unknown) {
      const message = getApiMessage(error, t('auth.invalidCredentials'));
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
      <Title ta="center">{t('auth.loginTitle')}</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {t('auth.loginSubtitle')}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {apiError && (
              <Text c="red" size="sm">
                {apiError}
              </Text>
            )}
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
            <Button type="submit" fullWidth loading={isLoading}>
              {t('auth.login')}
            </Button>
          </Stack>
        </form>

        <Text c="dimmed" size="sm" ta="center" mt={20}>
          {t('auth.noAccount')}{' '}
          <Anchor size="sm" component={Link} to="/register">
            {t('auth.register')}
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
};
