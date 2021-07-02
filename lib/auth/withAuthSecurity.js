import React from 'react';
import { LOGIN } from 'config/routes';

const WithAuthSecurity = (Page) =>
  class WithAuthSecurityClass extends React.Component {
    static async getInitialProps(context) {
      const { req, res, accessTokenManager } = context;
      const { accessToken } = accessTokenManager.get();

      if (accessToken) return Page.getInitialProps ? Page.getInitialProps(context) : {};

      if (!!req && !!res) {
        res.redirect(302, LOGIN);
      } else {
        window.location.href = LOGIN;
      }
      return {};
    }

    render() {
      return <Page {...this.props} />;
    }
  };

export default WithAuthSecurity;
