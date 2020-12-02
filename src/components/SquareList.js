import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const SquareList = (props) => {
  const { postEdges } = props;

  const simplePosts = postEdges.map((edge, i) => {
    const { fields, frontmatter } = edge.node;

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
      <li className="square" key={i}>
        <Link className="item" to={`/blog/${fields.slug}`}>
          <div className="wrap">
            <div className="img">{img}</div>
            <div className="title">{frontmatter.title}</div>
          </div>
        </Link>
      </li>
    );
  });

  return <ol className="post-list-row">{simplePosts}</ol>;
};

export default SquareList;
