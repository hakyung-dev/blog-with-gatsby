import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';

import Layout from '../layouts/index';
import Head from '../components/Head';
import Button from '../components/ActiveLinkButton';

const Post = (props) => {
  const { frontmatter, html } = props.data.blogPost;
  const kebabCategory = _.kebabCase(frontmatter.category);

  const postTagList = frontmatter.tags.map((tag, i) => {
    const kebabTag = _.kebabCase(tag);
    return (
      <li key={i}>
        <Button path={`/tags/${kebabTag}`} type={`post-tag`} name={tag} />
      </li>
    );
  });

  return (
    <Layout>
      <Head title={frontmatter.title} />
      <div className="blog-post">
        <div className="post-top">
          <div className="wrap">
            <Button
              path={`/categories/${kebabCategory}`}
              type={`button-path`}
              name={`/categories/${kebabCategory}`}
            />
            <h1 className="title">{frontmatter.title}</h1>
            <div className="date">{frontmatter.date}</div>
            <ul className="tag-list">{postTagList}</ul>
          </div>
          <div className="img">
            <Img
              className="thumbnail"
              fixed={frontmatter.thumbnail.childImageSharp.fixed}
            />
          </div>
        </div>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    blogPost: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        nav
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        category
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

export default Post;
