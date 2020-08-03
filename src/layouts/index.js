import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import config from '../../contents/config';
import ThemeContext from '../store/ThemeContext';

import Header from './Header';
import Footer from './Footer';
import '../styles/index.scss';

const Layout = ({ children }) => {
  const { state } = useContext(ThemeContext);

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
    <div className={state.isDarkMode ? `theme dark` : `theme`}>
      <Header title={data.site.siteMetadata.title} navArray={config.siteMenu} />
      <main id="main">{children}</main>
      <Footer author={data.site.siteMetadata.author} />
    </div>
  );
};

export default Layout;
