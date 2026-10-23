import { ensureSchema, isConfigured, json } from '../lib/common.js';

// Yayındaki okur fotoğrafları (en yeni önce).
export async function onRequestGet({ request, env }) {
  if (!isConfigured(env)) return json({ error: 'not_configured' }, 503);
  await ensureSchema(env);
  const url = new URL(request.url);
  const page = Math.max(0, Math.min(50, parseInt(url.searchParams.get('sayfa') || '0', 10) || 0));
  const { results } = await env.DB.prepare(
    "SELECT id, lang, name, title, text, likes, featured, decided_at FROM submissions WHERE status = 'approved' ORDER BY decided_at DESC LIMIT 25 OFFSET ?",
  ).bind(page * 24).all();
  return json(
    { items: results.slice(0, 24), more: results.length > 24 },
    200,
    { 'cache-control': 'public, max-age=60' },
  );
}
