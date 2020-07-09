import React from 'react';
import Cookie from 'universal-cookie';

import { getAccessToken, setRefreshToken } from './tokens';

import updateToken from 'graphql/mutations/updateToken.graphql';

import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_CHECK_INTERVAL, ACCESS_TOKEN_MINIMAL_LIFE_TIME } from 'config/jwt.json';

const updateTokensMutation = apolloClient =>
  apolloClient.mutate({
    mutation: updateToken,
    fetchPolicy: 'no-cache',
  });

const updateTokens = async ({ req, res, apolloClient }) => {
  const {
    data: {
      updateToken: { refreshToken },
    },
  } = await updateTokensMutation(apolloClient);

  if (!!req && !!res) setRefreshToken({ refreshToken, res });
};

export default Page =>
  class WithAuth extends React.Component {
    static async getInitialProps(context) {
      const { req, res, apolloClient } = context;

      if (!!req && !!res) {
        const cookie = new Cookie(req.headers.cookie);
        const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

        if (refreshToken) await updateTokens({ req, res, apolloClient });
      }

      const { accessToken } = getAccessToken();

      const pageProps = Page.getInitialProps ? await Page.getInitialProps(context) : {};

      return { ...pageProps, isAuthenticated: !!accessToken };
    }

    constructor(props) {
      super(props);
      this.timer = null;
      this.startProcess = this.process.bind(this);
    }

    componentDidMount() {
      this.startProcess();
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    async tick() {
      const { isAuthenticated, apolloClient } = this.props;

      console.warn('isAuthenticated', isAuthenticated);

      if (!isAuthenticated) return;

      const { accessToken, expires } = getAccessToken();

      if (!accessToken || !expires || expires - Date.now() <= ACCESS_TOKEN_MINIMAL_LIFE_TIME) {
        try {
          await updateTokensMutation(apolloClient);
        } catch (error) {
          console.error(error);
        }
      }
    }

    async process() {
      await this.tick();
      this.timer = setTimeout(this.startProcess, ACCESS_TOKEN_CHECK_INTERVAL);
    }

    render() {
      return <Page {...this.props} />;
    }
  };
