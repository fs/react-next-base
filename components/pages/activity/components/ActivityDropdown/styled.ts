import styled, { css, DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

export const Wrapper = styled.div<{
  customStyles?: (theme: DefaultTheme) => FlattenSimpleInterpolation | string;
}>(
  ({ theme, customStyles }) => css`
    display: flex;
    justify-content: center;

    ${customStyles && customStyles(theme)}
  `,
);

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const StyledSelect = styled.select(
  ({ theme: { up, breakpoints } }) => css`
    margin-top: 0.5rem;
    padding: 0.25rem;
    font-size: 1rem;

    ${up(breakpoints.sm)} {
      font-size: 0.8rem;
    }
  `,
);
