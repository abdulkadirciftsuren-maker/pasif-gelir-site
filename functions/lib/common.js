// Topluluk (okur fotoğrafları) için ortak yardımcılar.
// Cloudflare Pages ayarlarında gerekenler:
//   D1 bağlantısı: DB   ·   KV bağlantısı: FOTO
//   Ortam değişkenleri: ADMIN_PASSWORD, TURNSTILE_SITE_KEY, TURNSTILE_SECRET

export const LANGS = ['tr', 'de', 'en'];
export const REASONS = ['bulanik', 'konu-disi', 'telif', 'kisisel', 'uygunsuz', 'diger'];
const MAX_IMAGE = 3 * 1024 * 1024;

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}

export function isConfigured(env) {
  return Boolean(env.DB && env.FOTO && env.ADMIN_PASSWORD && env.TURNSTILE_SECRET && env.TURNSTILE_SITE_KEY);
}

let schemaReady = false;
export async function ensureSchema(env) {
  if (schemaReady) return;
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY, token TEXT NOT NULL, kind TEXT NOT NULL DEFAULT 'photo', lang TEXT NOT NULL,
      name TEXT NOT NULL, title TEXT, text TEXT, mime TEXT,
      status TEXT NOT NULL DEFAULT 'pending', reason TEXT, note TEXT,
      likes INTEGER NOT NULL DEFAULT 0, featured TEXT, ip_hash TEXT,
      created_at INTEGER NOT NULL, decided_at INTEGER)`),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_sub_status ON submissions(status, created_at)'),
    env.DB.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_sub_token ON submissions(token)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS login_attempts (ip_hash TEXT NOT NULL, at INTEGER NOT NULL)'),
  ]);
  schemaReady = true;
}

export function randomHex(bytes) {
  const a = crypto.getRandomValues(new Uint8Array(bytes));
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(text) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** IP adresini saklamamak için tuzlu özet (yalnızca kötüye kullanımı sınırlamak için). */
export async function ipHash(request, env) {
  const ip = request.headers.get('cf-connecting-ip') || 'yok';
  return (await sha256Hex(`fincanla-ip:${env.ADMIN_PASSWORD}:${ip}`)).slice(0, 32);
}

export async function verifyTurnstile(env, token, request) {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET);
  body.append('response', token);
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) body.append('remoteip', ip);
  try {
    const url = env.TURNSTILE_VERIFY_URL || 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const r = await fetch(url, { method: 'POST', body });
    const data = await r.json().catch(() => ({}));
    return data.success === true;
  } catch {
    return false;
  }
}

/** Yalnızca JPEG, PNG ve WebP kabul edilir; türü dosyanın ilk baytlarından anlarız. */
export function detectImage(bytes) {
  if (bytes.length > MAX_IMAGE || bytes.length < 100) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
  const riff = String.fromCharCode(...bytes.slice(0, 4));
  const webp = String.fromCharCode(...bytes.slice(8, 12));
  if (riff === 'RIFF' && webp === 'WEBP') return 'image/webp';
  return null;
}

export function cleanText(value, max) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, max);
}

// --- Yönetici oturumu: şifre doğruysa imzalı, HttpOnly bir çerez verilir. ---
const COOKIE = 'fincanla_yonetim';
const SESSION_HOURS = 12;

async function hmacKey(env) {
  const raw = new TextEncoder().encode(`fincanla-session:${env.ADMIN_PASSWORD}`);
  const digest = await crypto.subtle.digest('SHA-256', raw);
  return crypto.subtle.importKey('raw', digest, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

function toHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function fromHex(hex) {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export async function sessionCookie(env) {
  const exp = Date.now() + SESSION_HOURS * 3600 * 1000;
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(env), new TextEncoder().encode(String(exp)));
  return `${COOKIE}=${exp}.${toHex(sig)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`;
}

export const clearCookie = `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export async function isAdmin(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  const cookie = request.headers.get('cookie') || '';
  const m = cookie.match(new RegExp(`${COOKIE}=(\\d+)\\.([0-9a-f]{64})`));
  if (!m) return false;
  const exp = Number(m[1]);
  if (!(exp > Date.now())) return false;
  return crypto.subtle.verify('HMAC', await hmacKey(env), fromHex(m[2]), new TextEncoder().encode(m[1]));
}

/** Şifreyi zamanlamaya dayalı tahmine karşı eşit sürede karşılaştırır. */
export async function passwordMatches(env, given) {
  const a = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(given ?? ''))));
  const b = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(env.ADMIN_PASSWORD)));
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Yönetici isteklerini korur: yapılandırma + oturum + yalnızca JSON ile POST. */
export async function guardAdmin(request, env) {
  if (!isConfigured(env)) return json({ error: 'not_configured' }, 503);
  if (!(await isAdmin(request, env))) return json({ error: 'unauthorized' }, 401);
  if (request.method === 'POST' && !(request.headers.get('content-type') || '').includes('application/json')) {
    return json({ error: 'bad_request' }, 400);
  }
  await ensureSchema(env);
  return null;
}
