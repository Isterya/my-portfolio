import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

import { SITE_URL, absoluteUrl } from './src/config/site.ts';
import { legalRevisions } from './src/data/legalRevisions.ts';
import { seoHome } from './src/data/seoData.ts';

const OG_IMAGE_SIZE = { width: 1200, height: 630 };

const meta = (attrs: Record<string, string>, managedByHelmet = true): HtmlTagDescriptor => ({
  tag: 'meta',
  attrs: managedByHelmet ? { ...attrs, 'data-rh': 'true' } : attrs,
});

const homeHeadTags = (): HtmlTagDescriptor[] => [
  { tag: 'title', children: seoHome.title },
  meta({ name: 'description', content: seoHome.description }),
  { tag: 'link', attrs: { rel: 'canonical', href: seoHome.url ?? SITE_URL, 'data-rh': 'true' } },
  meta({ property: 'og:type', content: 'website' }, false),
  meta({ property: 'og:site_name', content: 'Isterya' }, false),
  meta({ property: 'og:title', content: seoHome.title }),
  meta({ property: 'og:description', content: seoHome.description }),
  meta({ property: 'og:url', content: seoHome.url ?? SITE_URL }),
  meta({ property: 'og:image', content: seoHome.image ?? '' }),
  meta({ property: 'og:image:width', content: String(OG_IMAGE_SIZE.width) }, false),
  meta({ property: 'og:image:height', content: String(OG_IMAGE_SIZE.height) }, false),
  meta({ name: 'twitter:card', content: 'summary_large_image' }),
  meta({ name: 'twitter:title', content: seoHome.title }),
  meta({ name: 'twitter:description', content: seoHome.description }),
  meta({ name: 'twitter:image', content: seoHome.image ?? '' }),
];

const sitemap = () => {
  const pages = [
    { path: '/' },
    { path: '/privacy-policy', lastmod: legalRevisions.privacyPolicy },
    { path: '/user-terms', lastmod: legalRevisions.termsOfUse },
  ];

  const urls = pages
    .map(({ path: pagePath, lastmod }) =>
      [
        '  <url>',
        `    <loc>${absoluteUrl(pagePath)}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        '  </url>',
      ].join('\n'),
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

const robots = () => `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;

const seo = (): Plugin => ({
  name: 'portfolio-seo',
  transformIndexHtml: () => homeHeadTags(),
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots() });
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
  },
});

export default defineConfig({
  plugins: [react(), seo()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
          @use "@/styles/animations" as *;
        `,
      },
    },
  },
  test: {
    exclude: [...configDefaults.exclude, 'server/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@components': path.resolve(import.meta.dirname, 'src/components'),
      '@styles': path.resolve(import.meta.dirname, 'src/styles'),
    },
  },
});
