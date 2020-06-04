import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';
import Head from '../components/Head';
import Buttons from '../components/StrongLinkButton';

const CategoriesPage = (props) => {
  const { group } = props.data.allMarkdownRemark;

  return (
    <Layout>
      <Head title={`Categories`} />
      <div className="content filter">
        <h1 className="filter-title">All Categories</h1>
        <Buttons nav={`categories`} group={group} />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query CategoriesQuery {
    allMarkdownRemark {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default CategoriesPage;
