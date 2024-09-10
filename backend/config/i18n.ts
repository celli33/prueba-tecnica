import app from '@adonisjs/core/services/app';
import { defineConfig, formatters, type I18n, loaders } from '@adonisjs/i18n';

const i18nConfig = defineConfig({
  defaultLocale: 'es',
  formatter: formatters.icu(),
  fallbackLocales: {
    es: 'en',
  },
  loaders: [
    /**
     * The fs loader will read translations from the
     * "resources/lang" directory.
     *
     * Each subdirectory represents a locale. For example:
     *   - "resources/lang/en"
     *   - "resources/lang/fr"
     *   - "resources/lang/it"
     */
    loaders.fs({
      location: app.languageFilesPath(),
    }),
  ],
});

export default i18nConfig;

/**
 * Notify TypeScript about i18n property
 */
declare module '@adonisjs/core/http' {
  export interface HttpContext {
    i18n: I18n;
  }
}
