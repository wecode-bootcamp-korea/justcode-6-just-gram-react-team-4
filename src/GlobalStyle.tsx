import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const GlobalStyle = createGlobalStyle`
  ${reset}

  *:not(svg):not(path) {
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Noto Sans KR', sans-serif; 
  }

  body {
    background-color: ${({ theme }) => theme.colors.body};
  }
  
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }
  
  input:focus {
    outline: none;
  }
`;

export default GlobalStyle;
