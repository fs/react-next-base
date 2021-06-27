/* eslint-disable no-undef */

// scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
importScripts('env.js');

// initialize the Firebase app in the service worker by passing the generated config
firebase.initializeApp(firebaseConfig);

// retrieve firebase messaging
const messaging = firebase.messaging();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
messaging.onBackgroundMessage(function (payload) {
  // here we can handle notification data
});
