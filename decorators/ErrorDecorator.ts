import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';

const getMessage: (errors: readonly Error[]) => string = (errors) => errors.map((error) => error.message).join(' \n');

const getStatus: (error: Error | GraphQLError) => unknown | null = (error) =>
  error && 'extensions' in error ? error.extensions?.status || null : null;

export default class ErrorDecorator extends Error {
  errors: readonly Error[] = [];

  // TODO: mast we extends from Error?
  // @ts-ignore
  constructor(error: unknown) {
    const errors = ErrorDecorator.parse(error);
    super(getMessage(errors));
    this.errors = errors;
  }

  getMessages() {
    return this.errors.map((err) => err.message);
  }

  hasStatus(status: unknown | null): boolean {
    return this.errors.some((error) => getStatus(error) === status);
  }

  static parse(error: unknown): readonly Error[] {
    if (error instanceof ApolloError) {
      return error.graphQLErrors;
    }

    if (typeof error === 'string') {
      return [new Error(error)];
    }

    if (error instanceof Error) {
      return [error];
    }

    return [new Error('Something went wrong')];
  }
}
