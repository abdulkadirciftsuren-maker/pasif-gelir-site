import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const product = z.object({
  name: z.string(),
  bestFor: z.string(),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  store: z.enum(['trendyol', 'hepsiburada', 'amazonTr', 'amazonUs']),
  url: z.string(),
});

const posts = defineCollection({
  // Dosya yolu: src/content/posts/<dil>/<adres>.md  → id: "tr/v60-demleme-rehberi"
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(70).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['yontem', 'ekipman', 'temel']),
    // Aynı yazının farklı dillerdeki sürümleri aynı anahtarı paylaşır (hreflang bağlantısı için).
    translationKey: z.string(),
    products: z.array(product).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
