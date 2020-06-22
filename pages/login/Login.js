import React from 'react';
import SignUpForm from 'components/organisms/SignUpForm';
import DefaultTemplate from 'components/templates/DefaultTemplate';

import { withApolloClient } from 'lib/withApolloClient';
import { useQuery } from '@apollo/react-hooks';

import CurrentUser from 'graphql/queries/currentUser.graphql';

const Login = () => {
  const onSuccess = data => {
    console.log('success', data);
  };

  const { data } = useQuery(CurrentUser);

  return (
    <DefaultTemplate>
      <SignUpForm onSuccess={onSuccess} />
      {JSON.stringify(data)};
    </DefaultTemplate>
  );
};

export default withApolloClient(Login);
