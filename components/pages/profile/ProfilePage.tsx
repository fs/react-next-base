import ErrorMessage from 'components/shared/atoms/ErrorMessage';
import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useCurrentUser } from 'lib/apollo/hooks/state/currentUser';
import parseApolloError from 'lib/apollo/parseApolloError';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import ProfileForm from 'components/shared/organisms/ProfileForm';
import { NotifierProvider } from 'contexts/NotifierContext';
import Notifier from 'components/shared/atoms/Notifier';

import User from 'domain/User';

const Profile = () => {
  const { loading, error, user } = useCurrentUser();

  const profile = (user as User) || {};
  const { message: errorMessage } = parseApolloError(error);

  return (
    <NotifierProvider>
      {loading && <h3 data-testid="profile-loading">Loading...</h3>}

      {errorMessage && <ErrorMessage testId="profile-error">{errorMessage}</ErrorMessage>}

      {!loading && !error && (
        <DefaultTemplate data-testid="profile-page">
          <ProfileForm profile={profile} />
          <Notifier />
        </DefaultTemplate>
      )}
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Profile)));
