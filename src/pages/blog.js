import React, { useState } from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';

import Layout from '../layouts/index';
import Top from '../components/PageTop';
import CategoryButton from '../components/ActiveLinkButton';
import Search from '../components/Search';
import PostList from '../components/BasicList';
import pageText from '../../contents/data/pageText';

const BlogPage = (props) => {
  const { posts, categories } = props.data;
  const [filtered, setFiltered] = useState(posts.edges);
  const countTotal = posts.edges.length;
  const countPosts = filtered.length;

  const categoryList = categories.group.map((category, i) => {
    const kebabSlug = _.kebabCase(category.fieldValue);

    return (
      <li key={i}>
        <CategoryButton
          name={category.fieldValue}
          path={`/categories/${kebabSlug}`}
          type={`button`}
          classname={`li-category`}
        />
      </li>
    );
  });

  const searchPost = (keywords) => {
    const filteredPost = posts.edges.filter((post) =>
      post.node.frontmatter.title.toLowerCase().includes(keywords.toLowerCase())
    );
    setFiltered(filteredPost);
  };

  const handleChange = (event) => {
    searchPost(event.target.value);
  };

  const seo = {
    description: pageText.blog,
    path: `/blog`,
  };

  return (
    <Layout title={`Blog`} pageSEO={seo}>
      <Top title={`Blog`} bg={`blog`} />
      <section className="container page-middle">
        <ul className="category-list">{categoryList}</ul>
        <div className="wrap">
          <div className="count">
            {countPosts} / {countTotal}
          </div>
          <Search
            handleChange={handleChange}
            type={`wide`}
            placeholder={`검색어를 입력하세요.`}
          />
        </div>
      </section>
      <section>
        <div className="container-wide page-body">
          <PostList postEdges={filtered} />
        </div>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { nav: { eq: "blog" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            nav
            tags
            category
            thumbnail {
              childImageSharp {
                fixed(width: 45, height: 45) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }

    categories: allMarkdownRemark {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`;

export default BlogPage;
