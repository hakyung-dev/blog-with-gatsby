import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

const Page = (props) => {
  const { html, frontmatter } = props.data.page;

  return (
    <Layout title={`${frontmatter.title}`}>
      <section>
        <div className="container md-page">
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        nav
        slug
      }
      frontmatter {
        title
      }
      html
    }
  }
`;

export default Page;
