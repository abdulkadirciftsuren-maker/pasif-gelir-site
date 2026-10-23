import { guardAdmin, json } from '../../lib/common.js';

const STATUSES = ['pending', 'approved', 'rejected', 'removed'];

// Yönetici listesi: bekleyen, yayındaki, reddedilen ya da kaldırılan gönderiler.
export async function onRequestGet({ request, env }) {
  const blocked = await guardAdmin(request, env);
  if (blocked) return blocked;
  const status = new URL(request.url).searchParams.get('durum');
  const s = STATUSES.includes(status) ? status : 'pending';
  const order = s === 'pending' ? 'created_at ASC' : 'decided_at DESC';
  const { results } = await env.DB.prepare(
    `SELECT id, lang, name, title, text, status, reason, note, likes, featured, created_at, decided_at FROM submissions WHERE status = ? ORDER BY ${order} LIMIT 100`,
  ).bind(s).all();
  const counts = await env.DB.prepare('SELECT status, COUNT(*) AS n FROM submissions GROUP BY status').all();
  return json({ items: results, counts: Object.fromEntries(counts.results.map((r) => [r.status, r.n])) });
}
