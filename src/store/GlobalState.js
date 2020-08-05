import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MODE':
      const toggled = window.__theme === 'dark' ? 'light' : 'dark';
      window.__setPreferredTheme(toggled);
      return {
        theme: toggled,
      };

    default: {
      return state;
    }
  }
};

const GlobalState = () => {
  let isWindow = () => {
    if (typeof window !== 'undefined') {
      return {
        theme: window.__theme,
      };
    } else {
      return { theme: 'light' };
    }
  };
  const [state, dispatch] = useReducer(reducer, isWindow());

  return { state, dispatch };
};

export default GlobalState;
