import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      localStorage.setItem('darkMode', !state.darkMode);
      return {
        darkMode: !state.darkMode,
      };

    default: {
      return state;
    }
  }
};

const GlobalState = () => {
  let window = () => {
    if (typeof window !== 'undefined') {
      return {
        darkMode: localStorage.getItem('darkMode')
          ? JSON.parse(localStorage.getItem('darkMode'))
          : false,
      };
    } else {
      return { darkMode: false };
    }
  };
  const [state, dispatch] = useReducer(reducer, window);

  return { state, dispatch };
};

export default GlobalState;
