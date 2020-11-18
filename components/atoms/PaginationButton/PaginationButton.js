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

    ${disabled
      ? css`
          cursor: default;
          svg {
            fill: ${grey};
            transition: fill 0.2s;
          }
        `
      : css`
          & {
            background-color: transparent;
            transition: background-color 0.2s;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
            transition: background-color 0.2s;
          }
        `}

    ${customStyles}
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
