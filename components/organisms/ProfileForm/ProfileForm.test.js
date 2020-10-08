import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import { useUpdateUser, usePresignFile } from 'lib/apollo/hooks/actions';
import { useFileUpload } from 'lib/FileUpload/useFileUpload';
import ErrorDecorator from 'decorators/ErrorDecorator';

import ProfileForm from './ProfileForm';

jest.mock('lib/apollo/hooks/actions');
jest.mock('lib/FileUpload/useFileUpload');
jest.mock('decorators/ErrorDecorator');

describe('ProfileForm', () => {
  afterEach(() => {
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
    useUpdateUser.mockImplementation(jest.fn(() => [mockUpdateUser]));
    const mockPresignFile = jest.fn(() => Promise.resolve());
    usePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
    const mockFileUpload = jest.fn(() => Promise.resolve());
    useFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

    const { getByText } = render(renderWithTheme(<ProfileForm profile={expectedProfile} />));

    // Act
    fireEvent.click(getByText(expectedButtonText));

    // Assert
    await wait(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith(expectedValues);
      expect(mockPresignFile).toHaveBeenCalledWith({});
      expect(mockFileUpload).toHaveBeenCalledWith(undefined, {});
    });
  });

  test('should call useUpdateUser and fileUpload on submit', async () => {
    // Arrange
    const mockFileName = 'avatar.png';
    const mockFileType = 'image/png';
    // eslint-disable-next-line no-undef
    const mockFile = new File(['avatarka'], mockFileName, { type: mockFileType });
    const mockAvatarChangeEvent = {
      target: {
        files: [mockFile],
      },
    };
    const expectedEmail = 'test@test.com';
    const expectedFirstName = 'Test FirstName';
    const expectedLastName = 'Test LastName';
    const expectedAvatarTestId = 'test-avatar';
    const expectedButtonText = 'Update';
    const expectedProfile = {
      email: expectedEmail,
      firstName: expectedFirstName,
      lastName: expectedLastName,
    };

    const expectedPresignFileValues = {
      filename: mockFileName,
      type: mockFileType,
    };

    const expectedUpdateUserValues = {
      ...expectedProfile,
      password: '',
      currentPassword: '',
      [expectedButtonText]: expectedButtonText,
    };
    const mockUpdateUser = jest.fn(() => Promise.resolve());
    useUpdateUser.mockImplementation(jest.fn(() => [mockUpdateUser]));
    const mockPresignFile = jest.fn(() => Promise.resolve());
    usePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
    const mockFileUpload = jest.fn(() => Promise.resolve());
    useFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

    const { getByText, getByTestId } = render(renderWithTheme(<ProfileForm profile={expectedProfile} />));

    const fileInput = getByTestId(expectedAvatarTestId);
    fireEvent.change(fileInput, mockAvatarChangeEvent);

    // Act
    fireEvent.click(getByText(expectedButtonText));

    // Assert
    await wait(() => {
      expect(mockPresignFile).toHaveBeenCalledWith(expectedPresignFileValues);
      expect(mockFileUpload).toHaveBeenCalledWith(undefined, mockFile);
      expect(mockUpdateUser).toHaveBeenCalledWith(expectedUpdateUserValues);
      expect(mockPresignFile).toHaveBeenCalledBefore(mockFileUpload);
      expect(mockFileUpload).toHaveBeenCalledBefore(mockUpdateUser);
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
    useUpdateUser.mockImplementation(jest.fn(() => [mockUpdateUser]));
    const mockPresignFile = jest.fn(() => Promise.resolve());
    usePresignFile.mockImplementation(jest.fn(() => [mockPresignFile]));
    const mockFileUpload = jest.fn(() => Promise.resolve());
    useFileUpload.mockImplementation(jest.fn(() => [mockFileUpload]));

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
