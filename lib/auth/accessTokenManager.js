import React from 'react';
import { parseJWT } from './tokens';

class AccessTokenManager {
  constructor() {
    this.delete();
  }

  delete() {
    this.accessToken = null;
    this.expires = null;
  }

  get() {
    const { accessToken, expires } = this;

    return {
      accessToken,
      expires,
    };
  }

  set(token) {
    const { exp } = parseJWT(token);

    this.accessToken = token;
    this.expires = exp * 1000;
  }
}

let accessTokenManager = null;

const initAccessTokenManager = (...args) => {
  // Make sure to create a new manager for every server-side request so access token
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return new AccessTokenManager(...args);
  }

  // Reuse client on the client-side
  if (!accessTokenManager) {
    accessTokenManager = new AccessTokenManager(...args);
  }

  return accessTokenManager;
};

const initOnContext = (ctx) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const accessTokenManager = ctx.accessTokenManager || initAccessTokenManager();

  accessTokenManager.toJSON = () => null;

  // Add accessTokenManager to NextPageContext & NextAppContext.
  // This allows us to consume the accessTokenManager inside our
  // custom `getInitialProps({ accessTokenManager })`.
  ctx.accessTokenManager = accessTokenManager;

  return ctx;
};

export function withAccessTokenManager(PageComponent) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const WithAccessTokenManager = ({ accessTokenManager, ...pageProps }) => {
    const manager = accessTokenManager || initAccessTokenManager();

    return <PageComponent accessTokenManager={manager} {...pageProps} />;
  };

  WithAccessTokenManager.getInitialProps = async (context) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { accessTokenManager } = initOnContext(context);

    // Run wrapped getInitialProps methods
    let pageProps = {};

    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(context);
    }

    return {
      ...pageProps,
      accessTokenManager,
    };
  };

  return WithAccessTokenManager;
}
