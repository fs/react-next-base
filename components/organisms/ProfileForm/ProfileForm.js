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

const ProfileForm = ({ profile: { email, firstName, lastName } }) => {
  console.log(email);
  const fields = [
    {
      type: 'text',
      name: 'firstName',
      title: 'First Name',
      placeholder: 'First Name',
      initialValue: firstName ? firstName : '',
      validationSchema: Yup.string(),
    },
    {
      type: 'text',
      name: 'lastName',
      title: 'Last Name',
      placeholder: 'Last Name',
      initialValue: lastName ? lastName : '',
      validationSchema: Yup.string(),
    },
    {
      type: 'email',
      name: 'email',
      title: 'Email',
      placeholder: 'Email',
      initialValue: email ? email : '',
      validationSchema: Yup.string()
        .email('The email must be valid!!')
        .required('This field is required'),
    },
    {
      type: 'submit',
      name: 'Update',
      initialValue: 'Update',
    },
  ];

  const onSubmit = values => {
    console.log(values);
  };

  const form = {
    fields,
    submit: values => onSubmit(values),
  };

  return (
    <>
      <StyledTitle>Profile</StyledTitle>
      <Form form={form} />
    </>
  );
};
export default ProfileForm;
