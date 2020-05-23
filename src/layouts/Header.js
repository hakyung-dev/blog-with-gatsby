import React, { useState } from 'react';
import { Link } from 'gatsby';

import Nav from '../components/ActiveLinkButton';
import logo from '../images/logo.png';

const Header = (props) => {
  const { navArray, title } = props;
  const [scrolled, setScrolled] = useState(false);

  onscroll = () => {
    if (window.scrollY > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const navList = navArray.map((nav, i) => {
    return (
      <li key={i}>
        <Nav name={nav.name} path={nav.link} type={`nav-item`} />
      </li>
    );
  });

  return (
    <header className={scrolled ? 'fix-container scrolled' : 'fix-container'}>
      <div className="header">
        <Link to="/">
          <div className="to-home">
            <img className="logo-image" src={logo} alt="logo" />
            <div className="title">{title}</div>
          </div>
        </Link>
        <nav>
          <ul className="nav-list">{navList}</ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
