import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';
import Top from '../components/PageTop';
import Buttons from '../components/StrongLinkButton';

const TagsPage = (props) => {
  const { group } = props.data.allMarkdownRemark;

  const seo = {
    description: `블로그 전체 태그 리스트`,
    path: `/tags`,
  };

  return (
    <Layout title={`Tags`} pageSEO={seo}>
      <Top title={`All Tags`} bg={`filter`} />
      <div className="container all">
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
