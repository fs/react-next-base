import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';

const getGraphQLErrorExtensions = (error: GraphQLError) => {
  return error?.extensions || null;
};

function isApolloError(error: unknown): error is ApolloError {
  return (
    typeof error === 'object' &&
    error != null &&
    'graphQLErrors' in error &&
    'networkError' in error &&
    'message' in error
  );
}

export default class ErrorDecorator {
  error: Error | GraphQLError | null;

  message = '';

  constructor(error: unknown) {
    if (error) {
      const parsedError = ErrorDecorator.parse(error);
      this.error = parsedError;
      this.message = parsedError?.message;
    } else {
      this.error = null;
    }
  }

  /**
   *
   * @param status
   * the function can be used if it is necessary to check the status of an error returned from the API
   */
  hasStatus(status: unknown | null): boolean {
    if (this.error instanceof GraphQLError) {
      const errorExtensions = getGraphQLErrorExtensions(this.error);
      return errorExtensions?.status === status;
    }
    return false;
  }

  /**
   *
   * @param error
   * the function should be used to make the errors look like: Error or GraphQL Error
   */
  static parse(error: unknown): Error | GraphQLError {
    if (isApolloError(error)) {
      return error.graphQLErrors[0];
    }

    if (typeof error === 'string') {
      return new Error(error);
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error('Something went wrong');
  }
}
