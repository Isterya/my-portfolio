import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

const SEO = ({ title, description, url, image }: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta
      name="description"
      content={description}
    />
    <meta
      property="og:title"
      content={title}
    />
    <meta
      property="og:description"
      content={description}
    />
    <meta
      property="og:url"
      content={url}
    />
    <meta
      property="og:image"
      content={image}
    />
    <meta
      name="twitter:card"
      content="summary_large_image"
    />
    <meta
      name="twitter:title"
      content={title}
    />
    <meta
      name="twitter:description"
      content={description}
    />
    <meta
      name="twitter:image"
      content={image}
    />
    <link
      rel="canonical"
      href={url}
    />
  </Helmet>
);

export default SEO;
