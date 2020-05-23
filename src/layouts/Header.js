import React, { useState, useContext } from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../store/ThemeContext';

import Nav from '../components/ActiveLinkButton';
import logo from '../images/logo.png';
import Switch from '../components/Switch';

const Header = (props) => {
  const { navArray, title } = props;
  const [scrolled, setScrolled] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);

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
        <div className="wrap">
          <nav>
            <ul className="nav-list">{navList}</ul>
          </nav>
          <Switch
            isTrue={state.darkMode}
            handleToggle={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            type={'theme'}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
