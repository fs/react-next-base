import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  html {
    text-size-adjust: 100%;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
  }

  :focus {
    outline: 0;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  a, button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    transition: all .25s ease-in-out 0s;
    outline: none;
    color: ${({ theme }) => theme.colors.link};
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
