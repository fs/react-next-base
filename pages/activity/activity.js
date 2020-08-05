import React from 'react';
import { useQuery } from '@apollo/client';

import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';

import Activities from 'graphql/queries/pages/activities.graphql';

import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import DefaultTemplate from 'components/templates/DefaultTemplate';
import ActivityTable from 'components/organisms/ActivityTable';

const Activity = () => {
  const { loading, error, data } = useQuery(Activities);

  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  return (
    <DefaultTemplate>
      {loading && <h3>Loading...</h3>}
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!loading && !error && <ActivityTable data={data} />}
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Activity)));
