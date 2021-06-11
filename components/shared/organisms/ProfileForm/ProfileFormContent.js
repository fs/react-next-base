import React from 'react';
import * as Yup from 'yup';
import Form from 'components/shared/molecules/Form';
import Loader from 'components/shared/atoms/Loader';

import { FormWrapper, StyledTitle, AvatarWrapper, AvatarImg } from './styled';

const ProfileFormContent = ({
  temporaryUrl,
  profile: { email, firstName, lastName, avatarUrl },
  onSubmit,
  handleAvatarChange,
  loading,
}) => {
  const fields = [
    {
      type: 'file',
      name: 'avatar',
      title: 'Avatar',
      testID: 'avatar',
      accept: 'image/*',
      onChange: handleAvatarChange,
    },
    {
      type: 'text',
      name: 'firstName',
      title: 'First Name',
      placeholder: 'First Name',
      testID: 'first-name',
      initialValue: firstName || '',
      validationSchema: Yup.string(),
    },
    {
      type: 'text',
      name: 'lastName',
      title: 'Last Name',
      placeholder: 'Last Name',
      testID: 'last-name',
      initialValue: lastName || '',
      validationSchema: Yup.string(),
    },
    {
      type: 'email',
      name: 'email',
      title: 'Email',
      placeholder: 'Email',
      testID: 'email',
      initialValue: email || '',
      validationSchema: Yup.string().email('The email must be valid!!').required('This field is required'),
    },
    {
      type: 'password',
      name: 'password',
      title: 'New Password',
      placeholder: 'New Password',
      testID: 'password',
      initialValue: '',
      validationSchema: Yup.string(),
    },
    {
      type: 'password',
      name: 'currentPassword',
      title: 'Current Password',
      placeholder: 'Current Password',
      testID: 'current-password',
      initialValue: '',
      validationSchema: Yup.string().when(['password'], {
        is: (password) => password?.length > 0,
        then: Yup.string().required('If you filled New Password, Current Password field should be filled too'),
        otherwise: Yup.string(),
      }),
    },
    {
      type: 'submit',
      name: 'Update',
      testID: 'update-button',
      label: 'Update',
    },
  ];

  const form = {
    fields,
    submit: onSubmit,
  };

  const avatarSrc = temporaryUrl || avatarUrl;

  return (
    <FormWrapper>
      <StyledTitle data-cy="profile-form-title">Profile</StyledTitle>
      {avatarSrc && (
        <AvatarWrapper>
          <AvatarImg src={avatarSrc} />
        </AvatarWrapper>
      )}
      <Form form={form} />
      {loading && <Loader testId="profile-updating-loader">Loading</Loader>}
    </FormWrapper>
  );
};
export default ProfileFormContent;
