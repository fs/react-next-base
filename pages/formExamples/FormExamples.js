import React from 'react';
import Form from '../../components/molecules/Form';
import * as Yup from 'yup';

const form = {
  fields: [
    {
      type: 'text',
      name: 'text',
      title: 'Name',
      placeholder: 'Type here',
      initialValue: '',
      validationSchema: Yup.string().required('This field is required'),
    },
    {
      type: 'email',
      name: 'email',
      title: 'E-mail',
      placeholder: 'your email',
      initialValue: '',
      validationSchema: Yup.string()
        .email('The email must be valid!!')
        .required('This field is required'),
    },
    {
      type: 'text',
      name: 'text2',
      placeholder: 'Type here 2',
      initialValue: '222',
    },
    {
      type: 'textarea',
      name: 'textarea',
      placeholder: 'Type here 3',
      initialValue: '3333',
    },
    {
      type: 'select',
      name: 'select',
      initialValue: 2,
      options: [
        { label: 'chose 1', value: 1 },
        { label: 'chose 2', value: 2 },
      ],
    },
    {
      type: 'checkbox',
      name: 'checkbox',
      label: 'check it',
      initialValue: true,
      validationSchema: Yup.string().matches(true, 'Need to be checked'),
    },
    {
      type: 'button',
      name: 'button',
      initialValue: 'check it',
      action: () => console.log('check it'),
    },
    {
      type: 'submit',
      name: 'submit',
      initialValue: 'submit it',
    },
  ],
  action: values => console.log(values),
};

const FormExamples = () => {
  return (
    <div>
      <h1>Form examples</h1>
      <Form form={form} />
    </div>
  );
};

export default FormExamples;
