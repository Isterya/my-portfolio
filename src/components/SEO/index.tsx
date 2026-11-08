import { Helmet } from 'react-helmet-async';

import { SeoData } from '@/data/seoData';

const SEO = ({ title, description, url, image, noIndex }: SeoData) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {noIndex && <meta name="robots" content="noindex" />}
    {url && <link rel="canonical" href={url} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
  </Helmet>
);

export default SEO;
