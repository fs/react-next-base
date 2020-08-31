import React from 'react';
import styled, { css } from 'styled-components';

import baseCellStyles from './baseCellStyles';

const StyledCell = styled.td(
  ({ theme }) => css`
    ${baseCellStyles(theme)}
    font-weight: 100;

    &:nth-child(4) {
      white-space: nowrap;
    }
  `,
);

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const DataCell = ({ children }) => {
  return (
    <StyledCell>
      <Wrap>{children}</Wrap>
    </StyledCell>
  );
};

export default DataCell;
