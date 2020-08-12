import React, { useState } from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import { FaSearch } from 'react-icons/fa';

import Layout from '../layouts/index';
import Head from '../components/Head';
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

  return (
    <Layout>
      <Head title={`Blog`} />
      <section className="section-blog-header">
        <div className="container blog-header">
          <h1 className="title">Blog</h1>
          <div className="wrap">
            <ul className="category-list">{categoryList}</ul>
          </div>
          <div className="wrap">
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
      </section>
      <section>
        <div className="container-wide blog-list">
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
