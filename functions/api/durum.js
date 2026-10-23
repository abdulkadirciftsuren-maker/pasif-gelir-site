import { ensureSchema, isConfigured, json } from '../lib/common.js';

// Gönderen kişi, kendisine verilen gizli linkle gönderisinin durumunu görür.
export async function onRequestGet({ request, env }) {
  if (!isConfigured(env)) return json({ error: 'not_configured' }, 503);
  await ensureSchema(env);
  const token = new URL(request.url).searchParams.get('t') || '';
  if (!/^[0-9a-f]{32}$/.test(token)) return json({ error: 'not_found' }, 404);
  const row = await env.DB.prepare('SELECT id, status, reason, note, created_at, decided_at FROM submissions WHERE token = ?').bind(token).first();
  if (!row) return json({ error: 'not_found' }, 404);
  return json({
    status: row.status,
    reason: row.status === 'rejected' || row.status === 'removed' ? row.reason : null,
    note: row.status === 'rejected' || row.status === 'removed' ? row.note : null,
    id: row.status === 'approved' ? row.id : null,
    createdAt: row.created_at,
    decidedAt: row.decided_at,
  });
}
