import React from 'react';
import { graphql } from '@apollo/react-hoc';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';

import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/templates/DefaultTemplate';
import ProfileForm from 'components/organisms/ProfileForm';

const Profile = ({ data: { loading, error, me } }) => {
  let errorMessage;
  if (error) errorMessage = new ErrorDecorator(error).getMessages();

  return (
    <DefaultTemplate>
      {loading && <h3>Loading...</h3>}
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}

      {!loading && !error && <ProfileForm profile={me} />}
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(graphql(CurrentUser)(Profile))));
