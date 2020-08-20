import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';
import Buttons from '../components/StrongLinkButton';

const CategoriesPage = (props) => {
  const { group } = props.data.allMarkdownRemark;

  const seo = {
    description: `블로그 전체 카테고리 리스트`,
    path: `/categories`,
  };

  return (
    <Layout title={`Categories`} pageSEO={seo}>
      <section>
        <div className="container filter-top">
          <h1 className="title">All Categories</h1>
        </div>
        <div className="container all">
          <Buttons nav={`categories`} group={group} />
        </div>
      </section>
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
