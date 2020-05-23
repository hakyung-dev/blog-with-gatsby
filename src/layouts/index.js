import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import config from '../../contents/config';

import Header from './Header';
import Footer from './Footer';
import '../styles/index.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);

  return (
    <>
      <Header title={data.site.siteMetadata.title} navArray={config.siteMenu} />
      <main id="main">{children}</main>
      <Footer author={data.site.siteMetadata.author} />
    </>
  );
};

export default Layout;
