import React from 'react';
import { Router } from '../../routes';
import { LOGIN } from '../../config/routes';
// import { fetchUserData } from '../../store/user/actions';
// import { getComponentInitialProps } from '../../utils/common';

// import { useRefreshToken } from '../../utils/token';
import { getAccessToken, setAccessToken } from './tokens';

// import config from '../../config';

// const { accessTokenCheckInterval, accessTokenMinimalLifeTime } = config;
// const { pattern: location } = LOGIN;

export const getComponentInitialProps = async (component, context) =>
  component.getInitialProps ? await component.getInitialProps(context) : {};

export default Page =>
  class WithAuthSecurity extends React.Component {
    static async getInitialProps(context) {
      const { req, res } = context;

      // const { user } = getState();
      const { accessToken } = getAccessToken();

      console.warn('accessToken', accessToken);
      console.warn('withAuthSecurity', Object.keys(context));

      return await getComponentInitialProps(Page, context);

      // try {
      //   if (!accessToken) {
      //     if (isServer) {
      //       const payload = await useRefreshToken(req, res);

      //       setAccessToken(payload);
      //     } else {
      //       await refresh();
      //     }
      //   }

      //   if (!user.id) await dispatch(fetchUserData(apiService));

      //   return await getComponentInitialProps(Page, context);
      // } catch (error) {
      //   if (isServer) {
      //     res.writeHead(302, { location });
      //     res.end();
      //   } else {
      //     Router.pushRoute(location);
      //   }
      // }
    }

    constructor(props) {
      super(props);
      // this.timer = null;
      // this.startProcess = this.process.bind(this);
    }

    // componentDidMount() {
    //   this.startProcess();
    // }

    // componentWillUnmount() {
    //   clearTimeout(this.timer);
    // }

    // async tick() {
    //   const { accessToken, expires } = getAccessToken();

    //   console.warn(accessToken);

    //   const shouldRefresh = expires - Date.now() <= accessTokenMinimalLifeTime;

    //   if (!accessToken || shouldRefresh) {
    //     await refresh();
    //   }
    // }

    // async process() {
    //   await this.tick();
    //   this.timer = setTimeout(this.startProcess, accessTokenCheckInterval);
    // }

    render() {
      return <Page {...this.props} />;
    }
  };
