import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { withApolloClient } from 'lib/withApolloClient';
import GlobalStyles from 'public/styles/globalStyles';
import theme from 'public/styles/theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>React Next Base</title>
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

export default withApolloClient(MyApp);
