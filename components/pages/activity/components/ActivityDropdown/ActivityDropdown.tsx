import React from 'react';
import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

import Test from 'types/testType';
import { Wrapper, StyledLabel, StyledSelect } from './styled';

type Option = {
  value: string | number;
  name: string | number;
};

type Props = Test & {
  label: string;
  selectedValue?: Option['value'];
  values: Option[];
  hasEmptyOption?: boolean;
  emptyOptionLabel?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  customStyles?: (theme: DefaultTheme) => FlattenSimpleInterpolation;
};

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
