/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import Activities from 'graphql/queries/pages/activities.graphql';

import activityEvents from 'config/activityEvents';
import defaultActivityPageSize from 'config/activityPageSize';

const getFormattedActivity = data => {
  return data.activities.nodes.map(
    ({ id, title, body, createdAt, event, user: { firstName, lastName, email, avatarUrl } }) => ({
      id,
      title,
      description: body,
      date: new Date(createdAt).toLocaleString(),
      color: activityEvents.find(e => e.name === event).color,
      name: `${firstName} ${lastName}`,
      email,
      avatarUrl,
    }),
  );
};

export const useActivity = ({ beforeCursor, afterCursor }) => {
  const events = activityEvents.map(({ name }) => name);
  // TODO: user should be able to select page size, e.g. dropdown with following values 10,25,50
  const first = defaultActivityPageSize;

  const { loading, error, data } = useQuery(Activities, {
    variables: { events, first, before: beforeCursor, after: afterCursor },
  });

  return {
    activities: data ? getFormattedActivity(data) : null,
    pageInfo: data ? data.activities.pageInfo : null,
    loading,
    error,
  };
};
