import { useEffect } from 'react';
import { firebaseCloudMessaging } from '../worker';

export const useFirebaseMessaging = () => {
  // need to get a token for messaging
  useEffect(() => {
    const tokenTest = firebaseCloudMessaging.init();
    tokenTest.then((payload) => {
      console.log(payload);
      // getting messaging token here
      // maybe send token to the backend, to start messaging
    });
  });
};
