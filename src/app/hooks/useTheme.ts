import { useEffect, useReducer } from 'react';

// useReducer is a hook that is used for state management in React. It is an alternative to useState but is preferable when the state logic is complex and involves multiple sub-values or when the next state depends on the previous one.

type ThemeState = {
  theme: string;
};

type ThemeAction = {
  type: 'SET_THEME';
  payload: string; //pass to the reducer
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => { 
  //reducer function to handle the state. it use for complex state logic
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const useTheme = () => {
  // dispatch will get the action and trigger the state change in the reducer
  const [state, dispatch] = useReducer(themeReducer, { theme: 'light' });
  useEffect(() => { // init
    const savedTheme = localStorage.getItem('theme') || 'light'; // take local storage theme or default light
    dispatch({ type: 'SET_THEME', payload: savedTheme }); // state the theme
  }, []);

  useEffect(() => { // update theme via dispatch action state
    if (state.theme) {
      document.documentElement.setAttribute('data-theme', state.theme);
      const metaThemeColor = document.querySelector('meta[name=theme-color]');
      const metaAppleStatusBarStyle = document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]');

      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', state.theme === 'light' ? '#ffffff' : '#000000');
      }

      if (metaAppleStatusBarStyle) {
        metaAppleStatusBarStyle.setAttribute('content', state.theme === 'light' ? 'default' : 'black-translucent');
      }
      localStorage.setItem('theme', state.theme);
    }
  }, [state.theme]);

  const setTheme = (theme: string) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    // dispatch action to update the state with the new theme
  };

  return { theme: state.theme, setTheme };
};

export default useTheme;