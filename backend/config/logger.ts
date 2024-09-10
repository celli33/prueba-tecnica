import { defineConfig, targets } from '@adonisjs/core/logger';
import app from '@adonisjs/core/services/app';
import env from '#start/env';

export const logPath = env.get('LOG_PATH');

const loggerConfig = defineConfig({
  default: 'app',

  /**
   * The loggers object can be used to define multiple loggers.
   * By default, we configure only one logger (named "app").
   */
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL'),
      transport: {
        targets: targets()
          .pushIf(!app.inProduction, {
            target: 'pino-roll',
            level: env.get('LOG_LEVEL'),
            options: {
              file: logPath,
              frequency: 'daily',
              mkdir: true,
            },
          })
          .pushIf(app.inProduction, {
            target: 'pino-roll',
            options: {
              file: logPath,
              frequency: 'daily',
              mkdir: true,
            },
          })
          .toArray(),
      },
    },
  },
});

export default loggerConfig;

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
