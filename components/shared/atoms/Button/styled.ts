import styled from 'styled-components';

export const ButtonHtml = styled.button`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  border-radius: 0.3rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey};
    border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  }
`;
