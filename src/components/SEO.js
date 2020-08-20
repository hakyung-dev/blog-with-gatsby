import React from 'react';
import { Helmet } from 'react-helmet';
import urljoin from 'url-join';

import config from '../../contents/config';

const SEO = (props) => {
  const { pageTitle, pageSEO } = props;

  let title = pageTitle;
  let description = config.siteDescription;
  let url = urljoin(config.siteUrl);
  let image = config.siteLogo;

  const jasonLd = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: title,
      alternateName: config.siteTitle,
      logo: config.siteLogo,
    },
  ];

  if (pageSEO) {
    description = pageSEO.description;
    url = urljoin(config.siteUrl, pageSEO.path);

    if (pageSEO.image) {
      image = urljoin(config.siteUrl, pageSEO.image);
    }

    if (pageSEO.isStructuredData === 'blog') {
      jasonLd.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': urljoin(config.siteUrl, pageSEO.isStructuredData),
                name: pageSEO.isStructuredData,
                image: config.siteLogo,
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url,
          name: `${title} | ${config.siteTitle}`,
          alternateName: config.siteTitle,
          description,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
        }
      );
    }
  }

  return (
    <Helmet>
      <title>{`${title} | ${config.siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta name="url" content={url} />
      <meta name="image" content={url} />
      <script type="application/ld+json">{JSON.stringify(jasonLd)}</script>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default SEO;
