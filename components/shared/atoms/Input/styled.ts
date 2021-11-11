import styled, { css, DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

type TStyles = {
  customStyles?: (theme: DefaultTheme, hasError: boolean | undefined) => FlattenSimpleInterpolation | string;
  hasError?: boolean | undefined;
};

export const FieldWrapper = styled.div<TStyles>(
  ({ theme: { colors, breakpoints, up, down }, theme, hasError, customStyles }) => css`
    position: relative;
    width: 100%;

    ${up(breakpoints.xl)} {
      margin-bottom: 2.3rem;
    }

    ${down(breakpoints.xl)} {
      margin-bottom: 1.8rem;
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 0.5rem 0;
      margin: 0;
      font-size: 0.875rem;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid ${hasError ? colors.error : colors.grey};
      font-family: 'Gilroy', sans-serif;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    input:disabled {
      background-color: ${colors.grey};
    }

    ${customStyles && customStyles(theme, hasError)}
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    width: 100%;
    color: ${colors.error};
    padding: 0.5rem 0 0;
    font-size: 0.68rem;
  `,
);

export const FieldLabel = styled.label(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: -0.35rem;
    left: 0.5rem;
    font-size: 0.7rem;
    background-color: ${colors.white};
    color: ${colors.grey};
    padding: 0 0.5rem;
    z-index: 1;
  `,
);

export const ShowPasswordButton = styled.div`
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.375rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  cursor: pointer;

  svg {
    position: absolute;
  }
`;
