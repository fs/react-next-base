import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface IStyles {
  active: boolean;
}

export const StyledTab = styled.li<IStyles>(
  ({ theme: { colors, breakpoints, down }, active }) => css`
    padding: 0 15px 5px 15px;
    font-size: 1rem;
    font-weight: bold;
    color: ${active ? colors.link : lighten(0.7, colors.black)};
    border: ${active ? `2px solid ${colors.link}` : 'none'};
    border-width: 0 0 2px 0;
    cursor: pointer;

    ${down(breakpoints.sm)} {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  `,
);

export const StyledTabList = styled.ul(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    margin-bottom: 2rem;

    ${down(breakpoints.sm)} {
      flex-direction: column;
    }
  `,
);
