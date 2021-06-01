import React from 'react';
import { Router } from 'routes';
import { LOGIN } from 'config/routes';

const { pattern: location } = LOGIN;

const WithAuthSecurity = (Page) =>
  class WithAuthSecurityClass extends React.Component {
    static async getInitialProps(context) {
      const { req, res, accessTokenManager } = context;
      const { accessToken } = accessTokenManager.get();

      if (accessToken) return Page.getInitialProps ? Page.getInitialProps(context) : {};

      return !!req && !!res ? res.redirect(302, location) : Router.pushRoute(location);
    }

    render() {
      return <Page {...this.props} />;
    }
  };

export default WithAuthSecurity;
