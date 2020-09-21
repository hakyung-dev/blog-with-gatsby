import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';

import Layout from '../layouts/index';
import PostList from '../components/BasicList';
import TagButton from '../components/ActiveLinkButton';

const tags = (props) => {
  const { data, pageContext, path } = props;

  const tagList = data.allTags.group.map((tag, i) => {
    const kebabTag = _.kebabCase(tag.fieldValue);

    return (
      <li key={i}>
        <TagButton
          name={tag.fieldValue}
          path={`/tags/${kebabTag}`}
          type={`button`}
          classname={`bottom-tag`}
        />
      </li>
    );
  });

  const seo = {
    description: `${pageContext.tag} 태그된 포스트`,
    path,
  };

  return (
    <Layout title={`Tag - ${pageContext.tag}`} pageSEO={seo}>
      <section>
        <div className="container template-top">
          <h1 className="title">
            Posts tagged as <span className="by">{`${pageContext.tag}`}</span>
          </h1>
        </div>
      </section>
      <section>
        <div className="container-wide page-body">
          <PostList postEdges={data.postsByTag.edges} />
        </div>
      </section>
      <section>
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
        fields: { nav: { in: ["blog", "algorithm"] } }
        frontmatter: { tags: { in: $tag } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            nav
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
