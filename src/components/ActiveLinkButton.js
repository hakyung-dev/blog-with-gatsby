import React from 'react';
import { Link } from 'gatsby';

const ActiveLinkButton = (props) => {
  const { name, path, type } = props;

  return (
    <Link
      className={`link ${type}`}
      activeClassName={`active-${type}`}
      to={path}
    >
      {name}
    </Link>
  );
};

export default ActiveLinkButton;
