import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './i18n/ui';

export type Post = CollectionEntry<'posts'>;

export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');

export function postUrl(post: Post): string {
  const lang = postLang(post);
  return lang === defaultLang ? `/${postSlug(post)}/` : `/${lang}/${postSlug(post)}/`;
}

export async function getPosts(lang?: Lang): Promise<Post[]> {
  const all = await getCollection('posts', (p) => !p.data.draft);
  return all
    .filter((p) => !lang || postLang(p) === lang)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Bir yazının diğer dillerdeki karşılıklarının adresleri. */
export async function alternatesFor(post: Post): Promise<Partial<Record<Lang, string>>> {
  const all = await getPosts();
  const out: Partial<Record<Lang, string>> = {};
  for (const p of all) {
    if (p.data.translationKey === post.data.translationKey) out[postLang(p)] = postUrl(p);
  }
  return out;
}

export function readingMinutes(body = ''): number {
  return Math.max(1, Math.round(body.split(/\s+/).length / 200));
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
