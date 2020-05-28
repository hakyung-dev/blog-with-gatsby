import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';

const StrongLinkButton = (props) => {
  const { group, nav } = props;

  const buttons = group.map((button, i) => {
    const kebabSlug = _.kebabCase(button.fieldValue);

    return (
      <li key={i}>
        <Link
          className={`link all-${nav}`}
          activeClassName={`active-all-${nav}`}
          to={`/${nav}/${kebabSlug}`}
        >
          {button.fieldValue} <strong className="strong">{button.totalCount}</strong>
        </Link>
      </li>
    );
  });

  return <ul className="all-button">{buttons}</ul>;
};

export default StrongLinkButton;
