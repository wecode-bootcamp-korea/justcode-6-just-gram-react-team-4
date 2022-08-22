import { Route, Routes } from 'react-router-dom';
import useTheme from './hooks/useTheme';
import Login from './pages/Sign/Login';
import Main from './pages/Main';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Sign from './pages/Sign';

const App = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path='/*' element={<Sign toggleTheme={toggleTheme} />} />
          <Route path='/main/*' element={<Main toggleTheme={toggleTheme} />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
