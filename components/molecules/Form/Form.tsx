import React from 'react';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import { FormFieldType, FormType, OptionType } from '../../../config/types';

const Form = ({ form }: { form: FormType }) => {
  const { fields, action } = form;
  const formByName = mapKeys(fields, 'name');
  const initialValues = mapValues(formByName, 'initialValue');
  const validationSchema = Yup.object().shape(mapValues(formByName, 'validationSchema'));
  // todo custom components to the fields, strict types
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
