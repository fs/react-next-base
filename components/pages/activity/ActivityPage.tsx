import React, { useState } from 'react';

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

import { Wrapper, filterDropdownStyles, pageSizeDropdownStyles } from './styled';

const Activity = () => {
  const [beforeCursor, setBeforeCursor] = useState<undefined | string>();
  const [afterCursor, setAfterCursor] = useState<undefined | string>();
  const [filterValue, setFilterValue] = useState<undefined | string>();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(activityPageSizes[0]);

  const { activities, pageInfo, loading, error } = useActivity({
    beforeCursor,
    afterCursor,
    filterValue,
    pageSize,
  });

  const errorMessage = new ErrorDecorator(error).message;

  const resetState = () => {
    setBeforeCursor(undefined);
    setAfterCursor(undefined);
    setPageNumber(1);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value);
    resetState();
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
            />
          )}

          {!loading && !error && activities && <ActivityTable data={activities} />}
          {loading && <Loader testId="activity-loading">Loading...</Loader>}
          {error && <ErrorMessage testId="activity-error">{errorMessage}</ErrorMessage>}
        </Wrapper>
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Activity)));
