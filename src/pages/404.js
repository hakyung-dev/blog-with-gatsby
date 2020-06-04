import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts/index';
import Head from '../components/Head';
import Not from '../images/notFound.png';

const NotFound = () => {
  return (
    <Layout>
      <Head title={`404`} />
      <div className="section">
        <div className="content not">
          <h1 className="title">Page Not Found</h1>
          <Link className="link" to="/">
            &#8640; Head Home
          </Link>
          <div className="back-text">404</div>
          <div className="float-container">
            <img className="img" src={Not} alt="404" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
