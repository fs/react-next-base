import styled, { css } from 'styled-components';

export const StyledButton = styled.button(
  ({ customStyles, theme, theme: { colors } }) =>
    css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: auto;
      margin: 0;
      padding: 0.5rem;
      border: none;
      background-color: ${colors.grey};
      color: ${colors.white};
      font-size: 0.875rem;
      cursor: pointer;
      transition: 0.1s opacity;

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        cursor: default;
        opacity: 0.5;
      }

      ${customStyles && customStyles(theme)}
    `,
);
