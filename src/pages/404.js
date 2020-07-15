import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts/index';
import Head from '../components/Head';
import Not from '../styles/images/notFound.png';

const NotFound = () => {
  return (
    <Layout>
      <Head title={`404`} />
      <div className="section">
        <div className="content not">
          <h1 className="title">Page Not Found</h1>
          <Link className="back-text" to="/">
            404
          </Link>
          <div className="float-container">
            <img className="img" src={Not} alt="404" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
