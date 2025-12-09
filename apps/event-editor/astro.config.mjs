// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  base: '/',
  trailingSlash: 'ignore',
  output: 'server',  // SSR for API endpoints
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: 4570,
  },
  vite: {
    server: {
      fs: {
        allow: ['../..'],
      },
    },
  },
});
