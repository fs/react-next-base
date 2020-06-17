import React from 'react';
import { graphql } from '@apollo/react-hoc';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import WithAuthSecurity from 'lib/auth/WithAuthSecurity';

const PageWithGraphQL = props => {
  const {
    data: { loading, error, me },
  } = props;

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error}</h3>;
  return <div>{`This is Current User: ${me}`}</div>;
};

export default graphql(CurrentUser)(WithAuthSecurity(PageWithGraphQL));
