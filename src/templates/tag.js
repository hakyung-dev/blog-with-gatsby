import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';

import Layout from '../layouts/index';
import Head from '../components/Head';
import PostList from '../components/BasicList';
import TagButton from '../components/ActiveLinkButton';

const tags = (props) => {
  const { data, pageContext } = props;

  const tagList = data.allTags.group.map((category, i) => {
    const kebabCategory = _.kebabCase(category.fieldValue);

    return (
      <li key={i}>
        <TagButton
          name={category.fieldValue}
          path={`/tags/${kebabCategory}`}
          type={`button`}
          classname={`bottom-tag`}
        />
      </li>
    );
  });

  return (
    <Layout>
      <Head title={`Tag - ${pageContext.tag}`} />
      <section>
        <div className="container filter-top">
          <h1 className="title">
            Posts tagged as <span className="by">{`${pageContext.tag}`}</span>
          </h1>
        </div>
        <div className="container-wide filter-list">
          <PostList postEdges={data.postsByTag.edges} />
        </div>
      </section>
      <section className="section-grey">
        <div className="container all">
          <div className="title">All Tags</div>
          <ul className="all-button">{tagList}</ul>
        </div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($tag: [String]) {
    postsByTag: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { nav: { eq: "blog" } }
        frontmatter: { tags: { in: $tag } }
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
    allTags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;

export default tags;
