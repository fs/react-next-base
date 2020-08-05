import React from 'react';
import { useQuery } from '@apollo/client';

import CurrentUser from 'graphql/queries/currentUser.graphql';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useSignOut } from 'lib/apollo/hooks/actions';

import DefaultTemplate from 'components/templates/DefaultTemplate';

const PageWithGraphQL = () => {
  const { loading, error, data } = useQuery(CurrentUser);
  const [signOut] = useSignOut();

  const me = data?.me;
  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;
  const signOutFromEverywhere = () => signOut({ everywhere: true });

  return (
    <DefaultTemplate>
      {loading && <h3>Loading...</h3>}
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!loading && !error && (
        <div>
          <button onClick={signOutFromEverywhere}>Sign out from all devices</button>
          {`This is Current User: ${JSON.stringify(me)}`}
        </div>
      )}
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(PageWithGraphQL)));
