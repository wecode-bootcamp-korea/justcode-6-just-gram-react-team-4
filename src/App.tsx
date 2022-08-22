import { Route, Routes } from 'react-router-dom';
import useTheme from './hooks/useTheme';
import Login from './pages/Login';
import Main from './pages/Main';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';

const App = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Login toggleTheme={toggleTheme} />} />
          <Route path='/main' element={<Main toggleTheme={toggleTheme} />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
