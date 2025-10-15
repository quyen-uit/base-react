import { Group, Button, Menu, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconLanguage, IconMoon, IconSun, IconUser, IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HeaderContentProps {
  isAuthenticated: boolean;
  user: any;
  onLogout: () => void;
}

export const HeaderContent = ({ isAuthenticated, user, onLogout }: HeaderContentProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const toggleTheme = () => {
    toggleColorScheme();
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
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
            <Menu.Item color="red" leftSection={<IconLogout size={16} />} onClick={onLogout}>
              {t('auth.logout')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Button onClick={() => navigate('/login')}>{t('auth.login')}</Button>
      )}
    </Group>
  );
};
