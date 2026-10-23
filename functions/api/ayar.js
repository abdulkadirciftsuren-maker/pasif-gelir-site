import { isConfigured, json } from '../lib/common.js';

// Sayfaların, sistemin hazır olup olmadığını ve robot doğrulamasının açık anahtarını öğrenmesi için.
export async function onRequestGet({ env }) {
  return json({ ready: isConfigured(env), turnstileSiteKey: isConfigured(env) ? env.TURNSTILE_SITE_KEY : null });
}
