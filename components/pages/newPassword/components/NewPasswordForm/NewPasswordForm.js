import React from 'react';
import * as Yup from 'yup';

import useUpdatePassword from 'lib/apollo/hooks/actions/useUpdatePassword';

import useNotifier from 'hooks/useNotifier';

import ResetForm from '../ResetForm';

const NewPasswordForm = ({ query = {} }) => {
  const [updatePassword] = useUpdatePassword();

  const { setError } = useNotifier();

  const { reset_token: resetToken } = query;

  const onSubmit = async ({ password }, { setSubmitting }) => {
    try {
      setSubmitting(true);

      await updatePassword({ password, resetToken });

      setSubmitting(false);
    } catch (error) {
      setError(error);
    }
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
      .required('Это обязательное поле')
      .trim()
      .min(6, 'Минимальная длина пароля - 6 символов')
      .oneOf([Yup.ref('password'), null], 'Пароль не совпадает')
      .required('Это обязательное поле'),
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
