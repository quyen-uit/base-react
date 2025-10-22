import { Container, Paper, Text, Stack, Tabs, Switch, Select, Button, Group, TextInput, Textarea } from '@mantine/core';
import { IconSettings, IconBell, IconLock, IconPalette, IconDatabase } from '@tabler/icons-react';
import { useState } from 'react';

export const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [theme, setTheme] = useState<string | null>('light');
  const [language, setLanguage] = useState<string | null>('en');

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Page Header */}
        <div>
          <Text size="xl" fw={700}>
            Settings
          </Text>
          <Text size="sm" c="dimmed">
            Manage your application settings and preferences
          </Text>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general">
          <Tabs.List>
            <Tabs.Tab value="general" leftSection={<IconSettings size={16} />}>
              General
            </Tabs.Tab>
            <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>
              Notifications
            </Tabs.Tab>
            <Tabs.Tab value="security" leftSection={<IconLock size={16} />}>
              Security
            </Tabs.Tab>
            <Tabs.Tab value="appearance" leftSection={<IconPalette size={16} />}>
              Appearance
            </Tabs.Tab>
            <Tabs.Tab value="advanced" leftSection={<IconDatabase size={16} />}>
              Advanced
            </Tabs.Tab>
          </Tabs.List>

          {/* General Settings */}
          <Tabs.Panel value="general" pt="xl">
            <Paper shadow="sm" p="xl" radius="md" withBorder>
              <Stack gap="lg">
                <div>
                  <Text size="lg" fw={600} mb="md">
                    General Settings
                  </Text>
                  <Text size="sm" c="dimmed" mb="xl">
                    Configure your basic application settings
                  </Text>
                </div>

                <TextInput
                  label="Application Name"
                  placeholder="My Application"
                  defaultValue="React Shop"
                  description="The name of your application"
                />

                <Select
                  label="Language"
                  placeholder="Select language"
                  value={language}
                  onChange={setLanguage}
                  data={[
                    { value: 'en', label: 'English' },
                    { value: 'vi', label: 'Vietnamese' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                  ]}
                  description="Choose your preferred language"
                />

                <Select
                  label="Timezone"
                  placeholder="Select timezone"
                  defaultValue="utc"
                  data={[
                    { value: 'utc', label: 'UTC (GMT+0)' },
                    { value: 'est', label: 'Eastern Time (GMT-5)' },
                    { value: 'pst', label: 'Pacific Time (GMT-8)' },
                    { value: 'jst', label: 'Japan Time (GMT+9)' },
                  ]}
                  description="Your local timezone"
                />

                <Group justify="flex-end" mt="md">
                  <Button variant="default">Cancel</Button>
                  <Button>Save Changes</Button>
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>

          {/* Notifications Settings */}
          <Tabs.Panel value="notifications" pt="xl">
            <Paper shadow="sm" p="xl" radius="md" withBorder>
              <Stack gap="lg">
                <div>
                  <Text size="lg" fw={600} mb="md">
                    Notification Preferences
                  </Text>
                  <Text size="sm" c="dimmed" mb="xl">
                    Manage how you receive notifications
                  </Text>
                </div>

                <Switch
                  label="Email Notifications"
                  description="Receive notifications via email"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.currentTarget.checked)}
                />

                <Switch
                  label="Push Notifications"
                  description="Receive push notifications in your browser"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.currentTarget.checked)}
                />

                <Switch
                  label="Marketing Emails"
                  description="Receive promotional and marketing emails"
                  defaultChecked={false}
                />

                <Switch
                  label="Weekly Reports"
                  description="Get weekly summary reports"
                  defaultChecked={true}
                />

                <Group justify="flex-end" mt="md">
                  <Button variant="default">Cancel</Button>
                  <Button>Save Changes</Button>
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>

          {/* Security Settings */}
          <Tabs.Panel value="security" pt="xl">
            <Paper shadow="sm" p="xl" radius="md" withBorder>
              <Stack gap="lg">
                <div>
                  <Text size="lg" fw={600} mb="md">
                    Security Settings
                  </Text>
                  <Text size="sm" c="dimmed" mb="xl">
                    Protect your account and data
                  </Text>
                </div>

                <Switch
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                  checked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.currentTarget.checked)}
                />

                <Switch
                  label="Login Alerts"
                  description="Get notified when someone logs into your account"
                  defaultChecked={true}
                />

                <div>
                  <Text size="sm" fw={500} mb="xs">
                    Change Password
                  </Text>
                  <Button variant="light">Update Password</Button>
                </div>

                <div>
                  <Text size="sm" fw={500} mb="xs">
                    Active Sessions
                  </Text>
                  <Text size="xs" c="dimmed" mb="xs">
                    Manage your active sessions across devices
                  </Text>
                  <Button variant="light" color="red">
                    Sign Out All Devices
                  </Button>
                </div>

                <Group justify="flex-end" mt="md">
                  <Button variant="default">Cancel</Button>
                  <Button>Save Changes</Button>
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>

          {/* Appearance Settings */}
          <Tabs.Panel value="appearance" pt="xl">
            <Paper shadow="sm" p="xl" radius="md" withBorder>
              <Stack gap="lg">
                <div>
                  <Text size="lg" fw={600} mb="md">
                    Appearance
                  </Text>
                  <Text size="sm" c="dimmed" mb="xl">
                    Customize how the application looks
                  </Text>
                </div>

                <Select
                  label="Theme"
                  placeholder="Select theme"
                  value={theme}
                  onChange={setTheme}
                  data={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'auto', label: 'Auto (System)' },
                  ]}
                  description="Choose your preferred color scheme"
                />

                <Select
                  label="Primary Color"
                  placeholder="Select color"
                  defaultValue="blue"
                  data={[
                    { value: 'blue', label: 'Blue' },
                    { value: 'teal', label: 'Teal' },
                    { value: 'violet', label: 'Violet' },
                    { value: 'orange', label: 'Orange' },
                  ]}
                  description="Main color used throughout the app"
                />

                <Select
                  label="Font Size"
                  placeholder="Select size"
                  defaultValue="medium"
                  data={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                  description="Adjust text size for better readability"
                />

                <Group justify="flex-end" mt="md">
                  <Button variant="default">Cancel</Button>
                  <Button>Save Changes</Button>
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>

          {/* Advanced Settings */}
          <Tabs.Panel value="advanced" pt="xl">
            <Paper shadow="sm" p="xl" radius="md" withBorder>
              <Stack gap="lg">
                <div>
                  <Text size="lg" fw={600} mb="md">
                    Advanced Settings
                  </Text>
                  <Text size="sm" c="dimmed" mb="xl">
                    Configure advanced options and integrations
                  </Text>
                </div>

                <Switch
                  label="Debug Mode"
                  description="Enable debugging for development"
                  defaultChecked={false}
                />

                <Switch
                  label="Analytics Tracking"
                  description="Help us improve by sharing anonymous usage data"
                  defaultChecked={true}
                />

                <TextInput
                  label="API Endpoint"
                  placeholder="https://api.example.com"
                  description="Custom API endpoint URL"
                />

                <Textarea
                  label="Custom CSS"
                  placeholder="Enter custom CSS..."
                  minRows={4}
                  description="Add custom styles to personalize your interface"
                />

                <div>
                  <Text size="sm" fw={500} mb="xs" c="red">
                    Danger Zone
                  </Text>
                  <Stack gap="xs">
                    <Button variant="light" color="red">
                      Clear Cache
                    </Button>
                    <Button variant="light" color="red">
                      Reset to Defaults
                    </Button>
                    <Button variant="filled" color="red">
                      Delete Account
                    </Button>
                  </Stack>
                </div>

                <Group justify="flex-end" mt="md">
                  <Button variant="default">Cancel</Button>
                  <Button>Save Changes</Button>
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};
