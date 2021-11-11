import styled, { css, DefaultTheme } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const dropdownStyles = ({ up, breakpoints }: DefaultTheme) => css`
  margin: 1rem 0;

  ${up(breakpoints.sm)} {
    position: absolute;
    margin-top: -1rem;
    font-size: 0.9rem;
  }
`;

export const filterDropdownStyles = (theme: DefaultTheme) => css`
  ${dropdownStyles(theme)}

  ${theme.up(theme.breakpoints.sm)} {
    left: 1rem;
  }
`;

export const pageSizeDropdownStyles = (theme: DefaultTheme) => css`
  ${dropdownStyles(theme)}

  ${theme.up(theme.breakpoints.sm)} {
    right: 1rem;
  }
`;
