import React from 'react';

import ITest from 'interfaces/testType';
import { DefaultTheme } from 'styled-components';
import { Wrapper, StyledLabel, StyledSelect } from './styled';

interface IOption {
  value: string | number;
  name: string | number;
}

interface Props extends ITest {
  label: string;
  selectedValue?: IOption['value'];
  values: IOption[];
  hasEmptyOption?: boolean;
  emptyOptionLabel?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  customStyles?: (theme: DefaultTheme) => string;
}

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
}: Props): JSX.Element => {
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
