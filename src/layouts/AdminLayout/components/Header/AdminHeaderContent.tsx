import { Group, Button, Menu, ActionIcon } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { IconLanguage, IconMoon, IconSun, IconUser, IconLogout, IconHome } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface AdminHeaderContentProps {
  user: any;
  onLogout: () => void;
}

export const AdminHeaderContent = ({ user, onLogout }: AdminHeaderContentProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const colorScheme = useColorScheme();
  const [, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: colorScheme,
  });

  const toggleTheme = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
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

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="default" leftSection={<IconUser size={16} />}>
            {user?.name}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconHome size={16} />} onClick={() => navigate('/')}>
            {t('nav.home')}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={onLogout}
          >
            {t('auth.logout')}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
