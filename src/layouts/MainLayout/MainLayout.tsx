import { AppShell, Burger, Group, Text, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout as logoutAction } from '@/app/authSlice';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { HeaderContent } from './components/Header';
import { SidebarContent } from './components/Sidebar';

export const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
    notifications.show({
      title: t('common.success'),
      message: t('auth.logoutSuccess'),
      color: 'green',
    });
    navigate('/login');
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

          <HeaderContent isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea>
          <SidebarContent isAuthenticated={isAuthenticated} userRole={user?.role} />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
