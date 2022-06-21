import { withApolloClient } from 'lib/withApolloClient';
import withAuth from 'lib/auth/withAuth';
import withRedirectIfLoggedIn from 'lib/auth/withRedirectIfLoggedIn';

import { NotifierProvider } from 'contexts/NotifierContext';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';

import SignInForm from './components/SignInForm';

import { PageContentWrapper } from './styled';

const SignInPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate testId="signin-page">
        <PageContentWrapper>
          <SignInForm />
        </PageContentWrapper>
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(withAuth(withRedirectIfLoggedIn(SignInPage)));
