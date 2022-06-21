import { withApolloClient } from 'lib/withApolloClient';
import withAuth from 'lib/auth/withAuth';
import withRedirectIfLoggedIn from 'lib/auth/withRedirectIfLoggedIn';

import { NotifierProvider } from 'contexts/NotifierContext';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import Notifier from 'components/shared/atoms/Notifier';

import RecoveryPasswordForm from './components/RecoveryPasswordForm';

import { PageContentWrapper } from './styled';

const RecoveryPasswordPage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate testId="recovery-password-page">
        <PageContentWrapper>
          <RecoveryPasswordForm />
        </PageContentWrapper>
        <Notifier />
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(withAuth(withRedirectIfLoggedIn(RecoveryPasswordPage)));
