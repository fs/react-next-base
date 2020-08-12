import React from 'react';
import styled, { css } from 'styled-components';

const Table = styled.table(
  ({ theme: { up, breakpoints } }) =>
    css`
      border-spacing: 0;
      display: block;
      overflow-x: auto;
      text-align: left;
      width: 100%;

      ${up(breakpoints.lg)} {
        display: table;
        overflow-x: initial;
      }
    `,
);

const baseCellStyles = css`
  border-bottom: 1px solid #e1e1e1;
  padding: 1.2em 1em;
  color: #606c76;
  font-size: 0.9em;
  line-height: 1.4em;

  &:first-child {
    padding-left: 0;
  }
`;

const HeaderCell = styled.th`
  ${baseCellStyles}
`;
const DataCell = styled.td`
  ${baseCellStyles}
  font-weight: 100;

  &:nth-child(3) {
    white-space: nowrap;
  }
`;

const ActivityTable = ({ data }) => {
  // console.log('data', data);
  // TODO: show user's avatar before name
  // TODO: mobile view
  return (
    <Table>
      <thead>
        <tr>
          <HeaderCell>Title</HeaderCell>
          <HeaderCell>Description</HeaderCell>
          <HeaderCell>Date</HeaderCell>
          <HeaderCell>User</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, title, description, date, name, email }) => {
          return (
            <tr key={id}>
              <DataCell>{title}</DataCell>
              <DataCell>{description}</DataCell>
              <DataCell>{date.toString()}</DataCell>
              <DataCell>
                {name} ({email})
              </DataCell>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ActivityTable;
