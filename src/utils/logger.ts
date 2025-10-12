/**
 * Logger Utility
 * Provides structured logging with different log levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private currentLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.currentLevel = this.isDevelopment ? 'debug' : 'info';
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.currentLevel];
  }

  private formatMessage(level: LogLevel, message: string, data?: any): void {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'debug':
        console.debug(prefix, message, data || '');
        break;
      case 'info':
        console.info(prefix, message, data || '');
        break;
      case 'warn':
        console.warn(prefix, message, data || '');
        break;
      case 'error':
        console.error(prefix, message, data || '');
        break;
    }
  }

  debug(message: string, data?: any) {
    this.formatMessage('debug', message, data);
  }

  info(message: string, data?: any) {
    this.formatMessage('info', message, data);
  }

  warn(message: string, data?: any) {
    this.formatMessage('warn', message, data);
  }

  error(message: string, error?: Error | any) {
    this.formatMessage('error', message, error);

    // Send to Sentry in production
    if (!this.isDevelopment && error) {
      import('../services/sentry').then(({ captureException }) => {
        captureException(error instanceof Error ? error : new Error(message), {
          message,
        });
      });
    }
  }

  setLevel(level: LogLevel) {
    this.currentLevel = level;
  }
}

export const logger = new Logger();
