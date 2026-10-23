import { REASONS, cleanText, guardAdmin, json } from '../../lib/common.js';

// Yönetici kararı: yayınla, reddet ya da (yayındakini) kaldır.
// Reddedilen ve kaldırılan gönderilerde fotoğraf ve kişisel bilgiler silinir; yalnızca durum ve sebep kalır.
export async function onRequestPost({ request, env }) {
  const blocked = await guardAdmin(request, env);
  if (blocked) return blocked;
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || '');
  if (!/^[0-9a-f]{16}$/.test(id)) return json({ error: 'bad_request' }, 400);
  const row = await env.DB.prepare('SELECT status FROM submissions WHERE id = ?').bind(id).first();
  if (!row) return json({ error: 'not_found' }, 404);
  const now = Date.now();

  if (body.action === 'approve') {
    if (row.status !== 'pending') return json({ error: 'bad_state' }, 409);
    await env.DB.prepare("UPDATE submissions SET status = 'approved', decided_at = ? WHERE id = ?").bind(now, id).run();
    return json({ ok: true });
  }

  if (body.action === 'reject' || body.action === 'remove') {
    if (body.action === 'reject' && row.status !== 'pending') return json({ error: 'bad_state' }, 409);
    if (body.action === 'remove' && row.status !== 'approved') return json({ error: 'bad_state' }, 409);
    const reason = REASONS.includes(body.reason) ? body.reason : 'diger';
    const note = cleanText(body.note, 200) || null;
    const status = body.action === 'reject' ? 'rejected' : 'removed';
    await env.FOTO.delete(`img:${id}`);
    await env.DB.prepare(
      "UPDATE submissions SET status = ?, reason = ?, note = ?, decided_at = ?, name = '', title = NULL, text = NULL, ip_hash = NULL WHERE id = ?",
    ).bind(status, reason, note, now, id).run();
    return json({ ok: true });
  }

  return json({ error: 'bad_request' }, 400);
}
