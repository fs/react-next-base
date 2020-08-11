import React from 'react';

import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useCurrentUser } from 'lib/apollo/hooks/state';

import DefaultTemplate from 'components/templates/DefaultTemplate';
import ProfileForm from 'components/organisms/ProfileForm';

const Profile = () => {
  const { loading, error, user } = useCurrentUser();
  const profile = user || {};
  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  return (
    <>
      {loading && <h3 data-testid="test-profile-loading">Loading...</h3>}
      {error && <ErrorMessage data-testid="test-profile-error">{errorMessage}</ErrorMessage>}
      {!loading && !error && (
        <DefaultTemplate data-testid="test-profile-page">
          <ProfileForm profile={profile} />
        </DefaultTemplate>
      )}
    </>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Profile)));
