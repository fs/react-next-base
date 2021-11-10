import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface IStyles {
  customStyles?: FlattenSimpleInterpolation | string;
}

export const StyledButton = styled.button<IStyles>(
  ({
    theme: {
      colors: { grey },
    },
    disabled,
    customStyles,
  }) => css`
    display: flex;
    padding: 0.5rem;
    background-color: transparent;
    border: 2px solid ${grey};

    ${disabled
      ? css`
          cursor: default;
          svg {
            fill: ${grey};
            transition: fill 0.2s;
          }
        `
      : css`
          & {
            background-color: transparent;
            transition: background-color 0.2s;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
            transition: background-color 0.2s;
          }
        `}

    ${customStyles}
  `,
);
