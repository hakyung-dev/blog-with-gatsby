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
      <div className="section-about-header">
        <div className="content about-header">
          <h1 className="title">About me</h1>
          <div className="container">{pageText.about}</div>
        </div>
        <div className="float-container">
          <img src={Sit} className="image-sit" alt="page-about" />
        </div>
      </div>
      <div className="section md-page">
        <div
          className="content md-body"
          dangerouslySetInnerHTML={{ __html: about.html }}
        />
      </div>
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
