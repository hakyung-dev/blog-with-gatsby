import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';
import Top from '../components/PageTop';

const Page = (props) => {
  const { html, frontmatter, fields } = props.data.page;

  const seo = {
    description: frontmatter.description,
    path: `/${fields.slug}`,
  };

  return (
    <Layout title={`${frontmatter.title}`} pageSEO={seo}>
      <Top title={frontmatter.title} bg={`md`} />
      <section className="container page-body">
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
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
