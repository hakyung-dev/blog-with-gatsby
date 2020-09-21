import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts/index';
import Not from '../styles/images/notFound.png';

const NotFound = () => {
  return (
    <Layout title={`404`}>
      <section>
        <div className="container template-top">
          <h1 className="not-title">Page Not Found</h1>
        </div>
      </section>
      <section className="not-page">
        <Link className="back-text" to="/">
          404
        </Link>
        <div className="float-container">
          <img className="img" src={Not} alt="404" />
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
