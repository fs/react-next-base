import React from 'react';
import { Router } from 'routes';
import { LOGIN } from 'config/routes';
import { getAccessToken } from './tokens';

const { pattern: location } = LOGIN;

const WithAuthSecurity = Page =>
  class WithAuthSecurity extends React.Component {
    static async getInitialProps(context) {
      const { req, res } = context;
      const { accessToken } = getAccessToken();

      if (accessToken) return Page.getInitialProps ? await Page.getInitialProps(context) : {};

      return !!req && !!res ? res.redirect(302, location) : Router.pushRoute(location);
    }

    render() {
      return <Page {...this.props} />;
    }
  };

export default WithAuthSecurity;
