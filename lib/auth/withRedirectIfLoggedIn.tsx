import { NextPage } from 'next';
import { Component } from 'react';
import Router from 'next/router';
import { PageContext } from 'types/pageContextInterfaces';
import { HOME } from 'config/routes';

const withRedirectIfLoggedIn = (Page: NextPage) => {
  class WithRedirectIfLoggedIn extends Component {
    static async getInitialProps(context: PageContext) {
      const { res, accessTokenManager } = context;

      if (accessTokenManager?.accessToken) {
        if (res) {
          res.writeHead(302, { Location: HOME });
          res.end();
        } else {
          await Router.push(HOME);
        }
      }

      let componentProps = {};
      if (Page.getInitialProps) {
        componentProps = Page.getInitialProps(context);
      }

      return componentProps;
    }

    render() {
      return <Page {...this.props} />;
    }
  }

  return WithRedirectIfLoggedIn;
};

export default withRedirectIfLoggedIn;
