const config = require('./contents/config');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    author: config.author
  },
  plugins: [
    'gatsby-plugin-sass',
  ],
}
