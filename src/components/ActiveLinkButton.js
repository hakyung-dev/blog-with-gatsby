import React from 'react';
import { Link } from 'gatsby';

const ActiveLinkButton = (props) => {
  const { name, path, type, classname } = props;

  return (
    <Link
      className={`link ${type} ${classname}`}
      activeClassName={`active-${type}`}
      to={path}
    >
      {name}
    </Link>
  );
};

export default ActiveLinkButton;
