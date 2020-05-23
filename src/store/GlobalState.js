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
  const [state, dispatch] = useReducer(reducer, {
    darkMode: localStorage.getItem('darkMode')
      ? JSON.parse(localStorage.getItem('darkMode'))
      : false,
  });

  return { state, dispatch };
};

export default GlobalState;
