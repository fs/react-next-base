import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';
// 'use strict';

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//

// self.__WB_DISABLE_DEV_LOGS = true;
// workbox.setConfig({debug: false})

// const util = require('./util');

// util();

// listen to message event from window
// self.addEventListener('message', event => {
//   HOW TO TEST THIS?
//   Run this in your browser console:
//       window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
//   OR use next-pwa injected workbox object
//       window.workbox.messageSW({command: 'log', message: 'hello world'})
//   console.log(event.data);
// });

const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token');
  },
  //initializing firebase app
  init: async function() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDFh7vqPeYpn910SH57WeofWnMXDc8WJGE',
        authDomain: 'fir-cloud-messaging-5543f.firebaseapp.com',
        databaseURL: 'https://fir-cloud-messaging-5543f.firebaseio.com',
        projectId: 'fir-cloud-messaging-5543f',
        storageBucket: 'fir-cloud-messaging-5543f.appspot.com',
        messagingSenderId: '354347614212',
        appId: '1:354347614212:web:7b474a30c18aa6d2b47551',
        measurementId: 'G-L63HMWWX6W',
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await this.tokenInlocalforage();
        //if FCM token is already there just return the token
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }
        //requesting notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          //getting token from FCM
          const fcm_token = await messaging.getToken({
            vapidKey: 'BHKTEUH2duqytR3M_MViWykEoTgBb6MtrhkfsrzGkQqVjBJ0ape8ym4zIbx7JluWLfqABa_lykF5cAKcBu_7MGg',
          });
          if (fcm_token) {
            //setting FCM token in indexed db using localforage
            localforage.setItem('fcm_token', fcm_token);
            console.log('fcm token', fcm_token);
            //return the FCM token after saving it
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
