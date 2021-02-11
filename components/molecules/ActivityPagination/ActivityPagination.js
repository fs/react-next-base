import React from 'react';
import styled, { css } from 'styled-components';

import LeftPointer from 'public/images/icons/left-pointer.svg';
import RightPointer from 'public/images/icons/right-pointer.svg';
import PaginationButton from 'components/atoms/PaginationButton';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const pointerIconStyles = css`
  width: 15px;
`;
const LeftPointerIcon = styled(LeftPointer)`
  ${pointerIconStyles}
`;
const RightPointerIcon = styled(RightPointer)`
  ${pointerIconStyles}
`;

const prevButtonStyles = css`
  border-right-width: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const nextButtonStyles = css`
  border-left-width: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const PageNumber = styled.span`
  padding: 0.25rem 0.7rem;
  border: 2px solid ${({ theme }) => theme.colors.grey};
  font-size: 1.1rem;
`;

const ActivityPagination = ({ pageInfo, setBeforeCursor, setAfterCursor, pageNumber, setPageNumber }) => {
  const { hasPreviousPage, hasNextPage, startCursor, endCursor } = pageInfo;

  const goToPrevPage = () => {
    setBeforeCursor(startCursor);
    setAfterCursor(undefined);
    setPageNumber(prevPageNumber => prevPageNumber - 1);
  };

  const goToNextPage = () => {
    setAfterCursor(endCursor);
    setBeforeCursor(undefined);
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  return (
    <Wrapper data-testid="activity-pagination">
      <PaginationButton disabled={!hasPreviousPage} onClick={() => goToPrevPage()} customStyles={prevButtonStyles}>
        <LeftPointerIcon />
      </PaginationButton>
      <PageNumber>{pageNumber}</PageNumber>
      <PaginationButton disabled={!hasNextPage} onClick={() => goToNextPage()} customStyles={nextButtonStyles}>
        <RightPointerIcon />
      </PaginationButton>
    </Wrapper>
  );
};

export default ActivityPagination;
