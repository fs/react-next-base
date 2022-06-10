import { ApolloError } from '@apollo/client';
import GraphqlErrorType from 'types/graphqlErrorType';

const isApolloError = (error: unknown): error is ApolloError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'graphQLErrors' in error &&
    'networkError' in error &&
    'message' in error
  );
};

const parseApolloError = (error: unknown): GraphqlErrorType => {
  if (!isApolloError(error)) {
    return { message: '' };
  }

  const [graphqlError] = error.graphQLErrors;
  const { message, extensions } = graphqlError;
  const { code, detail, status } = extensions || {};

  return { message, code, detail, status };
};

export default parseApolloError;
