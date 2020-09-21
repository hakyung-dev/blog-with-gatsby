import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import {
  FaThermometerQuarter,
  FaThermometerHalf,
  FaThermometerFull,
} from 'react-icons/fa';

import TagButton from './ActiveLinkButton';

const HideList = (props) => {
  const { postEdges, show } = props;

  const posts = postEdges.map((edge, i) => {
    const { fields, frontmatter } = edge.node;

    const tagList = frontmatter.tags.map((tag, i) => {
      const kebabSlug = _.kebabCase(tag);
      return (
        <li className="hide-item" key={i}>
          <TagButton
            name={tag}
            path={`/tags/${kebabSlug}`}
            type={`button`}
            classname={`li-tag`}
          />
        </li>
      );
    });

    const icon =
      frontmatter.level === 'Easy' ? (
        <div className="level blue">
          <FaThermometerQuarter />
        </div>
      ) : frontmatter.level === 'Medium' ? (
        <div className="level yellow">
          <FaThermometerHalf />
        </div>
      ) : (
        <div className="level red">
          <FaThermometerFull />
        </div>
      );

    return (
      <li className="post-item hide" key={i}>
        <Link to={`/algorithm/${fields.slug}`}>
          <div className="item-info">
            {icon}
            <div className="wrap">
              <h2 className="title">{frontmatter.title}</h2>
              <div className="small">{frontmatter.from}</div>
            </div>
          </div>
        </Link>
        <ul className="item-list hide-items">{show ? tagList : <></>}</ul>
      </li>
    );
  });

  return <ol className="post-list">{posts}</ol>;
};

export default HideList;
