import React from 'react';

import PaginationButton from 'components/shared/atoms/PaginationButton';

import { Wrapper, LeftPointerIcon, PageNumber, RightPointerIcon, prevButtonStyles, nextButtonStyles } from './styled';

const ActivityPagination = ({ pageInfo, setBeforeCursor, setAfterCursor, pageNumber, setPageNumber }) => {
  const { hasPreviousPage, hasNextPage, startCursor, endCursor } = pageInfo;

  const goToPrevPage = () => {
    setBeforeCursor(startCursor);
    setAfterCursor(undefined);
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const goToNextPage = () => {
    setAfterCursor(endCursor);
    setBeforeCursor(undefined);
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <Wrapper data-testid="activity-pagination">
      <PaginationButton disabled={!hasPreviousPage} onClick={() => goToPrevPage()} customStyles={prevButtonStyles}>
        <LeftPointerIcon />
      </PaginationButton>
      <PageNumber>{pageNumber}</PageNumber>
      <PaginationButton
        testId="next-pagination"
        disabled={!hasNextPage}
        onClick={() => goToNextPage()}
        customStyles={nextButtonStyles}
      >
        <RightPointerIcon />
      </PaginationButton>
    </Wrapper>
  );
};

export default ActivityPagination;
