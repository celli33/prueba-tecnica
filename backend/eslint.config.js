// @ts-check
import nodecfdiConfig from '@nodecfdi/eslint-config';

const { defineConfig } = nodecfdiConfig(import.meta.dirname, { adonisjs: true });

export default defineConfig();
