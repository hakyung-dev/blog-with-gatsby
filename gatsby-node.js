const path = require('path');
const _ = require('lodash');

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');
    const nav = node.frontmatter.nav;

    createNodeField({
      node,
      name: 'slug',
      value: _.kebabCase(slug),
    });

    createNodeField({
      node,
      name: 'nav',
      value: nav,
    });
  }
};
