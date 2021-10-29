import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import useUpdateUser from 'lib/apollo/hooks/actions/useUpdateUser';
import usePresignFile from 'lib/apollo/hooks/actions/usePresignFile';
import { useNotifier } from 'contexts/NotifierContext';
import { useFileUpload } from 'hooks/useFileUpload';
import ErrorDecorator from 'decorators/ErrorDecorator';

import ProfileForm from './ProfileForm';

jest.mock('lib/apollo/hooks/actions/useUpdateUser');
jest.mock('lib/apollo/hooks/actions/usePresignFile');
jest.mock('contexts/NotifierContext');
jest.mock('hooks/useFileUpload');
jest.mock('decorators/ErrorDecorator');

describe('ProfileForm', () => {
  let mockUpdateUser;
  let mockPresignFile;
  let mockFileUpload;
  let mockNotifierSetSuccess;

  beforeEach(() => {
    mockUpdateUser = jest.fn(() => Promise.resolve());
    useUpdateUser.mockImplementation(() => [mockUpdateUser]);
    mockPresignFile = jest.fn(() => Promise.resolve());
    usePresignFile.mockImplementation(() => [mockPresignFile]);
    mockFileUpload = jest.fn(() => Promise.resolve());
    useFileUpload.mockImplementation(() => [mockFileUpload]);
    mockNotifierSetSuccess = jest.fn();
    useNotifier.mockImplementation(() => ({
      setSuccess: mockNotifierSetSuccess,
    }));
  });

  test('should call useUpdateUser on submit', async () => {
    // Arrange
    const expectedEmail = 'test@test.com';
    const expectedFirstName = 'Test FirstName';
    const expectedLastName = 'Test LastName';
    const expectedProfile = {
      email: expectedEmail,
      firstName: expectedFirstName,
      lastName: expectedLastName,
    };

    const expectedValues = {
      ...expectedProfile,
      password: '',
      currentPassword: '',
      Update: 'Update',
      avatar: undefined,
    };

    render(renderWithTheme(<ProfileForm profile={expectedProfile} />));

    // Act
    fireEvent.click(screen.getByTestId('update-button'));

    // Assert
    await waitFor(() => expect(mockUpdateUser).toHaveBeenCalledWith(expectedValues));
    expect(mockPresignFile).not.toHaveBeenCalled();
    expect(mockFileUpload).not.toHaveBeenCalled();
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
    const expectedAvatarTestId = 'avatar';
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
      Update: 'Update',
      avatar: undefined,
    };

    render(renderWithTheme(<ProfileForm profile={expectedProfile} />));

    const fileInput = screen.getByTestId(expectedAvatarTestId);
    fireEvent.change(fileInput, mockAvatarChangeEvent);

    // Act
    fireEvent.click(screen.getByTestId('update-button'));

    // Assert
    await waitFor(() => expect(mockPresignFile).toHaveBeenCalledWith(expectedPresignFileValues));
    expect(mockFileUpload).toHaveBeenCalledWith(undefined, mockFile);
    expect(mockUpdateUser).toHaveBeenCalledWith(expectedUpdateUserValues);
    expect(mockPresignFile).toHaveBeenCalledBefore(mockFileUpload);
    expect(mockFileUpload).toHaveBeenCalledBefore(mockUpdateUser);
  });

  test('should call errorDecorator on error', async () => {
    // Arrange
    const expectedEmail = 'test@test.com';
    const expectedFirstName = 'Test FirstName';
    const expectedLastName = 'Test LastName';
    // const expectedButtonText = 'Update';
    const expectedPasswordPlaceholderText = 'New Password';
    const expectedProfile = {
      email: expectedEmail,
      firstName: expectedFirstName,
      lastName: expectedLastName,
    };

    const expectedError = {
      errors: [{ message: 'Record Invalid' }],
    };

    mockUpdateUser = jest.fn(() => Promise.reject(expectedError));

    const mockErrorDecorator = jest.fn();
    ErrorDecorator.mockImplementation(mockErrorDecorator);

    render(renderWithTheme(<ProfileForm profile={expectedProfile} />));
    fireEvent.input(screen.getByPlaceholderText(expectedPasswordPlaceholderText), { value: '123' });

    // Act
    fireEvent.click(screen.getByTestId('update-button'));

    // Assert
    await waitFor(() => expect(mockErrorDecorator).toHaveBeenCalledWith(expectedError));
  });
});
