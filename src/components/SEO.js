import React from 'react';
import { Helmet } from 'react-helmet';

import config from '../../contents/config';

const SEO = (props) => {
  const { pageTitle } = props;

  let title = pageTitle;

  return (
    <Helmet>
      <title>{`${title} | ${config.siteTitle}`}</title>
    </Helmet>
  );
};

export default SEO;
