// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Yayına alınca burayı kendi alan adınla değiştir.
const SITE = 'https://fincanla.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  i18n: {
    locales: ['tr', 'de', 'en'],
    defaultLocale: 'tr',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // Dil karşılıkları (hreflang) her sayfanın <head> kısmında; slug'lar dile göre farklı olduğu için burada değil.
    sitemap({ filter: (page) => !page.endsWith('/404/') }),
  ],
  build: { inlineStylesheets: 'always' },
});
