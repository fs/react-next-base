import React from 'react';
import { useQuery } from '@apollo/client';

import CurrentUser from 'graphql/queries/currentUser.graphql';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/templates/DefaultTemplate';

const PageWithGraphQL = () => {
  const { loading, error, data } = useQuery(CurrentUser);

  const me = data?.me;
  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  return (
    <DefaultTemplate>
      {loading && <h3>Loading...</h3>}
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!loading && !error && <div>{`This is Current User: ${JSON.stringify(me)}`}</div>}
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(PageWithGraphQL)));
