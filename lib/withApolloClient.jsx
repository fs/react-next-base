import Head from 'next/head';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

import { withAccessTokenManager } from 'lib/auth/accessTokenManager';

import { createConsoleLink, createAuthHeaderLink, createUpdateTokenLink } from 'lib/apollo/links';

import { PORT, GRAPHQL_APP_URL } from 'config/vars';

const GRAPHQL_URI = typeof window === 'undefined' ? `http://127.0.0.1:${PORT}${GRAPHQL_APP_URL}` : GRAPHQL_APP_URL;

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [apolloState={}]
 * @param  {Object} config
 */
function createApolloClient(apolloState = {}, ctx) {
  const fetchOptions = {};

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      fetchOptions.agent = new (require('https-proxy-agent'))(process.env.https_proxy);
    }
  }

  const consoleLink = createConsoleLink();

  const authHeaderLink = createAuthHeaderLink({
    // passing a function to get accessToken value from memory
    getAccessToken: () => ctx?.accessTokenManager?.get?.()?.accessToken,
    cookie: ctx?.req?.headers?.cookie,
  });

  const updateTokenLink = createUpdateTokenLink({
    // passing a function to set accessToken to memory
    setAccessToken: (token) => ctx?.accessTokenManager?.set?.(token),
    deleteAccessToken: () => ctx?.accessTokenManager?.delete?.(),
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
    ...(typeof window === 'undefined'
      ? {
          // Disables forceFetch on the server (so queries are only run once)
          ssrMode: true,
        }
      : { ssrForceFetchDelay: 100 }),
    link,
    cache: new InMemoryCache().restore(apolloState),
  });
}

let apolloClientCache = null;

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
  if (!apolloClientCache) {
    apolloClientCache = createApolloClient(...args);
  }

  return apolloClientCache;
}

const initOnContext = (ctx) => {
  const inAppContext = Boolean(ctx.ctx);

  // Initialize ApolloClient if not already done
  const initializedOnContextApolloClient =
    ctx.apolloClient || initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  initializedOnContextApolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = initializedOnContextApolloClient;

  if (inAppContext) {
    ctx.ctx.apolloClient = initializedOnContextApolloClient;
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
function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApolloClient = ({ apolloClient, apolloState, accessTokenManager, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState, { accessTokenManager });

    return (
      <ApolloProvider client={client}>
        <PageComponent apolloClient={client} accessTokenManager={accessTokenManager} {...pageProps} />
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
    WithApolloClient.getInitialProps = async (context) => {
      const inAppContext = Boolean(context.ctx);

      const { apolloClient: initialApolloClient, accessTokenManager } = initOnContext(context);

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(context);
      } else if (inAppContext) {
        // TODO: what it is?
        // eslint-disable-next-line no-undef
        pageProps = await App.getInitialProps(context);
      }

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
            const { getDataFromTree } = await import('@apollo/client/react/ssr');

            const props = inAppContext
              ? { ...pageProps, apolloClient: initialApolloClient, accessTokenManager }
              : { pageProps: { ...pageProps, apolloClient: initialApolloClient, accessTokenManager } };

            await getDataFromTree(<AppTree {...props} />);
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }
        }
      }

      return {
        ...pageProps,
        apolloState: initialApolloClient.cache.extract(),
        apolloClient: initialApolloClient,
      };
    };
  }

  return WithApolloClient;
}

export const withApolloClient = (Page) => withAccessTokenManager(withApollo(Page));
