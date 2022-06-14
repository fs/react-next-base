import Router from 'next/router';

import { withApolloClient } from 'lib/withApolloClient';
import withAuth from 'lib/auth/withAuth';
import { PageContext } from 'types/pageContextInterfaces';

import { HOME } from 'config/routes';
import { NotifierProvider } from 'contexts/NotifierContext';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';

import SignUpForm from './components/SignUpForm';

import { PageContentWrapper } from './styled';

const SignUpPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate testId="signup-page">
        <PageContentWrapper>
          <SignUpForm />
        </PageContentWrapper>
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

SignUpPage.getInitialProps = ({ res, accessTokenManager }: PageContext) => {
  if (accessTokenManager?.accessToken) {
    if (res) {
      res.writeHead(302, { Location: HOME });
      res.end();
    } else {
      Router.push(HOME);
    }
  }
  return {};
};

export default withApolloClient(withAuth(SignUpPage));
