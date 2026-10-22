# Fincanla — evde kahve rehberi (pasif gelir sitesi)

Adres: https://fincanla.com

Hafif, hızlı, SEO odaklı, üç dilli bir niş içerik sitesi. Öncelik sırası: Türkçe (kök adres), Almanca (/de/), İngilizce (/en/).
Gelir modeli: **Google AdSense reklamları + ortaklık (affiliate) komisyonları.**

## Neden bu niş: evde kahve demleme

- **Kalıcı konu:** "V60 nasıl yapılır" sorusu 5 yıl sonra da sorulacak. Yazılar eskimez.
- **Satın alma niyeti yüksek:** öğütücü, terazi, kettle, demleme aparatı. Her rehber doğal olarak ürüne bağlanır.
- **Türkiye'de rekabet zayıf, dünyada pazar büyük:** Türkçede kaliteli rehber az. Aynı yapı İngilizceye taşındığında Amazon gibi programlarla daha yüksek gelir mümkün.
- **Güvenli:** sağlık, hukuk ya da finans tavsiyesi yok. Google bu konulara ("YMYL") çok daha sıkı bakıyor.

## Teknoloji: Astro + Cloudflare Pages

- **Astro** her sayfayı önceden düz HTML'e çevirir. Sunucu, veritabanı ya da eklenti yok, bu yüzden güvenlik bakımı da yok.
- Bir yazı sayfası yaklaşık **21 KB**. Harici font yok; sadece hesaplayıcı sayfasında küçük bir JavaScript var.
- **Cloudflare Pages:** ücretsiz barındırma, dünya çapında hızlı dağıtım.
- SEO altyapısı hazır: canonical, hreflang (TR↔EN), Open Graph, Article/Breadcrumb şeması, sitemap, robots.txt, ortaklık bağlantılarında `rel="sponsored"`.

## Yeni yazı eklemek

1. `src/content/posts/tr/` klasörüne `adres-olacak-isim.md` adlı bir dosya ekle (dosya adı, URL'yi belirler).
2. En kolay yol mevcut bir yazıyı kopyalayıp düzenlemek. Üstteki `---` arasındaki alanlar:
   - `title`: en fazla 70 karakter, `description`: 70–160 karakter (Google'da görünen metin)
   - `category`: `yontem`, `ekipman` veya `temel`
   - `translationKey`: İngilizce sürümüyle **aynı** olmalı (dil bağlantısı bunun üzerinden kurulur)
   - `products`: isteğe bağlı ürün kutuları (`url` alanına ortaklık bağlantını yaz)
3. Almanca sürümü `src/content/posts/de/`, İngilizce sürümü `src/content/posts/en/` klasörüne aynı `translationKey` ile ekle. Çeviri şart değil.

Kurallardan biri ihlal edilirse (örneğin açıklama çok kısaysa) site derlenmez ve hatanın nerede olduğu yazılır. Bu sayede yarım kalmış bir yazı yanlışlıkla yayına çıkmaz.

## Görseller

- Kapak görseli: yazının üst kısmına `cover: "/img/kapak/dosya.svg"` ve `coverAlt: "görselin açıklaması"` ekle. Dosyalar `public/img/` altında durur.
- Şu anki görseller siteye özel çizimlerdir (SVG). Çok hafiftirler ve telif sorunu yoktur.
- Kendi fotoğraflarını sohbete eklemen yeterli. Küçültme, WebP'ye çevirme ve yazıya yerleştirme işini Claude yapar.

## Ayarlar — `src/config.ts`

- `name`: site adı
- `STORES`: ortaklık mağazaları. `tag` alanına ortaklık kimliği yazılınca o mağazanın bütün bağlantılarına otomatik eklenir (Amazon.de: `fincanla-21`).
- `IMPRESSUM`: Almanya'daki yasal künye bilgileri (ad, adres, e-posta). **Yayına almadan önce doldurulmalı.**
- `adsenseClient`: AdSense onayı gelince `ca-pub-...` kimliğini yaz; reklamlar o zaman otomatik açılır
- Alan adı: `astro.config.mjs` içindeki `SITE` ve `public/robots.txt`

## Yayına alma (bir kerelik, ~10 dk)

1. Cloudflare hesabı aç → **Workers & Pages → Create → Pages → Connect to Git** → bu depoyu seç.
2. Framework: **Astro**, build komutu: `npm run build`, çıktı klasörü: `dist`.
3. Alan adını Cloudflare'den bağla. Bundan sonra GitHub'a her gönderim siteyi otomatik günceller.
4. Google Search Console'a siteyi ekle ve `https://alanadin.com/sitemap-index.xml` adresini gönder.

## Gelir yol haritası

1. **0–3. ay:** Türkçe 25–30 kaliteli rehber. Trendyol, Hepsiburada ve Amazon.com.tr ortaklık programlarına başvur.
2. **3–6. ay:** Trafik gelmeye başlayınca AdSense başvurusu yap (Hakkımızda, Gizlilik ve Ortaklık sayfaları hazır).
3. **6. aydan sonra:** En iyi performans gösteren yazıları İngilizceye çevir; Amazon Associates programına katıl.

## Geliştirici komutları

```sh
npm install      # bir kere
npm run dev      # yerel önizleme: http://localhost:4321
npm run build    # dist/ klasörüne üretir
```
Node 22.12 veya üstü gerekir.
