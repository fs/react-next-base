import React from 'react';
import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';

import { createConsoleLink, createAuthHeaderLink, createUpdateTokenLink } from 'lib/apollo/links';
import { getAccessToken, setAccessToken } from 'lib/auth/tokens';

import { PORT, GRAPHQL_APP_URL } from 'config/vars';

const GRAPHQL_URI = typeof window === 'undefined' ? `http://127.0.0.1:${PORT}${GRAPHQL_APP_URL}` : GRAPHQL_APP_URL;

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
function createApolloClient(initialState = {}, ctx) {
  const fetchOptions = {};

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      fetchOptions.agent = new (require('https-proxy-agent'))(process.env.https_proxy);
    }
  }

  const consoleLink = createConsoleLink();

  const authHeaderLink = createAuthHeaderLink({
    // passing a function to get accessToken value from memory
    getAccessToken: () => getAccessToken().accessToken,
    cookie: ctx ? ctx.req.headers.cookie : undefined,
  });

  const updateTokenLink = createUpdateTokenLink({
    // passing a function to set accessToken to memory
    setAccessToken: token => setAccessToken(token),
  });

  // create an HttpLink
  const httpLink = new HttpLink({
    uri: GRAPHQL_URI, // Server URL (must be absolute)
    credentials: 'same-origin',
    fetch,
    fetchOptions,
  });

  // Combined Link
  const link = ApolloLink.from([consoleLink, authHeaderLink, updateTokenLink, httpLink]);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: link,
    cache: new InMemoryCache().restore(initialState),
  });
}

let apolloClient = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(...args) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(...args);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(...args);
  }

  return apolloClient;
}

const initOnContext = ctx => {
  const inAppContext = Boolean(ctx.ctx);

  // Initialize ApolloClient if not already done
  const apolloClient = ctx.apolloClient || initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;

  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
};

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApolloClient(PageComponent, { ssr = true } = {}) {
  const WithApolloClient = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent client={client} {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    // Find correct display name
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    // Warn if old way of installing apollo is used
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    // Set correct display name for devtools
    WithApolloClient.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApolloClient.getInitialProps = async context => {
      const inAppContext = Boolean(context.ctx);

      const { apolloClient } = initOnContext(context);

      const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(context) : {};

      // Only on the server
      if (typeof window === 'undefined') {
        const { AppTree } = context;

        // When redirecting, the response is finished.
        // No point in continuing to render
        if (context.res && context.res.finished) {
          return {};
        }

        if (ssr && AppTree) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            const props = inAppContext ? { ...pageProps, apolloClient } : { pageProps: { ...pageProps, apolloClient } };

            await getDataFromTree(<AppTree {...props} />);
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      return {
        ...pageProps,
        apolloState: apolloClient.cache.extract(),
        apolloClient: context.apolloClient,
      };
    };
  }

  return WithApolloClient;
}
