import { Stack, Box, Text, NavLink, Divider } from '@mantine/core';
import {
  IconHome,
  IconLayoutDashboard,
  IconPackage,
  IconUserCircle,
  IconShoppingCart,
  IconChevronRight,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SidebarContentProps {
  isAuthenticated: boolean;
  userRole?: string;
}

export const SidebarContent = ({ isAuthenticated, userRole }: SidebarContentProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack gap="xs">
      {/* General Section */}
      <Box>
        <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb="xs" pl="xs">
          {t('nav.sections.general')}
        </Text>
        <NavLink
          label={t('nav.home')}
          leftSection={<IconHome size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={14} stroke={1.5} />}
          active={location.pathname === '/'}
          onClick={() => navigate('/')}
          variant="subtle"
        />
      </Box>

      {/* Applications Section - Only for authenticated users */}
      {isAuthenticated && (
        <>
          <Divider />
          <Box>
            <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb="xs" pl="xs">
              {t('nav.sections.applications')}
            </Text>
            <NavLink
              label={t('nav.dashboard')}
              leftSection={<IconLayoutDashboard size={20} stroke={1.5} />}
              rightSection={<IconChevronRight size={14} stroke={1.5} />}
              active={location.pathname === '/dashboard'}
              onClick={() => navigate('/dashboard')}
              variant="subtle"
            />
            <NavLink
              label={t('nav.products')}
              leftSection={<IconPackage size={20} stroke={1.5} />}
              rightSection={<IconChevronRight size={14} stroke={1.5} />}
              active={location.pathname === '/products'}
              onClick={() => navigate('/products')}
              variant="subtle"
            />
            <NavLink
              label={t('nav.profile')}
              leftSection={<IconUserCircle size={20} stroke={1.5} />}
              rightSection={<IconChevronRight size={14} stroke={1.5} />}
              active={location.pathname === '/profile'}
              onClick={() => navigate('/profile')}
              variant="subtle"
            />
          </Box>
        </>
      )}

      {/* Admin Section - Only for admin users */}
      {isAuthenticated && userRole === 'admin' && (
        <>
          <Divider />
          <Box>
            <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb="xs" pl="xs">
              {t('nav.sections.administration')}
            </Text>
            <NavLink
              label={t('nav.admin')}
              leftSection={<IconShoppingCart size={20} stroke={1.5} />}
              rightSection={<IconChevronRight size={14} stroke={1.5} />}
              active={location.pathname.startsWith('/admin')}
              onClick={() => navigate('/admin')}
              variant="subtle"
            />
          </Box>
        </>
      )}
    </Stack>
  );
};
