import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';
import Buttons from '../components/StrongLinkButton';

const TagsPage = (props) => {
  const { group } = props.data.allMarkdownRemark;

  const seo = {
    description: `블로그 전체 태그 리스트`,
    path: `/tags`,
  };

  return (
    <Layout title={`Tags`} pageSEO={seo}>
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
