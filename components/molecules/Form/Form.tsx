import React from 'react';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import { FormFieldType, FormType, OptionType } from '../../../config/types';

const validationRules = Yup.object().shape({
  email: Yup.string()
    .email('The email must be valid!!')
    .required('This field is required'),
  text2: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  message: Yup.string().required('This field is required'),
});

const Form = ({ form }: { form: FormType }) => {
  const { fields, action } = form;
  const initialValues = mapValues(mapKeys(fields, 'name'), 'initialValue');
  console.log(mapKeys(fields, 'name'));
  const validationSchema = validationRules;
  return (
    <Formik initialValues={initialValues} onSubmit={action} validationSchema={validationSchema}>
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <FormikForm>
          {fields.map((field: FormFieldType, i: number) => {
            const { type, name, placeholder, options, action } = field;
            const isInput = !(type === 'textarea' || type === 'select');
            return (
              <div key={`${name}${i}`}>
                <Field
                  type={isInput ? type : null}
                  as={!isInput && type}
                  name={name}
                  onClick={action}
                  id={name}
                  data-testid={`test-${name}`}
                  placeholder={placeholder}
                >
                  {type === 'select' && options
                    ? options.map((option: OptionType, i: number) => {
                        const { value, label } = option;
                        return (
                          <option value={value} key={`${value}${i}`}>
                            {label}
                          </option>
                        );
                      })
                    : null}
                </Field>
                <ErrorMessage name={name} />
              </div>
            );
          })}
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
