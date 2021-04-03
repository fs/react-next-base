import styled from 'styled-components';

export const FormWrapper = styled.div`
  max-width: 40rem;

  input,
  textarea,
  select {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    border: 1px solid rgb(179, 179, 179);
  }

  [type='file'] {
    border: none;
    padding: 0;
  }

  input[type='checkbox'],
  input[type='radio'] {
    width: auto;
  }

  textarea {
    resize: vertical;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FieldWrapper = styled.div`
  position: relative;
  padding-top: 1.5rem;
  margin-bottom: 1rem;
`;
export const FieldLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
`;
export const ErrorWrapper = styled.div`
  font-size: 0.9rem;
  color: red;
  padding: 0.5rem 0 0 1rem;
`;
