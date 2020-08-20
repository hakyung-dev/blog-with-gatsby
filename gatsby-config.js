const config = require('./contents/config');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    author: config.author,
    siteUrl: config.siteUrl,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: ['/blog'], disallow: ['/about'] }],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contents',
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              showCaptions: true,
              markdownCaptions: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
          },
        ],
      },
    },
  ],
};
