import React from 'react';
import { Link, graphql } from 'gatsby';

import pageText from '../../contents/data/pageText';
import Layout from '../layouts';
import Head from '../components/Head';
import SimpleList from '../components/SimpleList';
import Typing from '../components/Typing';

const IndexPage = (props) => {
  const { latestPost, indexCode } = props.data;

  return (
    <Layout>
      <Head title={`Home`} />
      <div className="section">
        <div className="content index-header">
          <div className="title">
            <h1>{`Hi! `}</h1>
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
      </div>
      <div className="section-grey">
        <div className="content index-sub">
          <div className="title">
            <h2>Latest Blog Posts</h2>
            <Link className="link" to="/blog">
              &#8640; View All
            </Link>
          </div>
          <div className="body">
            <SimpleList postEdges={latestPost.edges} />
          </div>
        </div>
      </div>
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
                fixed(width: 30, height: 30) {
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
