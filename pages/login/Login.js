import React from 'react';
import SignUpForm from 'components/organisms/SignUpForm';
import DefaultTemplate from 'components/templates/DefaultTemplate';

import WithAuth from 'lib/auth/WithAuth';
import { withApolloClient } from 'lib/withApolloClient';
import { useCurrentUser } from 'lib/apollo/hooks/state';

const Login = () => {
  const user = useCurrentUser(false);

  return (
    <DefaultTemplate>
      <SignUpForm />
      {JSON.stringify(user)};
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(Login));
