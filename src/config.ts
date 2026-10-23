// Sitenin tüm ayarları burada. Teknik bilgi gerekmez: sadece tırnak içindeki değerleri değiştir.

export const SITE = {
  name: 'Fincanla',
  author: 'Fincanla',
  // Google AdSense onayı gelince "ca-pub-..." kimliğini buraya yaz. Boş kaldıkça reklam kodu yüklenmez.
  adsenseClient: '',
  // Google Search Console doğrulama kodu (isteğe bağlı).
  googleSiteVerification: '',
};

// Ortaklık (affiliate) mağazaları. Her ürün kutusundaki "store" alanı bu anahtarlardan birini kullanır.
// tag: ortaklık kimliği. Doluysa o mağazanın bütün bağlantılarına otomatik eklenir (ör. ?tag=fincanla-21).
export const STORES: Record<string, { name: string; lang: string; tag?: string }> = {
  trendyol: { name: 'Trendyol', lang: 'tr' },
  hepsiburada: { name: 'Hepsiburada', lang: 'tr' },
  amazonTr: { name: 'Amazon.com.tr', lang: 'tr' },
  amazonUs: { name: 'Amazon', lang: 'en' },
  amazonDe: { name: 'Amazon.de', lang: 'de', tag: 'fincanla-21' },
};

export type StoreKey = 'trendyol' | 'hepsiburada' | 'amazonTr' | 'amazonUs' | 'amazonDe';

/** Ürün bağlantısına mağazanın ortaklık kimliğini ekler. */
export function affiliateUrl(store: StoreKey, url: string): string {
  const tag = STORES[store].tag;
  if (!tag) return url;
  const u = new URL(url);
  u.searchParams.set('tag', tag);
  return u.toString();
}

/** Türkçe sayfalardaki "Amazon.de'de gör" düğmesi: ürün adıyla Amazon.de araması, ortaklık kimliğiyle.
 *  Almanya ve Avrupa'da yaşayan Türk okurlar buradan alırsa komisyon gelir. */
export function amazonDeSearchUrl(name: string): string {
  return `https://www.amazon.de/s?k=${encodeURIComponent(name)}&tag=${STORES.amazonDe.tag}`;
}

// Impressum (künye): Almanya'da yaşayan site sahipleri için yasal zorunluluk (§ 5 DDG).
// Yayına almadan önce MUTLAKA doldur. Boş alanlar sayfada "[Bitte ausfüllen]" olarak görünür.
export const IMPRESSUM = {
  name: 'Abdülkadir Ciftsüren',
  street: 'Rieschstraße 21',
  city: '83646 Bad Tölz',
  country: 'Deutschland',
  email: 'abdulkadirciftsuren@gmail.com',
  phone: '+49 151 55613593', // isteğe bağlı ama önerilir
};
