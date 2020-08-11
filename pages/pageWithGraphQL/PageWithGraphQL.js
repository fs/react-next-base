import React from 'react';
import { useQuery } from '@apollo/client';

import CurrentUser from 'graphql/queries/currentUser.graphql';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/templates/DefaultTemplate';
import { NotifierProvider } from 'contexts/NotifierContext';
import UserInfo from 'components/organisms/UserInfo/UserInfo';

const PageWithGraphQL = () => {
  const { loading, error, data } = useQuery(CurrentUser);
  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  return (
    <NotifierProvider>
      <DefaultTemplate>
        {loading && <h3>Loading...</h3>}
        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {!loading && !error && <UserInfo data={data} />}
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(PageWithGraphQL)));
