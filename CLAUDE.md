# Fincanla – çalışma notları

## Kullanıcıyla iletişim (her zaman geçerli)
- Kullanıcıya **sadece Türkçe** yaz. Ara notlar, ilerleme mesajları ve özetler dahil hiçbir şeyi İngilizce yazma.
- Kullanıcı teknik değil, çoğunlukla telefondan yazıyor: kısa, sade, adım adım anlat. Tek seferde bir adım ver.
- Kullanıcı Almanya'da (Bad Tölz) yaşıyor; Türkçe, Almanca ve İngilizce siteleri var.
- PR'leri main'e birleştirip yayına alma izni kalıcı olarak verildi ("bundan sonra sorma"); ama her seferinde ne değiştiğini anlat.

## Kullanıcının diğer projeleri (dokunma)
- **Gloxorg.com** (GLOXORG – "The World's Platform"): kullanıcının kendi platformu; ilanlar, sanal ayna, AI sohbet vb. Kullanıcının bu tür platformlarda tecrübesi var.
- Cloudflare ve Namecheap hesabında gloxorg-ai, gloxorg-adres, gloxoo gibi başka projeler var. Bunlara asla dokunma; sadece "fincanla" ile başlayan kaynakları kullan.

## Gizlilik
- Kullanıcının Steuer-ID, IBAN, kart bilgisi, SMS kodu gibi bilgileri asla repoya ya da siteye yazılmaz.

## Topluluk (okur fotoğrafları) – Cloudflare kurulumu
- Pages projesi **fincanla** → Ayarlar → Bağlantılar: `DB` = D1 **fincanla-topluluk**, `FOTO` = KV **fincanla-fotolar**.
- Değişkenler: `TURNSTILE_SITE_KEY` (metin), `TURNSTILE_SECRET` (gizli), `ADMIN_PASSWORD` (gizli). Değerler sadece Cloudflare'de durur, repoya yazılmaz.
- Turnstile widget adı **fincanla**, hostname fincanla.com (www dahil).
- Tablolar ilk istekte kod tarafından otomatik kurulur (`ensureSchema`).
- Yönetim sayfası: `/yonetim/` (noindex, robots.txt ile kapalı).
