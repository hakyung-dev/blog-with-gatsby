import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';
import Head from '../components/Head';
import Buttons from '../components/StrongLinkButton';

const TagsPage = (props) => {
  const { group } = props.data.allMarkdownRemark;

  return (
    <Layout>
      <Head title={`Tags`} />
      <div className="filter">
        <h1 className="filter-title">All Tags</h1>
        <Buttons nav={`tags`} group={group} />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsPage;
