import React from 'react';
import { Formik, Field, Form as FormikForm } from 'formik';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';

// const initialValues = { text: '', text2: 'hello' };

const Form = ({ form }: { form: any }) => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const { fields } = form;
  const initialValues = mapValues(mapKeys(fields, 'name'), 'initialValue');
  return (
    <Formik initialValues={initialValues} onSubmit={values => handleSubmit(values)}>
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <FormikForm>
          {fields.map((field: any, i: number) => {
            return <Field type={field.type} name={field.name} placeholder={field.placeholder} key={field.name + i} />;
          })}
          <button type="submit">Submit</button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
