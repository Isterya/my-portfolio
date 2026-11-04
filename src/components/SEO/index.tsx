import { Helmet } from 'react-helmet-async';

import { SeoData } from '@/data/seoData';

// index.html ships the home page values of these tags with data-rh="true", so crawlers that do not
// run JavaScript still get them, and Helmet replaces them instead of adding duplicates.
const SEO = ({ title, description, url, image }: SeoData) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    {image && <meta property="og:image" content={image} />}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
  </Helmet>
);

export default SEO;
