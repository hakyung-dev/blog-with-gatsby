import React from 'react';

const Footer = (props) => {
  const { author } = props;

  return (
    <footer className="footer">
      <p>Copyright 2020. {author} all rights reserved.</p>
    </footer>
  );
};

export default Footer;
