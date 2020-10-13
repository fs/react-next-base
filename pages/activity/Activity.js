import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useActivity } from 'lib/apollo/hooks/activity';

import activityEvents from 'config/activityEvents';
import activityPageSizes from 'config/activityPageSizes';

import ErrorDecorator from 'decorators/ErrorDecorator';
import Loader from 'components/atoms/Loader';
import ErrorMessage from 'components/atoms/ErrorMessage';
import DefaultTemplate from 'components/templates/DefaultTemplate';
import ActivityTable from 'components/organisms/ActivityTable';
import ActivityPagination from 'components/organisms/ActivityPagination';
import ActivityDropdown from 'components/organisms/ActivityDropdown';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 1rem;
`;

const dropdownStyles = ({ up, breakpoints }) => css`
  margin: 1rem 0;

  ${up(breakpoints.sm)} {
    position: absolute;
    margin-top: -1rem;
    font-size: 0.9rem;
  }
`;
const filterDropdownStyles = theme => css`
  ${dropdownStyles(theme)}

  ${theme.up(theme.breakpoints.sm)} {
    left: 1rem;
  }
`;
const pageSizeDropdownStyles = theme => css`
  ${dropdownStyles(theme)}

  ${theme.up(theme.breakpoints.sm)} {
    right: 1rem;
  }
`;

const Activity = () => {
  const [beforeCursor, setBeforeCursor] = useState();
  const [afterCursor, setAfterCursor] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [filterValue, setFilterValue] = useState();
  const [pageSize, setPageSize] = useState(10);

  const { activities, pageInfo, loading, error } = useActivity({ beforeCursor, afterCursor, filterValue, pageSize });

  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  const resetState = () => {
    setBeforeCursor(undefined);
    setAfterCursor(undefined);
    setPageNumber(1);
  };

  const handleFilterChange = event => {
    setFilterValue(event.target.value);
    resetState();
  };

  const handlePageSizeChange = event => {
    setPageSize(+event.target.value);
    resetState();
  };

  return (
    <DefaultTemplate>
      <Wrapper>
        <ActivityDropdown
          label="Choose activity event:"
          selectedValue={filterValue}
          values={activityEvents}
          hasEmptyOption
          onChange={handleFilterChange}
          disabled={loading}
          customStyles={filterDropdownStyles}
          testId="test-activity-filter"
        />

        <ActivityDropdown
          label="Choose activity page size:"
          selectedValue={pageSize}
          values={activityPageSizes.map(item => ({ value: item, name: item }))}
          onChange={handlePageSizeChange}
          disabled={loading}
          customStyles={pageSizeDropdownStyles}
          testId="test-page-size"
        />

        {pageInfo && (
          <ActivityPagination
            pageInfo={pageInfo}
            setBeforeCursor={setBeforeCursor}
            setAfterCursor={setAfterCursor}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            testId="test-activity-pagination"
          />
        )}

        {loading && <Loader data-testid="test-activity-loading">Loading...</Loader>}
        {error && <ErrorMessage data-testid="test-activity-error">{errorMessage}</ErrorMessage>}
        {!loading && !error && <ActivityTable data={activities} testId="test-activity-table" />}
      </Wrapper>
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Activity)));
