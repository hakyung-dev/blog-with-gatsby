import React, { createRef, useEffect, useContext } from 'react';
import ThemeContext from '../store/ThemeContext';
import config from '../../contents/config';

const Comments = () => {
  const { state } = useContext(ThemeContext);
  const commentRef = createRef();
  const currentTheme = state.darkMode ? 'photon-dark' : 'github-light';

  useEffect(() => {
    const isComment = commentRef.current.firstChild;
    if (isComment) {
      commentRef.current.removeChild(isComment);
    }

    const utterances = document.createElement('script');

    const utterancesConfig = {
      src: 'https://utteranc.es/client.js',
      repo: config.commentRepo,
      theme: currentTheme,
      'issue-term': 'pathname',
      async: true,
      crossorigin: 'anonymous',
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    commentRef.current.appendChild(utterances);
  }, [currentTheme, commentRef]);

  return <div className="comments" ref={commentRef}></div>;
};

export default Comments;
