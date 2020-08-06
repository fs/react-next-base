import React from 'react';
import { Router } from 'routes';

import { SIGN_IN_EVENT, SIGN_OUT_EVENT } from 'config/globalEvents.json';

const WithAuthSyncEvents = Page =>
  class WithAuthSync extends React.Component {
    static async getInitialProps(context) {
      return Page.getInitialProps ? await Page.getInitialProps(context) : {};
    }

    constructor(props) {
      super(props);
      this.syncAuthHandler = this.syncAuth.bind(this);
    }

    componentDidMount() {
      // listening local storage events
      window.addEventListener('storage', this.syncAuthHandler);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncAuthHandler);
    }

    syncAuth(event) {
      // reload page on SIGN_IN_EVENT or SIGN_OUT_EVENT
      switch (event.key) {
        case SIGN_OUT_EVENT:
        case SIGN_IN_EVENT:
          Router.reload();
          break;
      }
    }

    render() {
      return <Page {...this.props} />;
    }
  };

export default WithAuthSyncEvents;
