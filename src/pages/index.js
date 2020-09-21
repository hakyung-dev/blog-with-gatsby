import React from 'react';
import { Link, graphql } from 'gatsby';

import pageText from '../../contents/data/pageText';
import Layout from '../layouts';
import SimpleList from '../components/SimpleList';
import Typing from '../components/Typing';

const IndexPage = (props) => {
  const { latestPost, indexCode } = props.data;

  return (
    <Layout title={`Home`}>
      <section>
        <div className="container-wide index-header">
          <div className="title">
            <h1 className="type">{`Hi! `}</h1>
            <h1 className="type">
              {`I'm `}
              <Typing pairs={pageText.indexHi} />
            </h1>
            <div className="description">{pageText.index}</div>
          </div>
          <Link className="code" to="/about">
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: indexCode.html }}
            />
          </Link>
        </div>
      </section>
      <section className="bg-grey">
        <div className="container index-sub">
          <Link className="top" to="/blog">
            <h2 className="title">Latest Blog Posts</h2>
          </Link>
          <div className="body">
            <SimpleList postEdges={latestPost.edges} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    indexCode: markdownRemark(
      frontmatter: { nav: { eq: "data" }, title: { eq: "indexCode" } }
    ) {
      html
    }

    latestPost: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { nav: { eq: "blog" } } }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 35, height: 35) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
            nav
          }
        }
      }
    }
  }
`;

export default IndexPage;
