import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { useAppSelector } from './redux/hooks';

const StyledGlobal = createGlobalStyle<{
  theme: string;
}>`
  ${reset}

  *:not(svg):not(path) {
    box-sizing: border-box;
    color: ${({ theme }) => (theme === 'light' ? 'black' : 'white')};
    font-family: 'Noto Sans KR', sans-serif; 
  }

  body {
    background-color: ${({ theme }) => (theme === 'light' ? '#eeeeee' : '#222222')};
  }
  
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input:focus {
    outline: none;
  }
`;

const GlobalStyle = () => {
  const theme = useAppSelector(({ theme }) => theme);
  return <StyledGlobal theme={theme} />;
};

export default GlobalStyle;
