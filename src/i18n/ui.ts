export const languages = { tr: 'Türkçe', de: 'Deutsch', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'tr';

export const ui = {
  tr: {
    'nav.home': 'Ana sayfa',
    'post.quickPicks': 'Hızlı öneriler',
    'post.allPicks': 'Ayrıntılı karşılaştırma ↓',
    'search.label': 'Sitede ara',
    'search.placeholder': 'Ne arıyorsun? Örn. espresso makinesi, cezve, V60…',
    'search.empty': 'Sonuç bulunamadı. Başka bir kelime dene.',
    'site.slogan': 'Kahve Keyfi',
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
      'Sana ek ücret yok: Mağaza bağlantılarından alışveriş yaparsan fiyat aynı kalır. Mağaza, bizi önerdiğimiz için küçük bir teşekkür payı öder; bu sayede rehberlerimiz ücretsiz kalır. Önerilerimiz bundan etkilenmez.',
    'ad.label': 'Reklam',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.privacy': 'Gizlilik',
    'footer.disclosure': 'Ortaklık Açıklaması',
    'footer.about': 'Hakkımızda',
    'footer.imprint': 'Künye (Impressum)',
    'cat.yontem': 'Demleme Yöntemi',
    'cat.ekipman': 'Ekipman',
    'cat.temel': 'Kahve Bilgisi',
    'cat.yontem.desc': 'Cezveden V60\'a, adım adım demleme tarifleri.',
    'cat.ekipman.desc': 'Bütçene ve ihtiyacına göre dürüst ekipman rehberleri.',
    'cat.temel.desc': 'Kahve çeşitleri, yöresel kahveler ve bilmen gerekenler.',
    'home.topics': 'Konulara göre',
    'aside.calcTitle': 'Kahve Oranı Hesaplayıcı',
    'aside.calcText': 'Kaç gram kahveye kaç ml su? Saniyeler içinde hesapla →',
    'aside.more': 'Bu konuda diğer yazılar',
    '404.title': 'Sayfa bulunamadı',
    '404.text': 'Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.',
    '404.home': 'Ana sayfaya dön',
  },
  de: {
    'nav.home': 'Startseite',
    'post.quickPicks': 'Schnelle Empfehlungen',
    'post.allPicks': 'Ausführlicher Vergleich ↓',
    'search.label': 'Auf der Seite suchen',
    'search.placeholder': 'Wonach suchst du? z. B. Siebträger, Kaffeebohnen, V60…',
    'search.empty': 'Keine Treffer. Versuch ein anderes Wort.',
    'site.slogan': 'Kaffeegenuss',
    'site.tagline': 'Ehrliche Ratgeber für besseren Kaffee zu Hause',
    'site.description':
      'Anleitungen zur Kaffeezubereitung zu Hause, Rezepte und unabhängige Vergleiche von Kaffeezubehör. Erprobte Methoden statt Werbelisten.',
    'nav.guides': 'Ratgeber',
    'nav.tools': 'Kaffee-Rechner',
    'nav.about': 'Über uns',
    'home.hero': 'Besserer Kaffee zu Hause – Schritt für Schritt.',
    'home.lead':
      'Zubereitungsmethoden, einfache Rezepte und Empfehlungen für Zubehör, das wirklich hält, was es verspricht. Kurz, klar, ohne Hype.',
    'home.latest': 'Neueste Ratgeber',
    'home.cta': 'Kaffee-Rechner ausprobieren',
    'post.updated': 'Aktualisiert',
    'post.readingTime': 'Min. Lesezeit',
    'post.toc': 'In diesem Artikel',
    'post.picks': 'Unsere Empfehlungen',
    'post.related': 'Das könnte dich auch interessieren',
    'product.best': 'Ideal für',
    'product.pros': 'Vorteile',
    'product.cons': 'Nachteile',
    'product.cta': 'Preis ansehen bei ',
    'disclosure':
      'Für dich kostet es keinen Cent mehr: Kaufst du über unsere Shop-Links (Affiliate-Links), bleibt der Preis gleich. Der Shop zahlt uns eine kleine Provision – so bleiben unsere Ratgeber kostenlos. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.',
    'ad.label': 'Anzeige',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutz',
    'footer.disclosure': 'Affiliate-Hinweis',
    'footer.about': 'Über uns',
    'footer.imprint': 'Impressum',
    'cat.yontem': 'Zubereitung',
    'cat.ekipman': 'Zubehör',
    'cat.temel': 'Kaffeewissen',
    'cat.yontem.desc': 'Schritt-für-Schritt-Rezepte, von der Cezve bis zum V60.',
    'cat.ekipman.desc': 'Ehrliche Kaufberatung für jedes Budget.',
    'cat.temel.desc': 'Kaffeesorten, regionale Spezialitäten und Grundwissen.',
    'home.topics': 'Nach Thema',
    'aside.calcTitle': 'Kaffee-Rechner',
    'aside.calcText': 'Wie viel Kaffee für wie viel Wasser? In Sekunden berechnet →',
    'aside.more': 'Mehr zu diesem Thema',
    '404.title': 'Seite nicht gefunden',
    '404.text': 'Die gesuchte Seite wurde verschoben oder existiert nicht.',
    '404.home': 'Zur Startseite',
  },
  en: {
    'nav.home': 'Home',
    'post.quickPicks': 'Quick picks',
    'post.allPicks': 'Full comparison ↓',
    'search.label': 'Search the site',
    'search.placeholder': 'What are you looking for? e.g. moka pot, grinder, V60…',
    'search.empty': 'No results. Try another word.',
    'site.slogan': 'The joy of coffee',
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
      'No extra cost to you: if you buy through our store links (affiliate links), the price stays the same. The store pays us a small commission, which keeps our guides free. It never affects our picks.',
    'ad.label': 'Advertisement',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.disclosure': 'Affiliate Disclosure',
    'footer.about': 'About',
    'footer.imprint': 'Imprint',
    'cat.yontem': 'Brew Method',
    'cat.ekipman': 'Gear',
    'cat.temel': 'Coffee Basics',
    'cat.yontem.desc': 'Step-by-step brewing recipes, from cezve to V60.',
    'cat.ekipman.desc': 'Honest gear guides for every budget and need.',
    'cat.temel.desc': 'Coffee types, regional coffees and the essentials.',
    'home.topics': 'By topic',
    'aside.calcTitle': 'Coffee Ratio Calculator',
    'aside.calcText': 'How much coffee for how much water? Find out in seconds →',
    'aside.more': 'More on this topic',
    '404.title': 'Page not found',
    '404.text': 'The page you are looking for has moved or never existed.',
    '404.home': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['tr'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

/** Dile göre URL öneki: tr → "/", en → "/en/", de → "/de/" */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return lang === defaultLang ? `/${clean}` : `/${lang}/${clean}`;
}

/** Sabit sayfaların diller arası karşılıkları (hreflang için). */
export const staticPages = {
  home: { tr: '/', en: '/en/', de: '/de/' },
  about: { tr: '/hakkimizda/', en: '/en/about/', de: '/de/ueber-uns/' },
  privacy: { tr: '/gizlilik/', en: '/en/privacy/', de: '/de/datenschutz/' },
  disclosure: { tr: '/ortaklik-aciklamasi/', en: '/en/affiliate-disclosure/', de: '/de/affiliate-hinweis/' },
  calculator: { tr: '/kahve-orani-hesaplayici/', en: '/en/coffee-ratio-calculator/', de: '/de/kaffee-rechner/' },
  imprint: { tr: '/kunye/', en: '/en/imprint/', de: '/de/impressum/' },
} as const;

/** Dile göre tarih biçimi ve Open Graph yerel kodu */
export const locales: Record<Lang, { date: string; og: string }> = {
  tr: { date: 'tr-TR', og: 'tr_TR' },
  de: { date: 'de-DE', og: 'de_DE' },
  en: { date: 'en-US', og: 'en_US' },
};
