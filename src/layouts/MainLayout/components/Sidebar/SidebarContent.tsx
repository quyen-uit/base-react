import { Stack, Box, Text, NavLink, Divider } from '@mantine/core';
import {
  IconHome,
  IconLayoutDashboard,
  IconPackage,
  IconUserCircle,
  IconShoppingCart,
  IconChevronRight,
  IconChevronDown,
  IconPhoto,
  IconUsers,
  IconBriefcase,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface SidebarContentProps {
  isAuthenticated: boolean;
  userRole?: string;
}

export const SidebarContent = ({ isAuthenticated, userRole }: SidebarContentProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [examplesOpened, setExamplesOpened] = useState(
    location.pathname.startsWith('/examples')
  );

  // Auto-expand submenu when navigating to an examples page
  useEffect(() => {
    if (location.pathname.startsWith('/examples')) {
      setExamplesOpened(true);
    }
  }, [location.pathname]);

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

        {/* Examples Submenu */}
        <NavLink
          label={t('nav.examples')}
          leftSection={<IconPhoto size={20} stroke={1.5} />}
          rightSection={
            examplesOpened ? (
              <IconChevronDown size={14} stroke={1.5} />
            ) : (
              <IconChevronRight size={14} stroke={1.5} />
            )
          }
          onClick={() => setExamplesOpened(!examplesOpened)}
          variant="subtle"
          active={location.pathname.startsWith('/examples')}
          opened={examplesOpened}
        >
          <NavLink
            label={t('nav.gallery')}
            leftSection={<IconPhoto size={18} stroke={1.5} />}
            active={location.pathname === '/examples/gallery'}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/examples/gallery');
            }}
            variant="subtle"
          />
          <NavLink
            label={t('nav.team')}
            leftSection={<IconUsers size={18} stroke={1.5} />}
            active={location.pathname === '/examples/team'}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/examples/team');
            }}
            variant="subtle"
          />
          <NavLink
            label={t('nav.services')}
            leftSection={<IconBriefcase size={18} stroke={1.5} />}
            active={location.pathname === '/examples/services'}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/examples/services');
            }}
            variant="subtle"
          />
        </NavLink>
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
