import React from 'react';
import { graphql } from 'gatsby';

import pageText from '../../contents/data/pageText';
import Layout from '../layouts/index';
import Head from '../components/Head';
import Sit from '../styles/images/sit.png';

const AboutPage = (props) => {
  const { about } = props.data;

  return (
    <Layout>
      <Head title={`About`} />
      <section className="section-about-header">
        <div className="container about-header">
          <h1 className="title">About me</h1>
          <div className="description">{pageText.about}</div>
        </div>
        <div className="float-container">
          <img src={Sit} className="image-sit" alt="page-about" />
        </div>
      </section>
      <section className="md-page">
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
