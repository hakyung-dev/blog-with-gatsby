import React, { useState } from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import { FaSearch } from 'react-icons/fa';

import Layout from '../layouts/index';
import CategoryButton from '../components/ActiveLinkButton';
import PostList from '../components/BasicList';

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
          path={`categories/${kebabSlug}`}
          type={`li-category`}
          name={category.fieldValue}
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

  return (
    <Layout>
      <div className="section-blog-header">
        <div className="content blog-header">
          <h1 className="title">Blog</h1>
          <div className="container">
            <ul className="category-list">{categoryList}</ul>
          </div>
          <div className="container">
            <div className="count">
              {countPosts} / {countTotal}
            </div>
            <div className="search">
              <div className="search-icon">
                <FaSearch />
              </div>
              <input
                className="search-box"
                type="text"
                placeholder="검색어를 입력하세요."
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="content blog-list">
          <PostList postEdges={filtered} />
        </div>
      </div>
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
            tags
            icon
            category
            thumbnail {
              childImageSharp {
                fixed(width: 40, height: 40) {
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