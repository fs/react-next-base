import React from 'react';
import styled, { css } from 'styled-components';

import activityEvents from 'config/activityEvents';

const Wrapper = styled.div(
  ({ theme: { up, breakpoints } }) => css`
    display: flex;
    justify-content: center;
    margin: 1rem 0;

    ${up(breakpoints.sm)} {
      position: absolute;
      margin-top: 0;
      font-size: 0.9rem;
    }
  `,
);

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  color: #606c76;
`;

const StyledSelect = styled.select(
  ({ theme: { up, breakpoints } }) => css`
    margin-top: 0.5rem;
    padding: 0.25rem;
    font-size: 1rem;

    ${up(breakpoints.sm)} {
      font-size: 0.8rem;
    }
  `,
);

const ActivityFilter = ({
  filerValue,
  setFilterValue,
  setBeforeCursor,
  setAfterCursor,
  setPageNumber,
  disabled,
  testId,
}) => {
  const handleChange = event => {
    setFilterValue(event.target.value);
    setBeforeCursor(undefined);
    setAfterCursor(undefined);
    setPageNumber(1);
  };

  return (
    <Wrapper data-testid={testId}>
      <StyledLabel htmlFor="activity-events">
        Choose activity event:
        <StyledSelect id="activity-events" value={filerValue} onChange={handleChange} disabled={disabled}>
          <option value="">--Please choose an option--</option>
          {activityEvents.map(({ name, color, friendlyName }) => (
            <option value={name} eventColor={color}>
              {friendlyName}
            </option>
          ))}
        </StyledSelect>
      </StyledLabel>
    </Wrapper>
  );
};

export default ActivityFilter;
