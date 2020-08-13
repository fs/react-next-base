import React from 'react';
import styled, { css } from 'styled-components';

import ProfileImage from 'components/atoms/ProfileImage';

import baseCellStyles from './baseCellStyles';
import DataCell from './DataCell';

const StyledTable = styled.table(
  ({ theme: { up, breakpoints } }) =>
    css`
      position: relative;
      border-spacing: 0;
      display: block;
      overflow-x: auto;
      text-align: left;
      width: 100%;
      color: #606c76;

      ${up(breakpoints.lg)} {
        display: table;
        overflow-x: initial;
      }
    `,
);

const ColorLabel = styled.td(
  ({ color }) => css`
    min-width: 5px;
    background-color: ${color};
  `,
);

const HeaderCell = styled.th(
  ({ theme }) => css`
    ${baseCellStyles(theme)}
  `,
);

const UserInfo = styled.span`
  margin-left: 0.5rem;
`;

const ActivityTable = ({ data }) => {
  const columnNames = ['Title', 'Description', 'Date', 'User'];

  return (
    <StyledTable>
      <thead>
        <tr>
          {columnNames.map((name, id) => (
            <HeaderCell key={name} colSpan={!id ? '2' : '1'}>
              {name}
            </HeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, title, description, date, color, name, email, avatarUrl }) => {
          return (
            <tr key={id}>
              <ColorLabel color={color} />
              <DataCell>{title}</DataCell>
              <DataCell>{description}</DataCell>
              <DataCell>{date.toString()}</DataCell>
              <DataCell>
                <ProfileImage avatar={avatarUrl} />
                <UserInfo>
                  {name} ({email})
                </UserInfo>
              </DataCell>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default ActivityTable;
