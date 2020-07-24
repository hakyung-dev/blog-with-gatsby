import React from 'react';
import { ThemeProvider } from './src/store/ThemeContext';

require('./src/styles/themes/prismTheme.scss');

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
