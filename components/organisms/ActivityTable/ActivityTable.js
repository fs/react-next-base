import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  padding: 1rem;
`;

const ActivityTable = ({ data }) => {
  console.log('data', data);
  // TODO: show user's avatar before name
  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, title, description, date, name, email }) => {
          return (
            <tr key={id}>
              <td>{title}</td>
              <td>{description}</td>
              <td>{date}</td>
              <td>
                {name} ({email})
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ActivityTable;
