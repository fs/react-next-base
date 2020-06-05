import React from 'react';
import { graphql } from '@apollo/react-hoc';
import CurrentUser from 'graphql/queries/currentUser.graphql';

const PageWithGraphQL = ({ data: { loading, error, me } }) => {
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error}</h3>;
  return <div>{`This is Current User: ${me}`}</div>;
};

export default graphql(CurrentUser)(PageWithGraphQL);
