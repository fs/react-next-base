import React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';

const StyledTab = styled.li(
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

const Tab = ({ active, name, dataTestId, onClick }) => (
  <StyledTab role="tab" active={active} onClick={onClick} data-testid={dataTestId}>
    {name}
  </StyledTab>
);

export default Tab;
