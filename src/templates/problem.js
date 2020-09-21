import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import {
  FaThermometerQuarter,
  FaThermometerHalf,
  FaThermometerFull,
  FaTag,
} from 'react-icons/fa';

import Layout from '../layouts/index';
import Button from '../components/ActiveLinkButton';
import Comments from '../components/Comments';

const Algorithm = (props) => {
  const { fields, frontmatter, html } = props.data.algorithmPost;

  const postTagList = frontmatter.tags.map((tag, i) => {
    const kebabTag = _.kebabCase(tag);
    return (
      <li key={i}>
        <Button
          path={`/tags/${kebabTag}`}
          type={`button`}
          name={tag}
          classname={`post-tag`}
        />
      </li>
    );
  });

  const seo = {
    description: `${frontmatter.from} ${frontmatter.title} 알고리즘 문제 자바스크립트로 풀기`,
    path: `algorithm/${fields.slug}`,
    image: frontmatter.thumbnail.childImageSharp.fixed.src,
    isStructuredData: `blog`,
  };

  const icon =
    frontmatter.level === 'Easy' ? (
      <div className="level blue">
        <FaThermometerQuarter />
      </div>
    ) : frontmatter.level === 'Medium' ? (
      <div className="level orange">
        <FaThermometerHalf />
      </div>
    ) : (
      <div className="level red">
        <FaThermometerFull />
      </div>
    );

  return (
    <Layout title={frontmatter.title} pageSEO={seo}>
      <section>
        <div className="container template-top">
          <div className="problem-info">
            {icon}
            <h1 className="title">{frontmatter.title}</h1>
            <span className="from">/{frontmatter.from}</span>
          </div>
        </div>
      </section>
      <section>
        <div
          className="container markdown"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
      <section className="container problem-bottom-tag">
        <div className="title">
          <FaTag /> Tags
        </div>
        <ul className="tag-list">{postTagList}</ul>
      </section>
      <Comments />
    </Layout>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    algorithmPost: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        nav
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        from
        level
        thumbnail {
          childImageSharp {
            fixed(width: 130, height: 130) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      html
      excerpt
    }
  }
`;

export default Algorithm;
