import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useActivity } from 'lib/apollo/hooks/state/activity';

import activityEvents from 'config/activityEvents';
import activityPageSizes from 'config/activityPageSizes';

import ErrorDecorator from 'decorators/ErrorDecorator';
import Loader from 'components/shared/atoms/Loader';
import ErrorMessage from 'components/shared/atoms/ErrorMessage';
import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import { NotifierProvider } from 'contexts/NotifierContext';
import ActivityDropdown from './components/ActivityDropdown';
import ActivityTable from './components/ActivityTable';
import ActivityPagination from './components/ActivityPagination';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const dropdownStyles = ({ up, breakpoints }) => css`
  margin: 1rem 0;

  ${up(breakpoints.sm)} {
    position: absolute;
    margin-top: -1rem;
    font-size: 0.9rem;
  }
`;
const filterDropdownStyles = (theme) => css`
  ${dropdownStyles(theme)}

  ${theme.up(theme.breakpoints.sm)} {
    left: 1rem;
  }
`;
const pageSizeDropdownStyles = (theme) => css`
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
  const [pageSize, setPageSize] = useState();

  const { activities, pageInfo, loading, error } = useActivity({ beforeCursor, afterCursor, filterValue, pageSize });

  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  const resetState = () => {
    setBeforeCursor(undefined);
    setAfterCursor(undefined);
    setPageNumber(1);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    resetState();
  };

  const handlePageSizeChange = (event) => {
    setPageSize(+event.target.value);
    resetState();
  };

  return (
    <NotifierProvider>
      <DefaultTemplate>
        <Wrapper>
          <ActivityDropdown
            label="Choose activity event:"
            selectedValue={filterValue}
            values={activityEvents}
            hasEmptyOption
            onChange={handleFilterChange}
            testId="activity-event-dropdown"
            disabled={loading}
            customStyles={filterDropdownStyles}
          />

          <ActivityDropdown
            label="Choose activity page size:"
            selectedValue={pageSize}
            values={activityPageSizes.map((item) => ({ value: item, name: item }))}
            onChange={handlePageSizeChange}
            testId="activity-size-dropdown"
            disabled={loading}
            customStyles={pageSizeDropdownStyles}
          />

          {pageInfo && (
            <ActivityPagination
              pageInfo={pageInfo}
              setBeforeCursor={setBeforeCursor}
              setAfterCursor={setAfterCursor}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          )}

          {!loading && !error && <ActivityTable data={activities} />}
          {loading && <Loader testId="activity-loading">Loading...</Loader>}
          {error && <ErrorMessage testId="activity-error">{errorMessage}</ErrorMessage>}
        </Wrapper>
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Activity)));
