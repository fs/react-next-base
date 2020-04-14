import React from 'react';
import { graphql } from '@apollo/react-hoc';
import currentUser from 'graphql/queries/CurrentUser.graphql';
// or for files with multiple operations:
// import { query1, query2 } from './queries.graphql';

const PageWithQuery = ({ data }) => {
  if (data.loading) return <h3>Loading...</h3>;
  return <div>{`This is Current User: ${data.me}`}</div>;
};

export default graphql(currentUser)(PageWithQuery);
