import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

// self.__WB_DISABLE_DEV_LOGS = true;
const util = require('./util');

const firebaseConfig = util();

const firebaseCloudMessaging = {
  // checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcmToken');
  },
  // initializing firebase app
  // eslint-disable-next-line consistent-return
  async init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);

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
          const fcmToken = await messaging.getToken({
            vapidKey: 'BN-wMGpdhUIylZonRIx-GGjwuFCPlp_BK9cxb8Cu8pO47FpBrZbKNkRMJIU9vdbUqh3O2XV80QkrZv8f93_ivu4',
          });
          if (fcmToken) {
            // setting FCM token in indexed db using localforage
            localforage.setItem('fcmToken', fcmToken);
            // return the FCM token after saving it
            return fcmToken;
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
