import React, { ReactNode } from 'react';

import { StyledCell, Wrap } from './styled';

const DataCell = ({ children }: { children: ReactNode }) => {
  return (
    <StyledCell>
      <Wrap>{children}</Wrap>
    </StyledCell>
  );
};

export default DataCell;
