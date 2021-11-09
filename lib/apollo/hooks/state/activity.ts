/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import Activities from 'graphql/queries/pages/activities.graphql';

import activityEvents from 'config/activityEvents';
import activityPageSizes from 'config/activityPageSizes';

import User from 'domain/User';
import { PageInfo, Activity } from 'interfaces/activityType';

type ActivityParams = {
  beforeCursor?: string;
  afterCursor?: string;
  filterValue?: string;
  pageSize: number;
};

type Edge = {
  cursor: string;
  node: {
    body: string;
    createdAt: string | Date;
    event: string;
    id: string | number;
    title: string;
    user: User;
  };
};

type ActivityQueryState = {
  activities: {
    edges: Edge[];
    pageInfo: PageInfo;
  };
};

type ActivityQueryVars = {
  events: string[];
  last?: number;
  before?: string;
  first?: number;
  after?: string;
};

const getFormattedActivity = (edges: Edge[]): Activity[] => {
  return edges.map(
    ({
      node: {
        id,
        title,
        body,
        createdAt,
        event,
        user: { firstName, lastName, email, avatarUrl },
      },
    }) => ({
      id,
      title,
      description: body,
      date: new Date(createdAt).toLocaleString(),
      color: activityEvents.find((e) => e.value === event)?.color,
      name: `${firstName} ${lastName}`,
      email,
      avatarUrl,
    }),
  );
};

export const useActivity = ({
  beforeCursor,
  afterCursor,
  filterValue,
  pageSize = activityPageSizes[0],
}: ActivityParams) => {
  const events = filterValue ? [filterValue] : activityEvents.map(({ value }) => value);
  const first = afterCursor || (!afterCursor && !beforeCursor) ? pageSize : undefined;
  const last = beforeCursor ? pageSize : undefined;

  const { loading, error, data } = useQuery<ActivityQueryState, ActivityQueryVars>(Activities, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      events,
      last,
      before: beforeCursor,
      first,
      after: afterCursor,
    },
  });

  return {
    activities: data?.activities?.edges ? getFormattedActivity(data?.activities.edges) : null,
    pageInfo: data?.activities?.pageInfo || null,
    loading,
    error,
  };
};
