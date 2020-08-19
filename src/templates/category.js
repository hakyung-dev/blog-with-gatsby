import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';

import Layout from '../layouts/index';
import PostList from '../components/BasicList';
import CategoryButton from '../components/ActiveLinkButton';

const category = (props) => {
  const { data, pageContext } = props;

  const categoryList = data.allCategories.group.map((category, i) => {
    const kebabCategory = _.kebabCase(category.fieldValue);
    return (
      <li key={i}>
        <CategoryButton
          name={category.fieldValue}
          path={`/categories/${kebabCategory}`}
          type={`button`}
          classname={`bottom-category`}
        />
      </li>
    );
  });

  return (
    <Layout title={`Category - ${pageContext.category}`}>
      <section>
        <div className="container filter-top">
          <h1 className="title">
            Posts in category:{' '}
            <span className="by">{`${pageContext.category}`}</span>
          </h1>
        </div>
        <div className="container-wide filter-list">
          <PostList postEdges={data.postsByCategory.edges} />
        </div>
      </section>
      <section className="section-grey">
        <div className="container all">
          <div className="title">All Categories</div>
          <ul className="all-button">{categoryList}</ul>
        </div>
      </section>
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
            category
            thumbnail {
              childImageSharp {
                fixed(width: 45, height: 45) {
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
