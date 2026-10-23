import { guardAdmin } from '../../../lib/common.js';

// Yönetici, onay bekleyen fotoğrafları da görebilir.
export async function onRequestGet({ request, params, env }) {
  const blocked = await guardAdmin(request, env);
  if (blocked) return blocked;
  const id = String(params.id || '');
  if (!/^[0-9a-f]{16}$/.test(id)) return new Response('Not found', { status: 404 });
  const res = await env.FOTO.getWithMetadata(`img:${id}`, { type: 'arrayBuffer' });
  if (!res.value) return new Response('Not found', { status: 404 });
  return new Response(res.value, {
    headers: { 'content-type': res.metadata?.mime || 'image/jpeg', 'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff' },
  });
}
