import React from 'react';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import { Formik, Field, Form as FormikForm } from 'formik';
import { FormFieldType, FormType, OptionType } from '../../../config/types';

const Form = ({ form }: { form: FormType }) => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const { fields } = form;
  const initialValues = mapValues(mapKeys(fields, 'name'), 'initialValue');
  return (
    <Formik initialValues={initialValues} onSubmit={values => handleSubmit(values)}>
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <FormikForm>
          {fields.map((field: FormFieldType, i: number) => {
            const { type, name, placeholder, options } = field;
            const isInput = !(type === 'textarea' || type === 'select');
            return (
              <Field
                type={isInput ? type : null}
                as={!isInput && type}
                name={name}
                id={name}
                data-testid={`test-${name}`}
                placeholder={placeholder}
                key={`${name}${i}`}
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
            );
          })}
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
