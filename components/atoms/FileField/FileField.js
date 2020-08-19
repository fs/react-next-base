import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import { useUploadFile } from 'lib/apollo/hooks/actions';

const FieldWrapper = styled.div`
  position: relative;
  padding-top: 1.5rem;
  margin-bottom: 1rem;
`;

const FieldLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
`;

const FileField = ({ name, placeholder, title, initialValue }) => {
  const [uploadFile] = useUploadFile();

  const handleFileUpload = async event => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = event;

    if (validity.valid) {
      const { name: filename, type } = file;

      console.log({ filename, type });
      try {
        await uploadFile({ filename, type });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {title && <FieldLabel htmlFor={name}>{title}</FieldLabel>}

      {initialValue && <img src={initialValue} alt="" />}
      <Field
        type="file"
        name={name}
        onChange={handleFileUpload}
        id={name}
        data-testid={`test-${name}`}
        placeholder={placeholder}
      />
    </>
  );
};
export default FileField;
