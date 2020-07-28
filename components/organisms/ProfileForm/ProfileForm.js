import React, { useState } from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import Form from '../../molecules/Form';
import { useUpdateUser } from 'lib/apollo/hooks/actions';
import ErrorDecorator from 'decorators/ErrorDecorator';

const StyledTitle = styled.h3`
  max-width: 40rem;
  margin: 0 auto 1rem;
  line-height: 1.25;
  letter-spacing: -0.035em;
`;

const Error = styled.div`
  color: red;
`;

const ProfileForm = ({ profile: { email, firstName, lastName } }) => {
  const [error, setError] = useState(false);
  const [updateUser] = useUpdateUser();
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
      type: 'submit',
      name: 'Update',
      initialValue: 'Update',
    },
  ];

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      await updateUser(values);

      setSubmitting(false);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const form = {
    fields,
    submit: onSubmit,
  };

  return (
    <>
      <StyledTitle>Profile</StyledTitle>
      <Form form={form} />
      {error && <Error>{new ErrorDecorator(error).getMessages()}</Error>}
    </>
  );
};
export default ProfileForm;
