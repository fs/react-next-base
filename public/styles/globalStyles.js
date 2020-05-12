import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url('public/fonts/Montserrat-Regular.ttf');
  }

  html,
  body {
    height: 100%;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
