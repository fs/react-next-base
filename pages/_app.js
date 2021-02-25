import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from 'public/styles/globalStyles';
import theme from 'public/styles/theme';
import metaTags from 'config/metaTags';
import linkTags from 'config/linkTags';

// Custom styles
import 'public/styles/custom.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>React Next Base</title>
          {metaTags.map((tag, index) => (
            <meta {...tag} key={`${index}-${tag.content}`} />
          ))}
          {linkTags.map((tag, index) => (
            <link {...tag} key={`${index}-${tag.href}`} />
          ))}
        </Head>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyles />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
