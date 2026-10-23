import { ensureSchema, isConfigured } from '../lib/common.js';

// Yalnızca onaylanmış fotoğraflar herkese gösterilir.
export async function onRequestGet({ params, env }) {
  if (!isConfigured(env)) return new Response('Not found', { status: 404 });
  const id = String(params.id || '');
  if (!/^[0-9a-f]{16}$/.test(id)) return new Response('Not found', { status: 404 });
  await ensureSchema(env);
  const row = await env.DB.prepare("SELECT mime FROM submissions WHERE id = ? AND status = 'approved'").bind(id).first();
  if (!row) return new Response('Not found', { status: 404 });
  const img = await env.FOTO.get(`img:${id}`, { type: 'arrayBuffer' });
  if (!img) return new Response('Not found', { status: 404 });
  return new Response(img, {
    headers: { 'content-type': row.mime, 'cache-control': 'public, max-age=86400', 'x-content-type-options': 'nosniff' },
  });
}
