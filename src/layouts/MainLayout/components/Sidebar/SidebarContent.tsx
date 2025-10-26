import { Stack, Box, Text, NavLink, Divider } from '@mantine/core';
import { IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants';
import { useState, useEffect } from 'react';
import { applicationsNav, generalNav, examplesNav, adminNav } from '@/routes/meta';

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
        {generalNav.map((item) => (
          <NavLink
            key={item.to}
            label={t(item.labelKey)}
            leftSection={item.icon ? <item.icon size={20} stroke={1.5} /> : undefined}
            rightSection={<IconChevronRight size={14} stroke={1.5} />}
            active={location.pathname === item.to}
            onClick={() => item.to && navigate(item.to)}
            variant="subtle"
          />
        ))}

        {/* Examples Submenu */}
        <NavLink
          label={t(examplesNav.labelKey)}
          leftSection={examplesNav.icon ? <examplesNav.icon size={20} stroke={1.5} /> : undefined}
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
          {examplesNav.children?.map((child) => (
            <NavLink
              key={child.to}
              label={t(child.labelKey)}
              leftSection={child.icon ? <child.icon size={18} stroke={1.5} /> : undefined}
              active={location.pathname === child.to}
              onClick={(e) => {
                e.stopPropagation();
                child.to && navigate(child.to);
              }}
              variant="subtle"
            />
          ))}
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
            {/* Application links */}
            {applicationsNav.map((item) => (
              <NavLink
                key={item.to}
                label={t(item.labelKey)}
                leftSection={item.icon ? <item.icon size={20} stroke={1.5} /> : undefined}
                rightSection={<IconChevronRight size={14} stroke={1.5} />}
                active={location.pathname === item.to}
                onClick={() => item.to && navigate(item.to)}
                variant="subtle"
              />
            ))}
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
              label={t(adminNav.labelKey)}
              leftSection={adminNav.icon ? <adminNav.icon size={20} stroke={1.5} /> : undefined}
              rightSection={<IconChevronRight size={14} stroke={1.5} />}
              active={location.pathname.startsWith(ROUTES.ADMIN)}
              onClick={() => adminNav.to && navigate(adminNav.to)}
              variant="subtle"
            />
          </Box>
        </>
      )}
    </Stack>
  );
};
