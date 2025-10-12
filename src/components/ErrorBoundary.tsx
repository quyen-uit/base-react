import { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Title, Text, Button, Stack } from '@mantine/core';
import * as Sentry from '@sentry/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);

    // Send error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container size="sm" mt="xl">
          <Stack align="center" gap="md">
            <Title order={1}>Oops! Something went wrong</Title>
            <Text c="dimmed" size="lg">
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <Button onClick={this.handleReset} variant="filled">
              Try again
            </Button>
          </Stack>
        </Container>
      );
    }

    return this.props.children;
  }
}
