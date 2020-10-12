import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button(
  ({
    theme: {
      colors: { grey },
    },
    disabled,
    customStyles,
  }) => css`
    display: flex;
    padding: 0.5rem;
    background-color: transparent;
    border: 2px solid ${grey};
    ${customStyles}

    ${disabled &&
      `& svg {
      fill: ${grey};
      transition: fill 0.2s;
    }`}
  `,
);

const PaginationButton = ({ disabled, onClick, customStyles, children }) => {
  return (
    <StyledButton type="button" disabled={disabled} onClick={onClick} customStyles={customStyles}>
      {children}
    </StyledButton>
  );
};

export default PaginationButton;
