export const languages = { tr: 'Türkçe', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'tr';

export const ui = {
  tr: {
    'site.tagline': 'Evde daha iyi kahve için dürüst rehberler',
    'site.description':
      'Evde kahve demleme rehberleri, tarifler ve bağımsız ekipman karşılaştırmaları. Reklam kokan listeler değil, denenmiş yöntemler.',
    'nav.guides': 'Rehberler',
    'nav.tools': 'Oran Hesaplayıcı',
    'nav.about': 'Hakkımızda',
    'home.hero': 'Evde kahveyi bir üst seviyeye taşı.',
    'home.lead':
      'Demleme yöntemleri, adım adım tarifler ve gerçekten işe yarayan ekipman önerileri. Kısa, net, abartısız.',
    'home.latest': 'Son rehberler',
    'home.cta': 'Oran hesaplayıcıyı dene',
    'post.updated': 'Güncellendi',
    'post.readingTime': 'dk okuma',
    'post.toc': 'Bu yazıda',
    'post.picks': 'Önerdiğimiz ekipmanlar',
    'post.related': 'Bunlar da ilgini çekebilir',
    'product.best': 'Kimin için',
    'product.pros': 'Artıları',
    'product.cons': 'Eksileri',
    'product.cta': "'da fiyatı gör",
    'disclosure':
      'Bu yazıdaki bazı bağlantılar ortaklık bağlantısıdır. Bu bağlantılardan alışveriş yaparsan, sana ek maliyet olmadan küçük bir komisyon kazanabiliriz. Önerilerimiz bundan etkilenmez.',
    'ad.label': 'Reklam',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.privacy': 'Gizlilik',
    'footer.disclosure': 'Ortaklık Açıklaması',
    'footer.about': 'Hakkımızda',
    'cat.yontem': 'Demleme Yöntemi',
    'cat.ekipman': 'Ekipman',
    'cat.temel': 'Temel Bilgi',
    '404.title': 'Sayfa bulunamadı',
    '404.text': 'Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.',
    '404.home': 'Ana sayfaya dön',
  },
  en: {
    'site.tagline': 'Honest guides for better coffee at home',
    'site.description':
      'Home coffee brewing guides, recipes and independent gear comparisons. Tested methods, not ad-stuffed lists.',
    'nav.guides': 'Guides',
    'nav.tools': 'Ratio Calculator',
    'nav.about': 'About',
    'home.hero': 'Take your home coffee up a level.',
    'home.lead':
      'Brew methods, step-by-step recipes and gear recommendations that actually hold up. Short, clear, no hype.',
    'home.latest': 'Latest guides',
    'home.cta': 'Try the ratio calculator',
    'post.updated': 'Updated',
    'post.readingTime': 'min read',
    'post.toc': 'In this guide',
    'post.picks': 'Gear we recommend',
    'post.related': 'You might also like',
    'product.best': 'Best for',
    'product.pros': 'Pros',
    'product.cons': 'Cons',
    'product.cta': 'Check price at ',
    'disclosure':
      'Some links in this article are affiliate links. If you buy through them we may earn a small commission at no extra cost to you. It never affects our picks.',
    'ad.label': 'Advertisement',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.disclosure': 'Affiliate Disclosure',
    'footer.about': 'About',
    'cat.yontem': 'Brew Method',
    'cat.ekipman': 'Gear',
    'cat.temel': 'Basics',
    '404.title': 'Page not found',
    '404.text': 'The page you are looking for has moved or never existed.',
    '404.home': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['tr'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

/** Dile göre URL öneki: tr → "/", en → "/en/" */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return lang === defaultLang ? `/${clean}` : `/${lang}/${clean}`;
}

/** Sabit sayfaların diller arası karşılıkları (hreflang için). */
export const staticPages = {
  home: { tr: '/', en: '/en/' },
  about: { tr: '/hakkimizda/', en: '/en/about/' },
  privacy: { tr: '/gizlilik/', en: '/en/privacy/' },
  disclosure: { tr: '/ortaklik-aciklamasi/', en: '/en/affiliate-disclosure/' },
  calculator: { tr: '/kahve-orani-hesaplayici/', en: '/en/coffee-ratio-calculator/' },
} as const;
