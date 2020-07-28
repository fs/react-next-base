import { ApolloError } from '@apollo/client';
import ErrorDecorator from 'decorators/ErrorDecorator';

describe('Error Decorator', () => {
  const errorMessage = 'Invalid email';

  describe('parse method', () => {
    it('should parse Apollo Error', () => {
      // Arrange
      const mockApolloError = new ApolloError({
        graphQLErrors: [
          {
            message: errorMessage,
            path: ['signup'],
            locations: [{ line: 2, column: 3 }],
          },
        ],
      });

      const expectedError = new Error(errorMessage);

      // Act
      const actualError = new ErrorDecorator(mockApolloError);

      // Assert
      expect(actualError).toEqual(expectedError);
    });

    it('should not change if JS Error object', () => {
      // Arrange
      const mockJsError = new Error(errorMessage);
      const expectedError = mockJsError;

      // Act
      const actualError = new ErrorDecorator(mockJsError);

      // Assert
      expect(actualError).toEqual(expectedError);
    });

    it('should create Error object', () => {
      // Arrange
      const expectedError = new Error(errorMessage);

      // Act
      const actualError = new ErrorDecorator(errorMessage);

      // Assert
      expect(actualError).toEqual(expectedError);
    });

    it('should return Something went wrong message', () => {
      // Arrange
      const mockErrorObject = { someKey: 'Wrong file path' };
      const expectedError = new Error('Something went wrong');

      // Act
      const actualError = new ErrorDecorator(mockErrorObject);

      // Assert
      expect(actualError).toEqual(expectedError);
    });
  });

  describe('getMessages method', () => {
    it('should return messages array for one error', () => {
      // Arrange
      const error = new ErrorDecorator('Error message');
      const expectedMessages = ['Error message'];

      // Act
      const actualMessages = error.getMessages();

      // Assert
      expect(actualMessages).toEqual(expectedMessages);
    });

    it('should return messages array for a few errors', () => {
      // Arrange
      const otherErrorMessage = 'Your password invalid or expired';

      const mockApolloErrors = new ApolloError({
        graphQLErrors: [
          {
            message: errorMessage,
            path: ['signup'],
            locations: [{ line: 2, column: 3 }],
          },
          {
            message: otherErrorMessage,
            path: ['signup'],
            locations: [{ line: 2, column: 3 }],
          },
        ],
      });

      const error = new ErrorDecorator(mockApolloErrors);
      const expectedMessages = [errorMessage, otherErrorMessage];

      // Act
      const actualMessages = error.getMessages();

      // Assert
      expect(actualMessages).toEqual(expectedMessages);
    });
  });
});
