import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';
import Head from '../components/Head';

const Page = (props) => {
  const { html, frontmatter } = props.data.page;

  return (
    <Layout>
      <Head title={`${frontmatter.title}`} />
      <div className="md-page">
        <div className="md-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
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
