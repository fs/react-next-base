/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import Activities from 'graphql/queries/pages/activities.graphql';

import activityEvents from 'config/activityEvents';
import activityPageSizes from 'config/activityPageSizes';

const getFormattedActivity = data => {
  return data.activities.nodes.map(
    ({ id, title, body, createdAt, event, user: { firstName, lastName, email, avatarUrl } }) => ({
      id,
      title,
      description: body,
      date: new Date(createdAt).toLocaleString(),
      color: activityEvents.find(e => e.value === event).color,
      name: `${firstName} ${lastName}`,
      email,
      avatarUrl,
    }),
  );
};

export const useActivity = ({ beforeCursor, afterCursor, filterValue, pageSize = activityPageSizes[0] }) => {
  const events = filterValue ? [filterValue] : activityEvents.map(({ value }) => value);
  const first = afterCursor || (!afterCursor && !beforeCursor) ? pageSize : undefined;
  const last = beforeCursor ? pageSize : undefined;

  const { loading, error, data } = useQuery(Activities, {
    variables: {
      events,
      last,
      before: beforeCursor,
      first,
      after: afterCursor,
    },
  });

  return {
    activities: data ? getFormattedActivity(data) : null,
    pageInfo: data ? data.activities.pageInfo : null,
    loading,
    error,
  };
};
