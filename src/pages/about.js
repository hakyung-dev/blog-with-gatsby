import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';
import Top from '../components/PageTop';

const AboutPage = (props) => {
  const { about } = props.data;

  return (
    <Layout title={`About`}>
      <Top title={`About Me`} bg={`about`} />
      <section className="page-body">
        <div
          className="container markdown"
          dangerouslySetInnerHTML={{ __html: about.html }}
        />
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query AboutQuery {
    about: markdownRemark(
      frontmatter: { nav: { eq: "data" }, title: { eq: "about" } }
    ) {
      html
    }
  }
`;

export default AboutPage;
