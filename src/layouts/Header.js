import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../store/ThemeContext';

import Nav from '../components/ActiveLinkButton';
import logo from '../styles/images/logoIcon.svg';
import Switch from '../components/Button';

const Header = (props) => {
  const { navArray, title } = props;
  const [scrolled, setScrolled] = useState(false);
  const { state, dispatch } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 30) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 30) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navList = navArray.map((nav, i) => {
    return (
      <li key={i}>
        <Nav
          name={nav.name}
          path={nav.link}
          type={`text`}
          classname={`nav-item`}
        />
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
            handleToggle={() => dispatch({ type: 'TOGGLE_MODE' })}
            type={'switch'}
            isChecked={state.theme === 'light'}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
