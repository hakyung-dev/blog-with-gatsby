import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts/index';
import Not from '../styles/images/notFound.png';

const NotFound = () => {
  return (
    <Layout title={`404`}>
      <section className="page-top">
        <div className="container not">
          <h1 className="title">Page Not Found</h1>
          <Link className="back-text" to="/">
            404
          </Link>
          <div className="float-container">
            <img className="img" src={Not} alt="404" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
