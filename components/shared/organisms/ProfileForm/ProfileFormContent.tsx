import React, { ChangeEvent } from 'react';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik';

import type { CurrentUser } from 'api/types/user';
import { FormFieldConfig, FormFieldType } from 'types/formsType';

import type useUpdateUser from 'lib/apollo/hooks/actions/useUpdateUser';

import Loader from 'components/shared/atoms/Loader';
import Form from 'components/shared/molecules/Form';

import { FormWrapper, StyledTitle, AvatarWrapper, AvatarImg } from './styled';

type UpdateUserFn = ReturnType<typeof useUpdateUser>[0];
type ValuesFromFormik = Parameters<UpdateUserFn>[0];

type ProfileFormContentProps = {
  temporaryUrl: string | null;
  profile: CurrentUser;
  onSubmit: (values: ValuesFromFormik, formikHelpers: FormikHelpers<ValuesFromFormik>) => Promise<void>;
  handleAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

type ProfileFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  currentPassword: string;
};

const ProfileFormContent = ({
  temporaryUrl,
  profile: { email, firstName, lastName, avatarUrl },
  onSubmit,
  handleAvatarChange,
  loading,
}: ProfileFormContentProps) => {
  const fields: FormFieldConfig[] = [
    {
      type: FormFieldType.file,
      name: 'avatar',
      title: 'Avatar',
      testID: 'avatar',
      accept: 'image/*',
      onChange: handleAvatarChange,
      initialValue: null,
    },
    {
      type: FormFieldType.text,
      name: 'firstName',
      title: 'First Name',
      placeholder: 'First Name',
      testID: 'first-name',
      initialValue: firstName || '',
      validationSchema: Yup.string(),
    },
    {
      type: FormFieldType.text,
      name: 'lastName',
      title: 'Last Name',
      placeholder: 'Last Name',
      testID: 'last-name',
      initialValue: lastName || '',
      validationSchema: Yup.string(),
    },
    {
      type: FormFieldType.email,
      name: 'email',
      title: 'Email',
      placeholder: 'Email',
      testID: 'email',
      initialValue: email || '',
      validationSchema: Yup.string().email('The email must be valid!!').required('This field is required'),
    },
    {
      type: FormFieldType.password,
      name: 'password',
      title: 'New Password',
      placeholder: 'New Password',
      testID: 'password',
      initialValue: '',
      validationSchema: Yup.string(),
    },
    {
      type: FormFieldType.password,
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
      type: FormFieldType.submit,
      name: 'Update',
      testID: 'submit-button',
      label: 'Update',
      initialValue: 'Update',
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
      <Form<ProfileFormValues> form={form} />
      {loading && <Loader testId="profile-updating-loader">Loading</Loader>}
    </FormWrapper>
  );
};
export default ProfileFormContent;
