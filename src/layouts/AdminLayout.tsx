import { AppShell, Burger, Button, Group, Menu, Text, ActionIcon, NavLink } from '@mantine/core';
import { useDisclosure, useColorScheme, useLocalStorage } from '@mantine/hooks';
import {
  IconMoon,
  IconSun,
  IconLogout,
  IconUser,
  IconLanguage,
  IconDashboard,
  IconPackage,
  IconSettings,
} from '@tabler/icons-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout as logoutAction } from '../app/authSlice';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export const AdminLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state.auth);
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
        width: 250,
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
              {t('nav.admin')}
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

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="default" leftSection={<IconUser size={16} />}>
                  {user?.name}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => navigate('/')}>{t('nav.home')}</Menu.Item>
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
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          label={t('nav.dashboard')}
          leftSection={<IconDashboard size={20} />}
          active={location.pathname === '/admin'}
          onClick={() => navigate('/admin')}
        />
        <NavLink
          label={t('nav.products')}
          leftSection={<IconPackage size={20} />}
          active={location.pathname === '/admin/products'}
          onClick={() => navigate('/admin/products')}
        />
        <NavLink
          label={t('nav.settings')}
          leftSection={<IconSettings size={20} />}
          active={location.pathname === '/admin/settings'}
          onClick={() => navigate('/admin/settings')}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
