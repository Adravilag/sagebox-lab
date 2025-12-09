// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/',
  trailingSlash: 'ignore',
  output: 'static',  // SSG for CLI serving
  build: {
    assets: '_assets',
  },
  server: {
    port: 4569,
  },
});
