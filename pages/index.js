import React, { useEffect } from 'react';
import styled from 'styled-components';

import firebase from 'firebase/app';
import 'firebase/messaging';

import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/templates/DefaultTemplate';
import { NotifierProvider } from 'contexts/NotifierContext';

import { firebaseCloudMessaging } from '../worker/index';
import 'firebase/messaging';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const PageContent = styled.div``;

const HomePage = () => {
  useEffect(() => {
    setToken();
    // this is working
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', event => console.log('event for the service worker', event));
    }
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log('token', token);
          // not working
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  function getMessage() {
    console.log('message functions');
    const messaging = firebase.messaging();
    messaging.onMessage(message => console.log('foreground', message));
  }

  return (
    <NotifierProvider>
      <DefaultTemplate>
        <PageContent data-testid="page-content">
          <Title className="capitalize" data-cy="welcome-page">
            Welcome to React Next Base
          </Title>
        </PageContent>
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(HomePage));
