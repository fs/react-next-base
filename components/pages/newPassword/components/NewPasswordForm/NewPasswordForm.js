import React from 'react';
import * as Yup from 'yup';

import useUpdatePassword from 'lib/apollo/hooks/actions/useUpdatePassword';

import ResetForm from '../ResetForm';

const passwordRegularExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([0-9A-Za-z#$@&!?.*^{}<>;,)(~'"=_%+-]+)$/;

const NewPasswordForm = ({ query = {} }) => {
  const [updatePassword] = useUpdatePassword();

  const { reset_token: resetToken } = query;

  const onSubmit = async ({ password }, { setSubmitting }) => {
    setSubmitting(true);
    await updatePassword({ password, resetToken });
    setSubmitting(false);
  };

  const fields = [
    {
      type: 'password',
      name: 'password',
      testId: 'password',
      placeholder: 'Новый пароль',
    },
    {
      type: 'password',
      name: 'passwordConfirmation',
      testId: 'passwordConfirmation',
      placeholder: 'Еще раз новый пароль',
    },
  ];

  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('This field is required')
      .trim()
      .min(6, 'The minimum password length is 6 characters')
      .matches(passwordRegularExp, 'Password must contain upper and lower case characters and numbers'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password does not match')
      .required('This field is required'),
  });

  const form = {
    fields,
    initialValues,
    validationSchema,
    onSubmit,
  };

  return <ResetForm form={form} />;
};

export default NewPasswordForm;
