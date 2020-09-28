/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import Activities from 'graphql/queries/pages/activities.graphql';

import activityEvents from 'config/activityEvents';

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

export const useActivity = () => {
  const events = activityEvents.map(({ name }) => name);
  const { loading, error, data } = useQuery(Activities, { variables: { events } });

  return {
    activities: data ? getFormattedActivity(data) : null,
    loading,
    error,
  };
};
