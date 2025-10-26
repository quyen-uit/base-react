import { Stack, Box, Text, NavLink, Divider } from '@mantine/core';
import {
  IconHome,
  IconDashboard,
  IconPackage,
  IconSettings,
  IconUsers,
  IconChartBar,
  IconChevronRight,
  IconPalette,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const AdminSidebarContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack gap="xs">
      {/* Navigation Section */}
      <Box>
        <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb="xs" pl="xs">
          {t('nav.sections.navigation')}
        </Text>
        <NavLink
          label={t('nav.home')}
          leftSection={<IconHome size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          onClick={() => navigate('/')}
          variant="subtle"
        />
      </Box>

      <Divider />

      {/* Dashboard Section */}
      <Box>
        <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb="xs" pl="xs">
          {t('nav.sections.dashboard')}
        </Text>
        <NavLink
          label={t('nav.dashboard')}
          leftSection={<IconDashboard size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          active={location.pathname === '/admin'}
          onClick={() => navigate('/admin')}
          variant="subtle"
        />
        <NavLink
          label={t('nav.analytics')}
          leftSection={<IconChartBar size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          active={location.pathname === '/admin/analytics'}
          onClick={() => navigate('/admin/analytics')}
          variant="subtle"
        />
      </Box>

      <Divider />

      {/* Management Section */}
      <Box>
        <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb="xs" pl="xs">
          {t('nav.sections.management')}
        </Text>
        <NavLink
          label={t('nav.products')}
          leftSection={<IconPackage size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          active={location.pathname === '/admin/products'}
          onClick={() => navigate('/admin/products')}
          variant="subtle"
        />
        <NavLink
          label={t('nav.colors')}
          leftSection={<IconPalette size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          active={location.pathname === '/admin/colors'}
          onClick={() => navigate('/admin/colors')}
          variant="subtle"
        />
        <NavLink
          label={t('nav.users')}
          leftSection={<IconUsers size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          active={location.pathname === '/admin/users'}
          onClick={() => navigate('/admin/users')}
          variant="subtle"
        />
      </Box>

      <Divider />

      {/* System Section */}
      <Box>
        <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb="xs" pl="xs">
          {t('nav.sections.system')}
        </Text>
        <NavLink
          label={t('nav.settings')}
          leftSection={<IconSettings size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          active={location.pathname === '/admin/settings'}
          onClick={() => navigate('/admin/settings')}
          variant="subtle"
        />
      </Box>
    </Stack>
  );
};
