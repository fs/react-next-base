import React from 'react';

import ProfileImage from 'components/shared/atoms/ProfileImage';

import DataCell from './DataCell';

import { StyledTable, ColorLabel, HeaderCell, UserInfo, EmptyList } from './styled';

const ActivityTable = ({ data }) => {
  const columnNames = ['Title', 'Description', 'Date', 'User'];

  return (
    <>
      {data.length > 0 ? (
        <StyledTable data-testid="activity-table" data-cy="activity-table">
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
                <tr key={id} data-cy="activity-row" data-id={id}>
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
      ) : (
        <EmptyList data-testid="activity-table-empty">No records found</EmptyList>
      )}
    </>
  );
};

export default ActivityTable;
