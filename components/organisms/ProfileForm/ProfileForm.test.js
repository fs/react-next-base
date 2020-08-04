import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import * as actions from 'lib/apollo/hooks/actions';
import ErrorDecorator from 'decorators/ErrorDecorator';

import ProfileForm from './ProfileForm';

jest.mock('lib/apollo/hooks/actions');
jest.mock('decorators/ErrorDecorator');
const originalUseUpdateUser = actions.useUpdateUser;

describe('ProfileForm', () => {
  afterEach(() => {
    actions.useUpdateUser = originalUseUpdateUser;
    jest.clearAllMocks();
    jest.resetModules();
    cleanup();
  });

  test('should call useUpdateUser on submit', async () => {
    // Arrange
    const expectedEmail = 'test@test.com';
    const expectedFirstName = 'Test FirstName';
    const expectedLastName = 'Test LastName';
    const expectedButtonText = 'Update';
    const expectedProfile = {
      email: expectedEmail,
      firstName: expectedFirstName,
      lastName: expectedLastName,
    };

    const expectedValues = {
      ...expectedProfile,
      password: '',
      currentPassword: '',
      [expectedButtonText]: expectedButtonText,
    };
    const mockUpdateUser = jest.fn(() => Promise.resolve());
    actions.useUpdateUser = jest.fn(() => [mockUpdateUser]);

    const { getByText } = render(renderWithTheme(<ProfileForm profile={expectedProfile} />));

    // Act
    fireEvent.click(getByText(expectedButtonText));

    // Assert
    await wait(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith(expectedValues);
    });
  });

  test('should call errrorDecorator on error', async () => {
    // Arrange
    const expectedEmail = 'test@test.com';
    const expectedFirstName = 'Test FirstName';
    const expectedLastName = 'Test LastName';
    const expectedButtonText = 'Update';
    const expectedPasswordPlaceholderText = 'New Password';
    const expectedProfile = {
      email: expectedEmail,
      firstName: expectedFirstName,
      lastName: expectedLastName,
    };

    const expectedError = {
      errors: [{ message: 'Record Invalid' }],
    };
    const mockUpdateUser = jest.fn(() => Promise.reject(expectedError));
    actions.useUpdateUser = jest.fn(() => [mockUpdateUser]);

    const mockErrorDecorator = jest.fn();
    ErrorDecorator.mockImplementation(mockErrorDecorator);

    const { getByText, getByPlaceholderText } = render(renderWithTheme(<ProfileForm profile={expectedProfile} />));
    fireEvent.input(getByPlaceholderText(expectedPasswordPlaceholderText), { value: '123' });

    // Act
    fireEvent.click(getByText(expectedButtonText));

    // Assert
    await wait(() => {
      expect(mockErrorDecorator).toHaveBeenCalledWith(expectedError);
    });
  });
});
