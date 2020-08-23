import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

const Page = (props) => {
  const { html, frontmatter, fields } = props.data.page;

  const seo = {
    description: frontmatter.description,
    path: `/${fields.slug}`,
  };

  return (
    <Layout title={`${frontmatter.title}`} pageSEO={seo}>
      <section className="page-top">
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
        description
      }
      html
    }
  }
`;

export default Page;
