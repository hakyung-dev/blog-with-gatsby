import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import _ from 'lodash';

import TagButton from './ActiveLinkButton';

const BasicList = (props) => {
  const { postEdges } = props;

  const posts = postEdges.map((edge, i) => {
    const { fields, frontmatter } = edge.node;

    const img = frontmatter.thumbnail ? (
      <Img
        className="thumbnail"
        fixed={frontmatter.thumbnail.childImageSharp.fixed}
      />
    ) : (
      <div className="icon">{frontmatter.icon}</div>
    );

    const tagList = frontmatter.tags.map((tag, i) => {
      const kebabSlug = _.kebabCase(tag);
      return (
        <li key={i}>
          <TagButton
            name={tag}
            path={`/tags/${kebabSlug}`}
            type={`button`}
            classname={`li-tag`}
          />
        </li>
      );
    });

    return (
      <li className="basic" key={i}>
        <Link to={`/blog/${fields.slug}`} className="link-post">
          <div className="info">
            <div className="img">{img}</div>
            <div className="wrap">
              <h2 className="title">{frontmatter.title}</h2>
              <div className="date">{frontmatter.date}</div>
            </div>
          </div>
        </Link>
        <ul className="tag-list">{tagList}</ul>
      </li>
    );
  });

  return <ol>{posts}</ol>;
};

export default BasicList;
