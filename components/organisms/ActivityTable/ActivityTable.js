import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  padding: 1rem;
`;

const ActivityTable = ({ data }) => {
  console.log('data', data);
  return <Table />;
};

export default ActivityTable;
