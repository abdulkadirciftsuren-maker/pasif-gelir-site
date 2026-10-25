// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Yayına alınca burayı kendi alan adınla değiştir.
const SITE = 'https://fincanla.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  i18n: {
    locales: ['tr', 'de', 'en', 'ru'],
    defaultLocale: 'tr',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // Dil karşılıkları (hreflang) her sayfanın <head> kısmında; slug'lar dile göre farklı olduğu için burada değil.
    sitemap({ filter: (page) => !/\/(404|kunye|imprint|impressum|vyhodnye-dannye|yonetim|durum|status)\/$/.test(page) }),
  ],
  build: { inlineStylesheets: 'always' },
});
