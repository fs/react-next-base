import React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import Form from '../../molecules/Form';

const StyledTitle = styled.h3`
  max-width: 40rem;
  margin: 0 auto 1rem;
  line-height: 1.25;
  letter-spacing: -0.035em;
`;

const ProfileFormContent = ({ profile: { email, firstName, lastName }, onSubmit }) => {
  const fields = [
    {
      type: 'text',
      name: 'firstName',
      title: 'First Name',
      placeholder: 'First Name',
      initialValue: firstName || '',
      validationSchema: Yup.string(),
    },
    {
      type: 'text',
      name: 'lastName',
      title: 'Last Name',
      placeholder: 'Last Name',
      initialValue: lastName || '',
      validationSchema: Yup.string(),
    },
    {
      type: 'email',
      name: 'email',
      title: 'Email',
      placeholder: 'Email',
      initialValue: email || '',
      validationSchema: Yup.string()
        .email('The email must be valid!!')
        .required('This field is required'),
    },
    {
      type: 'password',
      name: 'password',
      title: 'New Password',
      placeholder: 'New Password',
      initialValue: '',
      validationSchema: Yup.string(),
    },
    {
      type: 'currentPassword',
      name: 'currentPassword',
      title: 'Confirm Password',
      placeholder: 'Confirm Password',
      initialValue: '',
      validationSchema: Yup.string(),
    },
    {
      type: 'submit',
      name: 'Update',
      initialValue: 'Update',
    },
  ];

  const form = {
    fields,
    submit: onSubmit,
  };

  return (
    <>
      <StyledTitle>Profile</StyledTitle>
      <Form form={form} />
    </>
  );
};
export default ProfileFormContent;
