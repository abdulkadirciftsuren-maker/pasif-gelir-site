// Sitenin tüm ayarları burada. Teknik bilgi gerekmez: sadece tırnak içindeki değerleri değiştir.

export const SITE = {
  name: 'Demlio',
  author: 'Demlio Editörleri',
  // Google AdSense onayı gelince "ca-pub-..." kimliğini buraya yaz. Boş kaldıkça reklam kodu yüklenmez.
  adsenseClient: '',
  // Google Search Console doğrulama kodu (isteğe bağlı).
  googleSiteVerification: '',
};

// Ortaklık (affiliate) mağazaları. Her ürün kutusundaki "store" alanı bu anahtarlardan birini kullanır.
export const STORES = {
  trendyol: { name: 'Trendyol', lang: 'tr' },
  hepsiburada: { name: 'Hepsiburada', lang: 'tr' },
  amazonTr: { name: 'Amazon.com.tr', lang: 'tr' },
  amazonUs: { name: 'Amazon', lang: 'en' },
} as const;

export type StoreKey = keyof typeof STORES;
