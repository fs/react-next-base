import styled, { css } from 'styled-components';
import baseCellStyles from './baseCellStyles';

export const StyledTable = styled.table(
  ({ theme: { colors, up, breakpoints } }) =>
    css`
      position: relative;
      border-spacing: 0;
      display: block;
      overflow-x: auto;
      text-align: left;
      width: 100%;
      color: ${colors.darkGrey};

      ${up(breakpoints.lg)} {
        display: table;
        overflow-x: initial;
      }
    `,
);

export const ColorLabel = styled.td(
  ({ color }) => css`
    min-width: 5px;
    background-color: ${color};
  `,
);

export const HeaderCell = styled.th(
  ({ theme }) => css`
    ${baseCellStyles(theme)}
  `,
);

export const UserInfo = styled.span`
  margin-left: 0.5rem;
`;

export const EmptyList = styled.div`
  margin: 3rem 0;
  text-align: center;
  font-style: italic;
`;

export const StyledCell = styled.td(
  ({ theme }) => css`
    ${baseCellStyles(theme)}
    font-weight: 100;

    &:nth-child(4) {
      white-space: nowrap;
    }
  `,
);

export const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
