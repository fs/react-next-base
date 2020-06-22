import React from 'react';
import { graphql } from '@apollo/react-hoc';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import WithAuthSecurity from 'lib/auth/WithAuthSecurity';
import DefaultTemplate from 'components/templates/DefaultTemplate';

const PageWithGraphQL = props => {
  const {
    data: { loading, error, me },
  } = props;

  return (
    <DefaultTemplate>
      {loading && <h3>Loading...</h3>}
      {error && <h3>Error: {error}</h3>}
      {!loading && !error && <div>{`This is Current User: ${JSON.stringify(me)}`}</div>}
    </DefaultTemplate>
  );
};

export default WithAuthSecurity(graphql(CurrentUser)(PageWithGraphQL));
