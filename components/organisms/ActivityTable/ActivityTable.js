import React from 'react';
import styled, { css } from 'styled-components';

import ProfileImage from 'components/atoms/ProfileImage';

import baseCellStyles from './baseCellStyles';
import DataCell from './DataCell';

const StyledTable = styled.table(
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

const ColorLabel = styled.td(
  ({ color }) => css`
    min-width: 5px;
    background-color: ${color};
  `,
);

const HeaderCell = styled.th(({ theme }) => baseCellStyles(theme));

const UserInfo = styled.span`
  margin-left: 0.5rem;
`;

const EmptyList = styled.div`
  margin: 3rem 0;
  text-align: center;
  font-style: italic;
`;

const ActivityTable = ({ data }) => {
  const columnNames = ['Title', 'Description', 'Date', 'User'];

  return (
    <>
      {data.length > 0 ? (
        <StyledTable data-testid="test-activity-table">
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
            {data.map(({ id, title, description, date, color, name, email, avatarUrl }) => (
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
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <EmptyList data-testid="test-activity-table-empty">No records found</EmptyList>
      )}
    </>
  );
};

export default ActivityTable;
