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
      name: 'text3',
      placeholder: 'Type here 3',
      initialValue: '3333',
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
