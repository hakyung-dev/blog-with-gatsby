import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const SimpleList = (props) => {
  const { postEdges } = props;

  const simplePosts = postEdges.map((edge, i) => {
    const { fields, frontmatter } = edge.node;

    const tagList = frontmatter.tags.map((tag, i) => {
      return (
        <li className="li-tag" key={i}>
          {tag}
        </li>
      );
    });

    const img = frontmatter.thumbnail ? (
      <Img
        className="thumbnail"
        fixed={frontmatter.thumbnail.childImageSharp.fixed}
        alt="thumbnail"
      />
    ) : (
      <span className="icon">{frontmatter.icon}</span>
    );

    return (
      <li className="simple" key={i}>
        <Link className="item" to={`/blog/${fields.slug}`}>
          <div className="wrap">
            <div className="img">{img}</div>
            <div className="title">{frontmatter.title}</div>
          </div>
          <ul className="tags">{tagList}</ul>
        </Link>
      </li>
    );
  });

  return <ol className="post-list">{simplePosts}</ol>;
};

export default SimpleList;
