import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

const Form = () => {
  return (
    <Formik>
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => <FormikForm></FormikForm>}
    </Formik>
  );
};

export default Form;
