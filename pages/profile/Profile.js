import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import CurrentUser from 'graphql/queries/currentUser.graphql';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useSignOut } from 'lib/apollo/hooks/actions';

import DefaultTemplate from 'components/templates/DefaultTemplate';
import ProfileForm from 'components/organisms/ProfileForm';

const StyledProfileActions = styled.div`
  margin: 0 0 2rem;
`;

const Profile = () => {
  const { loading, error, data } = useQuery(CurrentUser);
  const [signOut] = useSignOut();

  const profile = data?.me ?? {};
  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;
  const LogOutFromAllDevices = () => signOut({ everywhere: true });

  return (
    <DefaultTemplate>
      {loading && <h3 data-testid="test-profile-loading">Loading...</h3>}
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!loading && !error && (
        <div data-testid="test-profile-page">
          <StyledProfileActions>
            <button type="button" onClick={LogOutFromAllDevices}>
              Log out from all devices
            </button>
          </StyledProfileActions>

          <ProfileForm profile={profile} />
        </div>
      )}
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Profile)));
