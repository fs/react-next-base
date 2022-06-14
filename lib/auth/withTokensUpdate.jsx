import { Component } from 'react';
import Cookie from 'universal-cookie';

import { updateTokenMutation, getData } from 'api/mutations/update/useUpdateTokenMutation';
import { readHasCurrentUserCache } from 'api/cache/read/useReadHasCurrentUserCache';

import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_CHECK_INTERVAL, ACCESS_TOKEN_MINIMAL_LIFE_TIME } from 'config/jwt.json';

import { setRefreshToken } from './tokens';

const updateTokensServerSide = async ({ req, res, apolloClient }) => {
  try {
    const fetchResult = await updateTokenMutation(apolloClient, true);
    const { refreshToken } = getData(fetchResult.data);

    if (!res.writableEnded) setRefreshToken({ refreshToken, req, res });
  } catch (error) {
    console.error(error);
  }
};

const hasUserData = (apolloClient) => {
  try {
    const data = readHasCurrentUserCache(apolloClient);

    return !!data?.me;
  } catch (error) {
    return false;
  }
};

const withTokensUpdate = (Page) =>
  class WithTokensUpdateClass extends Component {
    static async getInitialProps(context) {
      const { req, res, apolloClient } = context;

      if (!!req && !!res) {
        const cookie = new Cookie(req.headers.cookie);
        const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

        if (refreshToken) await updateTokensServerSide({ req, res, apolloClient });
      }

      return Page.getInitialProps ? Page.getInitialProps(context) : {};
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
      const { apolloClient, accessTokenManager } = this.props;
      const isAuthenticated = hasUserData(apolloClient);

      if (!isAuthenticated) return;

      const { accessToken, expires } = accessTokenManager.get();

      if (!accessToken || !expires || expires - Date.now() <= ACCESS_TOKEN_MINIMAL_LIFE_TIME) {
        try {
          await updateTokenMutation(apolloClient);
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

export default withTokensUpdate;
