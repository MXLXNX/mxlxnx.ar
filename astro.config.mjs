// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mxlxnx.ar',
  output: 'static',
  build: {
    assets: '_assets'
  },
  vite: {
    css: {
      devSourcemap: true
    }
  }
});
