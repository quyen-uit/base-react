import { AppShell, Burger, Button, Group, Menu, Text, ActionIcon } from '@mantine/core';
import { useDisclosure, useColorScheme, useLocalStorage } from '@mantine/hooks';
import { IconMoon, IconSun, IconLogout, IconUser, IconLanguage } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout as logoutAction } from '../app/authSlice';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state: any) => state.auth);
  const colorScheme = useColorScheme();
  const [, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: colorScheme,
  });

  const handleLogout = () => {
    dispatch(logoutAction());
    notifications.show({
      title: t('common.success'),
      message: t('auth.logoutSuccess'),
      color: 'green',
    });
    navigate('/login');
  };

  const toggleTheme = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="xl" fw={700}>
              {t('common.appName')}
            </Text>
          </Group>

          <Group>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="default" size="lg">
                  <IconLanguage size={20} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => changeLanguage('en')}>{t('language.en')}</Menu.Item>
                <Menu.Item onClick={() => changeLanguage('vi')}>{t('language.vi')}</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <ActionIcon variant="default" onClick={toggleTheme} size="lg">
              {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>

            {isAuthenticated && user ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="default" leftSection={<IconUser size={16} />}>
                    {user.name}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => navigate('/profile')}>{t('nav.profile')}</Menu.Item>
                  {user.role === 'admin' && (
                    <Menu.Item onClick={() => navigate('/admin')}>{t('nav.admin')}</Menu.Item>
                  )}
                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={16} />}
                    onClick={handleLogout}
                  >
                    {t('auth.logout')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button onClick={() => navigate('/login')}>{t('auth.login')}</Button>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Button variant="subtle" onClick={() => navigate('/')} fullWidth>
          {t('nav.home')}
        </Button>
        {isAuthenticated && (
          <>
            <Button variant="subtle" onClick={() => navigate('/dashboard')} fullWidth>
              {t('nav.dashboard')}
            </Button>
            <Button variant="subtle" onClick={() => navigate('/products')} fullWidth>
              {t('nav.products')}
            </Button>
          </>
        )}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
