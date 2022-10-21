import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

export const PageContent = styled.main(
  ({ theme: { down, breakpoints } }) =>
    css`
      padding: 2rem 1rem;
      width: 100%;
      max-width: ${breakpoints.xl};

      ${down(breakpoints.xl)} {
        max-width: 100%;
      }
    `,
);
