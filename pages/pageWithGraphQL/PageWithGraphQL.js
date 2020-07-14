import React from 'react';
import { graphql } from '@apollo/react-hoc';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';

const PageWithGraphQL = ({ data: { loading, error, me } }) => {
  let errorMessage;
  if (error) errorMessage = new ErrorDecorator(error).getMessages();

  if (loading) return <h3>Loading...</h3>;
  if (error) return <ErrorMessage>Error: {errorMessage}</ErrorMessage>;
  return <div>{`This is Current User: ${me}`}</div>;
};

export default graphql(CurrentUser)(PageWithGraphQL);
