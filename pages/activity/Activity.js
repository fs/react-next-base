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

const Activity = () => {
  // TODO: implement filter for activity events

  const [beforeCursor, setBeforeCursor] = useState();
  const [afterCursor, setAfterCursor] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const { activities, pageInfo, loading, error } = useActivity({ beforeCursor, afterCursor });

  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  return (
    <DefaultTemplate>
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

      {loading && <h3 data-testid="test-activity-loading">Loading...</h3>}
      {error && <ErrorMessage data-testid="test-activity-error">{errorMessage}</ErrorMessage>}
      {!loading && !error && <ActivityTable data={activities} testId="test-activity-table" />}

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
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Activity)));
