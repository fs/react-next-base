import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div(
  ({ theme, customStyles }) => css`
    display: flex;
    justify-content: center;

    ${customStyles && customStyles(theme)}
  `,
);

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.darkGrey};
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

const ActivityDropdown = ({
  label,
  selectedValue,
  values,
  hasEmptyOption,
  emptyOptionLabel,
  onChange,
  disabled,
  customStyles,
  testId,
}) => {
  return (
    <Wrapper customStyles={customStyles} data-testid={testId}>
      <StyledLabel htmlFor="activity-dropdown">
        {label}
        <StyledSelect
          id="activity-dropdown"
          data-cy={testId}
          value={selectedValue}
          onChange={onChange}
          disabled={disabled}
        >
          {hasEmptyOption && <option value="">{emptyOptionLabel || '--Please choose an option--'}</option>}
          {values.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </StyledSelect>
      </StyledLabel>
    </Wrapper>
  );
};

export default ActivityDropdown;
