import { useState } from 'react';
import { DefaultTheme } from 'styled-components';
import themes from '../theme';

export type IThemes = keyof typeof themes;

const useTheme = () => {
  const [theme, setTheme] = useState<DefaultTheme>(themes[(localStorage.getItem('theme') as IThemes) || 'light']);

  const toggleTheme = () => {
    const themeName = localStorage.getItem('theme') as IThemes;
    themeName === 'light' ? setTheme(themes.dark) : setTheme(themes.light);
    localStorage.setItem('theme', themeName === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

export default useTheme;
