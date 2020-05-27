const config = require('./contents/config');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    author: config.author,
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contents',
        path: `${__dirname}/contents`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 650,
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
