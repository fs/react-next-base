import React from 'react';
import Form from '../../components/molecules/Form';

const form = {
  fields: [
    {
      type: 'text',
      name: 'text',
      placeholder: 'Type here',
      initialValue: '',
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
      type: 'submit',
      name: 'submit',
      initialValue: 'submit it',
    },
  ],
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
