import styled, { css } from 'styled-components';

export const BUTTON_HEIGHT_TYPES = {
  STANDART: '0.76rem 1rem',
  TALL: '0.9rem 1rem',
  NARROW: '0.56rem 1rem',
};

export const StyledButton = styled.button(
  ({ heightType = BUTTON_HEIGHT_TYPES.STANDART, customStyles, theme, theme: { colors } }) =>
    css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: auto;
      border: none;
      padding: ${heightType};
      background-color: ${colors.blue};
      font-size: 0.875rem;
      font-family: 'Gilroy', sans-serif;
      font-weight: 600;
      color: ${colors.white};
      cursor: pointer;
      margin: 0;
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
