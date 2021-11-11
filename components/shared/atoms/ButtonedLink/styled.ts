import styled, { css, DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';
import { darken } from 'polished';

type TStyles = {
  customStyles?: (theme: DefaultTheme) => FlattenSimpleInterpolation | string;
};

export const StyledLink = styled.a<TStyles>(
  ({ customStyles, theme, theme: { colors } }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    border: none;
    padding: 0.76rem 1rem;
    background-color: ${colors.grey};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${colors.white};
    cursor: pointer;
    transition: 0.1s opacity;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      cursor: default;
      background: ${darken(0.1, colors.lightGrey)};
    }

    ${customStyles && customStyles(theme)}
  `,
);
