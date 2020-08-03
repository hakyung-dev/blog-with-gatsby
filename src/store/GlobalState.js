import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MODE':
      localStorage.setItem('isDarkMode', !state.isDarkMode);
      return {
        isDarkMode: !state.isDarkMode,
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
        isDarkMode: localStorage.getItem('isDarkMode')
          ? JSON.parse(localStorage.getItem('isDarkMode'))
          : false,
      };
    } else {
      return { isDarkMode: false };
    }
  };
  const [state, dispatch] = useReducer(reducer, isWindow());

  return { state, dispatch };
};

export default GlobalState;
