import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';

import Layout from '../layouts/index';
import Head from '../components/Head';
import PostList from '../components/BasicList';
import CategoryButton from '../components/ActiveLinkButton';

const category = (props) => {
  const { data, pageContext } = props;

  const categoryList = data.allCategories.group.map((category, i) => {
    const kebabCategory = _.kebabCase(category.fieldValue);
    return (
      <li key={i}>
        <CategoryButton
          path={`/categories/${kebabCategory}`}
          type={`bottom-category`}
          name={category.fieldValue}
        />
      </li>
    );
  });

  return (
    <Layout>
      <Head title={`Category - ${pageContext.category}`} />
      <div className="filter">
        <h1 className="filter-title">
          Posts in category: <span className="by">{`${pageContext.category}`}</span>
        </h1>
        <div className="filter-list">
          <PostList postEdges={data.postsByCategory.edges} />
        </div>
      </div>
      <div className="section-grey">
        <div className="all">
          <div className="title">All Categories</div>
          <ul className="all-button">{categoryList}</ul>
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($category: [String]) {
    postsByCategory: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { nav: { eq: "blog" } }
        frontmatter: { category: { in: $category } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            icon
            category
            thumbnail {
              childImageSharp {
                fixed(width: 40, height: 40) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    allCategories: allMarkdownRemark {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`;

export default category;
