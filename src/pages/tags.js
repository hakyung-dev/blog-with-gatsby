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
      <section>
        <div className="container filter-top">
          <h1 className="title">All Categories</h1>
        </div>
        <div className="container all">
          <Buttons nav={`tags`} group={group} />
        </div>
      </section>
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
