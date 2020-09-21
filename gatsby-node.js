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

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve('./src/templates/post.js');
  const problemTemplate = path.resolve('./src/templates/problem.js');
  const pageTemplate = path.resolve('./src/templates/page.js');
  const categoryTemplate = path.resolve('./src/templates/category.js');
  const tagTemplate = path.resolve('./src/templates/tag.js');

  const markdownBlog = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { nav: { eq: "blog" } } }) {
        edges {
          node {
            frontmatter {
              tags
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const markdownAlgorithm = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { nav: { eq: "algorithm" } } }) {
        edges {
          node {
            frontmatter {
              from
              level
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const markdownPage = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { nav: { eq: "page" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const categorySet = new Set();
  const tagSet = new Set();
  const postEdges = markdownBlog.data.allMarkdownRemark.edges;
  const algorithmEdges = markdownAlgorithm.data.allMarkdownRemark.edges;
  const pageEdges = markdownPage.data.allMarkdownRemark.edges;

  postEdges.forEach((edge) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    createPage({
      component: postTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  pageEdges.forEach((edge) => {
    createPage({
      component: pageTemplate,
      path: `/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  algorithmEdges.forEach((edge) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    createPage({
      component: problemTemplate,
      path: `/algorithm/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  tagSet.forEach((tag) => {
    const kebabTag = _.kebabCase(tag);

    createPage({
      component: tagTemplate,
      path: `/tags/${kebabTag}`,
      context: {
        tag,
        kebabTag,
      },
    });
  });

  categorySet.forEach((category) => {
    const kebabCategory = _.kebabCase(category);

    createPage({
      component: categoryTemplate,
      path: `/categories/${kebabCategory}`,
      context: {
        category,
        kebabCategory,
      },
    });
  });
};
