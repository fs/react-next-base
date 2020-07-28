import React from 'react';
import { Router } from 'routes';
import { LOGIN } from 'config/routes';
import { getAccessToken } from './tokens';

const { pattern: location } = LOGIN;

export default Page =>
  class WithAuthSecurity extends React.Component {
    static async getInitialProps(context) {
      const { req, res } = context;
      const { accessToken } = getAccessToken();

      if (accessToken) return Page.getInitialProps ? await Page.getInitialProps(context) : {};

      if (!!req && !!res) {
        res.writeHead(302, { location });
        return res.end();
      } else {
        return Router.pushRoute(location);
      }
    }

    render() {
      return <Page {...this.props} />;
    }
  };
