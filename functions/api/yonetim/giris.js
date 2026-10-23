import { clearCookie, ensureSchema, ipHash, isAdmin, isConfigured, json, passwordMatches, sessionCookie } from '../../lib/common.js';

const MAX_TRIES = 10;
const WINDOW_MS = 15 * 60 * 1000;

// Oturum açık mı?
export async function onRequestGet({ request, env }) {
  if (!isConfigured(env)) return json({ ready: false, admin: false });
  return json({ ready: true, admin: await isAdmin(request, env) });
}

// Şifre ile giriş (15 dakikada en fazla 10 deneme).
export async function onRequestPost({ request, env }) {
  if (!isConfigured(env)) return json({ error: 'not_configured' }, 503);
  await ensureSchema(env);
  const ip = await ipHash(request, env);
  const since = Date.now() - WINDOW_MS;
  const tries = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE ip_hash = ? AND at > ?').bind(ip, since).first();
  if (tries.n >= MAX_TRIES) return json({ error: 'too_many' }, 429);

  const body = await request.json().catch(() => ({}));
  if (!(await passwordMatches(env, body.password))) {
    await env.DB.batch([
      env.DB.prepare('INSERT INTO login_attempts (ip_hash, at) VALUES (?, ?)').bind(ip, Date.now()),
      env.DB.prepare('DELETE FROM login_attempts WHERE at < ?').bind(since),
    ]);
    return json({ error: 'wrong_password' }, 401);
  }
  return json({ ok: true }, 200, { 'set-cookie': await sessionCookie(env) });
}

// Çıkış.
export async function onRequestDelete() {
  return json({ ok: true }, 200, { 'set-cookie': clearCookie });
}
