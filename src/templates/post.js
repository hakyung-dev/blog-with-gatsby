import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';

import Layout from '../layouts/index';
import Button from '../components/ActiveLinkButton';
import Comments from '../components/Comments';

const Post = (props) => {
  const { fields, frontmatter, html, excerpt } = props.data.blogPost;
  const kebabCategory = _.kebabCase(frontmatter.category);

  const categoryButton = frontmatter.category ? (
    <Button
      name={`/categories/${kebabCategory}`}
      path={`/categories/${kebabCategory}`}
      type={`text`}
      classname={`path`}
    />
  ) : (
    <div className="path" />
  );

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
    description: excerpt,
    path: `blog/${fields.slug}`,
    image: frontmatter.thumbnail.childImageSharp.fixed.src,
    isStructuredData: `blog`,
  };

  return (
    <Layout title={frontmatter.title} pageSEO={seo}>
      <section>
        <div className="container template-top">
          <div className="post-info">
            {categoryButton}
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
      </section>
      <section>
        <div
          className="container markdown"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
      <Comments />
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
