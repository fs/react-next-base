import React, { useEffect, useState } from 'react';

import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useActivity } from 'lib/apollo/hooks/activity';

import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import DefaultTemplate from 'components/templates/DefaultTemplate';
import ActivityTable from 'components/organisms/ActivityTable';

const Activity = () => {
  // TODO: implement filter for activity events

  const [beforeCursor, setBeforeCursor] = useState();
  const [afterCursor, setAfterCursor] = useState();

  const { activities, pageInfo, loading, error } = useActivity({ beforeCursor, afterCursor });

  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;

  return (
    <DefaultTemplate>
      {loading && <h3 data-testid="test-activity-loading">Loading...</h3>}
      {error && <ErrorMessage data-testid="test-activity-error">{errorMessage}</ErrorMessage>}
      {!loading && !error && (
        <ActivityTable
          data={activities}
          pageInfo={pageInfo}
          setBeforeCursor={setBeforeCursor}
          setAfterCursor={setAfterCursor}
          testId="test-activity-table"
        />
      )}
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(Activity)));
