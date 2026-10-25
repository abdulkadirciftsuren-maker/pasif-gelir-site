# Fincanla – çalışma notları

## Kullanıcıyla iletişim (her zaman geçerli)
- Kullanıcıya **sadece Türkçe** yaz. Ara notlar, ilerleme mesajları ve özetler dahil hiçbir şeyi İngilizce yazma.
- Kullanıcı teknik değil, çoğunlukla telefondan yazıyor: kısa, sade, adım adım anlat. Tek seferde bir adım ver.
- Kullanıcı Almanya'da (Bad Tölz) yaşıyor; Türkçe, Almanca ve İngilizce siteleri var.
- PR'leri main'e birleştirip yayına alma izni kalıcı olarak verildi ("bundan sonra sorma"); ama her seferinde ne değiştiğini anlat.

## İçerik kuralı
- Kullanıcı isteği: aynı konuda fazladan yazı yazma. Yeni yazıdan önce mevcut yazılarda konu (bölüm olarak bile) var mı kontrol et; varsa yeni yazı açmak yerine o yazıyı genişlet.

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
- Cloudflare'de bağlantı ya da değişken değişince yeni bir yayın (deploy) gerekir; yoksa eski değerler kullanılır.
- Paylaşım formunda robot doğrulaması hata verirse ekranda Cloudflare hata kodu görünür (ör. `invalid-input-secret` = TURNSTILE_SECRET yanlış).

## Gelir hesapları (durum)
- Amazon.de PartnerNet: `fincanla-21` (Almanca sayfalar + Türkçe sayfalardaki "Amazon.de'de gör" düğmeleri).
- Amazon.com Associates: `fincanla-20` (İngilizce sayfalar). 23.10.2026'da başvuruldu; 180 gün içinde 3 nitelikli satış gerekir (~21.04.2027), olmazsa yeniden başvurulabilir. ABD vergi formu (W-8BEN, bireysel, hizmetler ABD dışında) 25.10.2026'da gönderildi ve doğrulandı: kesinti oranı %0. Ödeme yöntemi: Almanya'daki banka hesabı 10 ülkeye atandı (25.10.2026). Kanada vergi formu "eksik" kaldı; Amazon.ca'ya bağlantı vermediğimiz için şimdilik gerekmiyor.
- Amazon.com.tr: yalnızca Türkiye'de ikamet edenlere açık, kullanıcı başvuramıyor.
- Google AdSense: `ca-pub-3936992976474644`, site 23.10.2026'da incelemeye gönderildi. Onay gelince AdSense → "Datenschutz und Mitteilungen" altında Avrupa (DSGVO) izin mesajı kurulacak; altbilgideki "Çerez ayarları" düğmesi bu araca bağlı.
- Kullanıcı ~2 Kasım 2026'da otelden taşınıyor: Impressum (src/config.ts), AdSense ve Amazon adreslerini güncelle. Amazon.com'da W-8BEN adresi de 30 gün içinde yeni formla güncellenmeli.
