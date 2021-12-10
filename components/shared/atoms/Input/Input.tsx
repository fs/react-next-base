import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
`;

export default Input;
