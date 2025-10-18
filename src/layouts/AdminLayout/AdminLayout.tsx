import { AppShell, Burger, Group, Text, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout as logoutAction } from '@/app/authSlice';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { AdminHeaderContent } from './components/Header';
import { AdminSidebarContent } from './components/Sidebar';

export const AdminLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state.auth);

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

          <AdminHeaderContent user={user} onLogout={handleLogout} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea>
          <AdminSidebarContent />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
