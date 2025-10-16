import { Paper, Text, Button, Badge } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import classes from './Card.module.css';

/**
 * Example Card component demonstrating CSS Modules with Mantine
 *
 * This component shows how to:
 * 1. Use Mantine props for standard styling (spacing, shadows, colors)
 * 2. Use CSS Modules for custom styles (animations, layouts, hover effects)
 * 3. Combine both approaches effectively
 */

interface CardProps {
  title: string;
  description: string;
  badge?: string;
  onAction?: () => void;
  featured?: boolean;
}

export const Card = ({ title, description, badge, onAction, featured = false }: CardProps) => {
  return (
    // 1. Mantine props: p="xl", shadow="md", radius="lg"
    // 2. CSS Module: className={classes.card} for custom hover effect
    <Paper className={classes.card} p="xl" shadow="md" radius="lg" withBorder>
      {/* Header with custom CSS Module styling */}
      <div className={classes.header}>
        {/* CSS Module class for gradient text */}
        <Text className={classes.title} size="xl">
          {title}
        </Text>

        {featured && (
          <div className={classes.iconWrapper}>
            <IconStar size={20} color="var(--mantine-color-yellow-6)" />
          </div>
        )}
      </div>

      {/* Content area with CSS Module grid layout */}
      <div className={classes.content}>
        {/* Mantine prop: c="dimmed" for color */}
        <Text c="dimmed" size="sm">
          {description}
        </Text>

        {badge && (
          <Badge className={classes.badge} variant="light" color="blue">
            {badge}
          </Badge>
        )}
      </div>

      {/* Footer with CSS Module styling */}
      <div className={classes.footer}>
        {/* Mantine prop: size="xs", c="dimmed" */}
        <Text size="xs" c="dimmed">
          Learn more
        </Text>

        {/* Combining: Mantine props + CSS Module class */}
        <Button
          className={classes.actionButton}
          variant="light"
          size="sm"
          onClick={onAction}
        >
          Take Action
        </Button>
      </div>
    </Paper>
  );
};
