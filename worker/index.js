import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('./util');

const firebaseConfig = util().firebaseConfig;
const vapidToken = util().vapidToken;

const firebaseCloudMessaging = {
  // checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcmToken');
  },
  // initializing firebase app
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
            vapidKey: vapidToken,
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
      }
    }
    return null;
  },
};

export { firebaseCloudMessaging };
