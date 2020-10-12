import React, { useState } from 'react';

import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useActivity } from 'lib/apollo/hooks/activity';

import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import DefaultTemplate from 'components/templates/DefaultTemplate';
import ActivityTable from 'components/organisms/ActivityTable';
import ActivityPagination from 'components/organisms/ActivityPagination';
import ActivityFilter from 'components/organisms/ActivityFilter';
import Loader from 'components/atoms/Loader';

const Activity = () => {
  const [beforeCursor, setBeforeCursor] = useState();
  const [afterCursor, setAfterCursor] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [filterValue, setFilterValue] = useState();

  const { activities, pageInfo, loading, error } = useActivity({ beforeCursor, afterCursor, filterValue });

  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  return (
    <DefaultTemplate>
      <ActivityFilter
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        setBeforeCursor={setBeforeCursor}
        setAfterCursor={setAfterCursor}
        setPageNumber={setPageNumber}
        disabled={loading}
        testId="test-activity-filter"
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
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Activity)));
