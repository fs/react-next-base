import React from 'react';

import { StyledCell, Wrap } from './styled';

const DataCell = ({ children }) => {
  return (
    <StyledCell>
      <Wrap>{children}</Wrap>
    </StyledCell>
  );
};

export default DataCell;
