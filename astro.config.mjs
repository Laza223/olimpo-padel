import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import config from './site.config.js';

// Sin telemetría de Astro (se lee al registrar el evento, después de cargar esta config).
process.env.ASTRO_TELEMETRY_DISABLED = '1';

// El dominio sale de site.config.js. Sin dominio no hay canonical, sitemap ni robots.txt.
const dominio = !config.dominio || config.dominio === 'COMPLETAR' ? undefined : config.dominio;

const robots = {
  name: 'olimpo-robots',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (dominio)
        await writeFile(new URL('robots.txt', dir), `User-agent: *\nAllow: /\nSitemap: ${dominio}/sitemap-index.xml\n`);
    },
  },
};

export default defineConfig({
  site: dominio,
  server: { host: true },
  integrations: [...(dominio ? [sitemap()] : []), robots],
  vite: {
    server: { watch: { ignored: ['**/assets-fuente/**', '**/.impeccable/**'] } },
    build: { assetsInlineLimit: 0 },
  },
});
