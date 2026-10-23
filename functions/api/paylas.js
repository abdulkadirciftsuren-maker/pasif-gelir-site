import { LANGS, cleanText, detectImage, ensureSchema, ipHash, isConfigured, json, randomHex, verifyTurnstile } from '../lib/common.js';

const DAILY_LIMIT = 5;
const MAX_PENDING = 500;

// Okurdan fotoğraf (ve isteğe bağlı kısa yazı) alır; onay bekleyen olarak kaydeder.
export async function onRequestPost({ request, env }) {
  if (!isConfigured(env)) return json({ error: 'not_configured' }, 503);
  await ensureSchema(env);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const captcha = await verifyTurnstile(env, form.get('cf-turnstile-response'), request);
  if (!captcha.ok) {
    return json({ error: 'captcha', codes: captcha.codes }, 400);
  }

  const lang = LANGS.includes(form.get('lang')) ? form.get('lang') : 'tr';
  const name = cleanText(form.get('name'), 40);
  const title = cleanText(form.get('title'), 80);
  const text = cleanText(form.get('text'), 600);
  if (name.length < 2) return json({ error: 'name' }, 400);
  if (form.get('consent') !== '1') return json({ error: 'consent' }, 400);

  const file = form.get('image');
  if (!file || typeof file === 'string') return json({ error: 'image' }, 400);
  const bytes = new Uint8Array(await file.arrayBuffer());
  const mime = detectImage(bytes);
  if (!mime) return json({ error: 'image' }, 400);

  const ip = await ipHash(request, env);
  const since = Date.now() - 24 * 3600 * 1000;
  const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM submissions WHERE ip_hash = ? AND created_at > ?').bind(ip, since).first();
  if (recent.n >= DAILY_LIMIT) return json({ error: 'limit' }, 429);
  const pending = await env.DB.prepare("SELECT COUNT(*) AS n FROM submissions WHERE status = 'pending'").first();
  if (pending.n >= MAX_PENDING) return json({ error: 'busy' }, 503);

  const id = randomHex(8);
  const token = randomHex(16);
  await env.FOTO.put(`img:${id}`, bytes, { metadata: { mime } });
  await env.DB.prepare(
    'INSERT INTO submissions (id, token, kind, lang, name, title, text, mime, status, ip_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  ).bind(id, token, 'photo', lang, name, title || null, text || null, mime, 'pending', ip, Date.now()).run();

  return json({ ok: true, token });
}
