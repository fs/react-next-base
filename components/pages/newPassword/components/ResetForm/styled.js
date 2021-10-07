import styled, { css } from 'styled-components';

export const FormWrapper = styled.div(
  ({ theme: { colors, up, down, breakpoints } }) => css`
    position: absolute;
    left: 50%;

    background: ${colors.white};
    transform: translateX(-50%);

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    ${up(breakpoints.xl)} {
      top: 10rem;
      width: 28rem;
    }

    ${down(breakpoints.xl)} {
      top: 8rem;
      width: 24rem;
    }
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.9rem;
    color: ${colors.error};
    padding: 0.5rem 0 0 1rem;
  `,
);

export const customButtonStyles = () => css`
  width: 10rem;
  font-size: 0.785rem;
  text-transform: uppercase;
`;
