import { Component } from 'react';

import { SIGN_IN_EVENT, SIGN_OUT_EVENT } from 'config/globalEvents.json';

const WithAuthSyncEvents = (Page) =>
  class WithAuthSync extends Component {
    static async getInitialProps(context) {
      return Page.getInitialProps ? Page.getInitialProps(context) : {};
    }

    componentDidMount() {
      // listening local storage events
      window.addEventListener('storage', WithAuthSync.syncAuth);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', WithAuthSync.syncAuth);
    }

    static syncAuth = (event) => {
      // reload page on SIGN_IN_EVENT or SIGN_OUT_EVENT
      if ([SIGN_OUT_EVENT, SIGN_IN_EVENT].includes(event.key)) {
        window.location.reload();
      }
    };

    render() {
      return <Page {...this.props} />;
    }
  };

export default WithAuthSyncEvents;
