import { type ApplicationService } from '@adonisjs/core/types';

export default class AppProvider {
  public constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  public register(): void {
    // Empty
  }

  /**
   * The container bindings have booted
   */
  public async boot(): Promise<void> {
    await import('../src/extensions/request_macros.js');
    await import('../src/extensions/response_macros.js');
  }

  /**
   * The application has been booted
   */
  public async start(): Promise<void> {
    // Empty
  }

  /**
   * The process has been started
   */
  public async ready(): Promise<void> {
    // Empty
  }

  /**
   * Preparing to shutdown the app
   */
  public async shutdown(): Promise<void> {
    // Empty
  }
}
