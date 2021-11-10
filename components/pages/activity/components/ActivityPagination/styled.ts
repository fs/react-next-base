import styled, { css } from 'styled-components';

import { component as LeftPointer } from 'public/images/icons/left-pointer.svg';
import { component as RightPointer } from 'public/images/icons/right-pointer.svg';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const pointerIconStyles = css`
  width: 15px;
`;
export const LeftPointerIcon = styled(LeftPointer)`
  ${pointerIconStyles}
`;
export const RightPointerIcon = styled(RightPointer)`
  ${pointerIconStyles}
`;

export const prevButtonStyles = css`
  border-right-width: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
export const nextButtonStyles = css`
  border-left-width: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const PageNumber = styled.span`
  padding: 0.25rem 0.7rem;
  border: 2px solid ${({ theme }) => theme.colors.grey};
  font-size: 1.1rem;
`;
