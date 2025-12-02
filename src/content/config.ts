import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    thumbnail: z.string(),
    video: z.string().optional(),
    category: z.enum(['creative', 'ai-ads', 'f1-visuals']),
    accentColor: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    client: z.string().optional(),
    role: z.string().optional(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional()
    })).optional()
  })
});

export const collections = {
  'projects': projectsCollection
};
