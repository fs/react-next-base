import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

// self.__WB_DISABLE_DEV_LOGS = true;
// const util = require('./util');
// util();

const firebaseCloudMessaging = {
  // checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token');
  },
  // initializing firebase app
  async init() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDzObPF0TEJ4G80DFUnQzRDwy8oNQiTH4k',
        authDomain: 'react-next-base.firebaseapp.com',
        projectId: 'react-next-base',
        storageBucket: 'react-next-base.appspot.com',
        messagingSenderId: '641828025180',
        appId: '1:641828025180:web:f35fafa05226e1c29a8799',
        measurementId: 'G-3FGKMWEJNJ',
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await this.tokenInlocalforage();
        // if FCM token is already there just return the token
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }
        // requesting notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          // getting token from FCM
          const fcm_token = await messaging.getToken({
            vapidKey: 'BN-wMGpdhUIylZonRIx-GGjwuFCPlp_BK9cxb8Cu8pO47FpBrZbKNkRMJIU9vdbUqh3O2XV80QkrZv8f93_ivu4',
          });
          if (fcm_token) {
            // setting FCM token in indexed db using localforage
            localforage.setItem('fcm_token', fcm_token);
            // return the FCM token after saving it
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};

export { firebaseCloudMessaging };
