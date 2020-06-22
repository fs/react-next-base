import React from 'react';
import { Router } from '../../routes';
import { LOGIN } from '../../config/routes';
import { getAccessToken, setRefreshToken } from './tokens';

import updateToken from 'graphql/mutations/updateToken.graphql';
import { ACCESS_TOKEN_CHECK_INTERVAL, ACCESS_TOKEN_MINIMAL_LIFE_TIME } from 'config/jwt.json';

const { pattern: location } = LOGIN;

const updateTokenMutation = apolloClient =>
  apolloClient.mutate({
    mutation: updateToken,
    fetchPolicy: 'no-cache',
  });

export default Page =>
  class WithAuthSecurity extends React.Component {
    static async getInitialProps(context) {
      const { req, res, apolloClient } = context;

      const isServer = !!req && !!res;
      const { accessToken } = getAccessToken();

      // TODO: refactoring
      if (!accessToken && apolloClient) {
        try {
          const data = await updateTokenMutation(apolloClient);

          const {
            data: {
              updateToken: { refreshToken },
            },
            errors,
          } = data;

          if (!refreshToken) throw new Error(errors[0].message);

          if (isServer) {
            setRefreshToken({ refreshToken, res });
          }
        } catch (error) {
          console.error('error', error);

          if (isServer) {
            res.writeHead(302, { location });
            res.end();
          } else {
            Router.pushRoute(location);
          }
        }
      }

      return Page.getInitialProps ? await Page.getInitialProps(context) : {};
    }

    constructor(props) {
      super(props);
      this.timer = null;
      this.startProcess = this.process.bind(this);
      this.apolloClient = props.apolloClient;
    }

    componentDidMount() {
      this.startProcess();
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    async tick() {
      const { accessToken, expires } = getAccessToken();

      const shouldRefresh = expires - Date.now() <= ACCESS_TOKEN_MINIMAL_LIFE_TIME;

      if (!accessToken || shouldRefresh) {
        await updateTokenMutation(this.apolloClient);
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
