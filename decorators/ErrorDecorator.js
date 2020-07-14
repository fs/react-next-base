import { ApolloError } from 'apollo-client';

const getMessage = errors => (Array.isArray(errors) ? errors.map(error => error.message).join(' \n') : 'Unknown error');

const getStatus = error => (error && error.extensions ? error.extensions.status : null);

export default class ErrorDecorator extends Error {
  errors = [];

  constructor(error) {
    const errors = ErrorDecorator.parse(error);
    super(getMessage(errors));
    this.errors = errors;
  }

  getMessages() {
    return this.errors.map(err => err.message);
  }

  hasStatus(status) {
    return this.errors.some(error => getStatus(error) === status);
  }

  static parse(error) {
    if (error instanceof ApolloError) {
      return error.graphQLErrors;
    }

    if (error && typeof error === 'string') {
      return [new Error(error)];
    }

    return error.message ? [error] : [new Error('Something went wrong')];
  }
}
