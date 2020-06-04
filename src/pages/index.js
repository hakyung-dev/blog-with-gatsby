import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';

import pageText from '../../contents/data/pageText';
import Layout from '../layouts';
import Head from '../components/Head';
import SimpleList from '../components/SimpleList';

const IndexPage = (props) => {
  const { latestPost, indexCode } = props.data;
  const [text, setText] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    let isTyping = true;
    let typeIndex = 0;
    let index = 0;

    const typing = () => {
      let speed = 100;
      let fullText = pageText.indexHi[index].text;
      setIcon(pageText.indexHi[index].icon);

      const changeIndex = () => {
        if (index === pageText.indexHi.length - 1) {
          index = 0;
        } else {
          index = index + 1;
        }
      };

      if (isTyping) {
        setText(fullText.substring(0, typeIndex));
        typeIndex++;

        if (typeIndex === fullText.length + 1) {
          isTyping = false;
          speed = 2500;
        }

        setTimeout(typing, speed);
      } else {
        setText(fullText.substring(0, typeIndex));
        typeIndex--;

        if (typeIndex === 0) {
          isTyping = true;
          changeIndex();
        }

        setTimeout(typing, speed);
      }
    };

    typing();
  }, []);

  return (
    <Layout>
      <Head title={`Home`} />
      <div className="section">
        <div className="content index-header">
          <div className="title">
            <h1>{`Hi! `}</h1>
            <h1 className="type">
              {`I'm ${text} ${icon}`}
              <span className="curser">_</span>
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
            icon
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
