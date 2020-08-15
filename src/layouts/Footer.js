import React from 'react';
import { Link } from 'gatsby';

import gmail from '../styles/images/gmail.svg';
import github from '../styles/images/github.svg';
import Copy from '../components/Copy';
import config from '../../contents/config';

const Footer = (props) => {
  const { author } = props;

  return (
    <footer className="footer">
      <section className="set front">
        <div className="container center">
          <div>Copyright 2020. {author} all rights reserved.</div>
        </div>
      </section>
      <section className="set pusher" />
      <section className="set behind">
        <div className="container site-map">
          <div className="list">
            <Link to={`/`} className="index">
              Home
            </Link>
          </div>
          <div className="list">
            <Link to={`/blog`} className="index">
              Blog
            </Link>
            <div className="links">
              <Link to={`/categories`}>All Categories</Link>
              <Link to={`/tags`}>All Tags</Link>
            </div>
          </div>
          <div className="list">
            <div className="index">Other</div>
            <div className="links">
              <Link to={`/bookmarks`}>Bookmarks</Link>
            </div>
          </div>
        </div>
        <div className="icons">
          <Copy imgSrc={gmail} text={config.email} name={`메일주소`} />
          <a href="https://github.com/hakyung-dev" className="icon-wrap">
            <img src={github} alt="github" className="icon" />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
